// game state keeps track of

class Game {
  constructor(_players, _displaySize) {
    this.displaySize = _displaySize;
    this.players = _players;
  }

  removePlayer(player) {
    let filteredPlayers = this.players.filter((p) => p.id != player.id);
    this.players = filteredPlayers;
  }

  // Move player based on keyboard input
  move(player, _direction) {
    // increments or decrements player position
    let newPosition = player.position + _direction;

    // if player hits the edge of display, loop around
    if (newPosition == -1) {
      player.position = this.displaySize - 1;
    } else if (newPosition == this.displaySize) {
      player.position = 0;
    } else {
      player.position = newPosition;
    }
  }

  findNearbyPlayer(current) {
    for (const player of this.players) {
      if (
        player.id !== current.id &&
        (player.position == current.position ||
          player.position == current.position + 1 ||
          player.position == current.position - 1)
      ) {
        console.log("found nearby player ", player.id);
        return player;
      }
    }

    return false;
  }

  giveItem(giver) {
    if (giver.hasKnife || giver.hasToken) {
      let player = this.findNearbyPlayer(giver);
      if (player) {
        if (giver.hasKnife) {
          giver.removeItem("KNIFE");
          player.receiveItem("KNIFE");
        } else {
          giver.removeItem("TOKEN");
          player.receiveItem("TOKEN");
        }
      }
    } else {
      console.log(`${giver.id} does not have an item`);
    }
    print("PLAYERS ", this.players);
  }

  playAction(player) {
    if (player.hasKnife) {
      // TRY TO KILL SOMEONE
      let victim = this.findNearbyPlayer(player);
      if (victim) {
        victim.die();
        if (victim.lives == 0) {
          this.removePlayer(victim);
        }
      } else {
        // COULD NOT FIND VICTIM, LOSE BLOOD
        // TODO: confirm how kill logic works
      }
    } else {
      console.log("player does not have knife");
    }
  }
}
