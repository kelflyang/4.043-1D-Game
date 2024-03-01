// game state keeps track of
let PUSH_RANGE = 5;
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

  dropBall(player, newPos) {
    player.hasBall = false;
    ball.isDropped = true;

    if (newPos) {
      ball.position = newPos;
      return;
    }

    if (player.direction > 0) {
      ball.position = player.position + 1;
    } else {
      ball.position = player.position - 1;
    }
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
    // TRY TACKLING OBSTACLES
    for (const obstacle of obstacles) {
      if (
        this.isInteracting(player.position, obstacle.position) &&
        obstacle.player !== player
      ) {
        obstacle.durability -= 1;
        return;
      }
    }

    // TRY TACKLING OTHER PLAYER
    console.log("try tackling other player");
    let otherPlayer = players.filter((p) => p !== player)[0];
    if (this.isInteracting(player.position, otherPlayer.position)) {
      console.log("Tackling other player!");
      otherPlayer.tackled += 1;
      let pushDirection = otherPlayer.position > player.position ? 1 : -1;
      console.log("push direction ", pushDirection);
      if (otherPlayer.tackled === 1) {
        // push _player back
        game.movePlayer(otherPlayer, pushDirection * PUSH_RANGE);
      } else {
        game.movePlayer(otherPlayer, pushDirection * PUSH_RANGE);
        if (otherPlayer.hasBall) {
          let diff = Math.round((player.position - otherPlayer.position) / 2);
          if (pushDirection === -1) {
            // ball drops to the right of player
            game.dropBall(otherPlayer, otherPlayer.position + diff);
          } else {
            // ball drops to the left of player
            game.dropBall(otherPlayer, otherPlayer.position - diff);
          }
        }
        player.tackled = 0;
        // push _player back and drop ball in between
      }
    }
  }

  placeObstacle(player) {
    if (player.blocksLeft === 0) {
      return;
    }
    let otherPlayer = players.filter((p) => p !== player)[0];
    if (player.direction > 0) {
      if (
        player.position + 1 < displaySize &&
        !this.isInteracting(player.position + 1, otherPlayer.position)
      ) {
        obstacles.push(new Obstacle(player.position + 1, player));
        player.blocksLeft -= 1;
      }
    } else {
      if (
        player.position - 1 > 0 &&
        !this.isInteracting(player.position - 1, otherPlayer.position)
      )
        obstacles.push(new Obstacle(player.position - 1, player));
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
