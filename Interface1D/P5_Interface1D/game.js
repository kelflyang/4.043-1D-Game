// game state keeps track of

class Game {
  constructor(_players, _displaySize, _ball) {
    this.displaySize = _displaySize;
    this.players = _players;
    this.range = 3;
    this.ball = _ball;
  }

  // Move player based on keyboard input
  move(player, _direction) {
    let newPosition = player.position;

    // check if player direction is same as moving direction
    if (player.direction === _direction) {
      if (_direction === 0) {
        newPosition -= 1;
      } else {
        newPosition += 1;
      }
      // if player hits the edge of display, loop around
      if (newPosition == -1) {
        player.position = this.displaySize - 1;
      } else if (newPosition == this.displaySize) {
        player.position = 0;
      } else {
        player.position = newPosition;
      }
    } else {
      player.direction = _direction;
    }
  }

  findFurthestRight(players) {
    let furthestRightPlayer = players[0];
    let furthestRightPosition = players[0].position;

    for (const player of players) {
      if (player.position > furthestRightPosition) {
        furthestRightPosition = player.position;
        furthestRightPlayer = player;
      }
    }

    console.log(furthestRightPlayer);
    return furthestRightPlayer;
  }

  findFurthestLeft(players) {
    let furthestLeftPlayer = players[0];
    let furthestLeftPosition = players[0].position;

    for (const player of players) {
      if (player.position < furthestLeftPosition) {
        furthestLeftPosition = player.position;
        furthestLeftPlayer = player;
      }
    }

    console.log(furthestLeftPlayer);
    return furthestLeftPlayer;
  }

  isInRange(value, min, max) {
    return value >= min && value <= max;
  }

  findNearbyPlayer(current) {
    let nearbyPlayers = [];
    for (const player of this.players) {
      if (
        player.id !== current.id &&
        player.direction !== current.direction &&
        ((current.direction === 1 &&
          this.isInRange(
            player.position,
            current.position,
            current.position + this.range
          )) ||
          (current.direction === 0 &&
            this.isInRange(
              player.position,
              current.position - this.range,
              current.position
            )))
      ) {
        nearbyPlayers.push(player);
      }
    }

    // return player closes to current player
    if (nearbyPlayers.length > 0) {
      if (current.direction == 0) {
        return this.findFurthestRight(nearbyPlayers);
      } else {
        return this.findFurthestLeft(nearbyPlayers);
      }
    }
    return false;
  }

  getThrownPosition(position, direction) {
    let newPosition;
    if (direction === 1) {
      newPosition = position += this.range;
    } else {
      newPosition = position -= this.range;
    }

    if (newPosition >= this.displaySize) {
      print("new thrown position");
      return abs(this.displaySize - newPosition);
    }

    if (newPosition < 0) {
      return this.displaySize + newPosition;
    }

    return newPosition;
  }

  giveItem(giver) {
    if (giver.hasItem) {
      let player = this.findNearbyPlayer(giver);
      if (player) {
        giver.removeItem();
        player.receiveItem();
      } else {
        // drop the ball
        giver.removeItem();
        if (giver.direction === 0) {
          this.ball.dropBall(this.getThrownPosition(giver.position, 0));
        } else {
          this.ball.dropBall(this.getThrownPosition(giver.position, 1));
        }
      }
    } else {
      console.log(`${giver.id} does not have an item`);
    }
    print("PLAYERS ", this.players);
  }
}
