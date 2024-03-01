// game state keeps track of

class Game {
  constructor() {}

  isTouchingObstacle(player, newPosition) {
    for (const obstacle of obstacles) {
      if (
        obstacle.player.playerId === player.playerId ||
        obstacle.durability < 1
      ) {
        continue;
      }

      if (this.isInteracting(newPosition, obstacle.position)) {
        return obstacle;
      }
    }
    return false;
  }

  isTouchingBall(player) {
    if (!ball.isDropped) {
      return false;
    }
    if (this.isInteracting(player.position, ball.position)) {
      return true;
    }

    return false;
  }

  pickUpBall(player) {
    player.hasBall = true;
    ball.isDropped = false;
  }

  movePlayer(player, direction) {
    let newPosition;
    player.direction = direction;
    if (direction < 0) {
      newPosition = Math.max(player.position + direction, 0);
    }
    if (direction > 0) {
      newPosition = Math.min(player.position + direction, displaySize - 1);
    }
    let obstacle = this.isTouchingObstacle(player, newPosition);
    if (obstacle) {
      if (direction > 0) {
        newPosition = obstacle.position - 1;
      } else {
        newPosition = obstacle.position + 1;
      }
    }
    player.position = newPosition;
    if (this.isTouchingBall(player, newPosition)) {
      this.pickUpBall(player);
    }
  }

  tackle(player) {
    for (const obstacle of obstacles) {
      if (this.isInteracting(player.position, obstacle.position)) {
        console.log("decreasing durability");
        obstacle.durability -= 1;
      }
    }
  }

  placeObstacle(player) {
    if (player.blocksLeft === 0) {
      return;
    }
    if (player.direction > 0 && player.position + 1 < displaySize) {
      obstacles.push(new Obstacle(player.position + 1, 3, player));
      player.blocksLeft -= 1;
    } else {
      if (player.position - 1 > 0)
        obstacles.push(new Obstacle(player.position - 1, 3, player));
      player.blocksLeft -= 1;
    }
  }

  isInteracting(position1, position2) {
    console.log(position1, position2);
    if (
      (position1 <= position2 && position1 >= position2 - 1) ||
      (position1 >= position2 && position1 <= position2 + 1)
    ) {
      print("is interacting");
      return true;
    }
    return false;
  }
}
