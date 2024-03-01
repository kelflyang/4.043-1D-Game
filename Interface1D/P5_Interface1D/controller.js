// This is where your state machines and game logic lives
// let TIME_LIMIT = 30000;
let TIME_LIMIT = 3000;
class Controller {
  // This is the state we start with.
  constructor(_game) {
    this.game = _game;
    this.gameState = "PLAY";
  }

  // This is called from draw() in sketch.js with every frame
  update() {
    // STATE MACHINE ////////////////////////////////////////////////
    // This is where your game logic lives
    /////////////////////////////////////////////////////////////////
    switch (this.gameState) {
      case "RESTART":
      // display.off = false;
      // // display.setPlayers(players);

      // playwerWithItem = players[Math.floor(Math.random() * 1)];
      // playwerWithItem.receiveItem();

      // This is the main game state, where the playing actually happens
      case "PLAY":
        // clear screen at frame rate so we always start fresh
        // display.clear();

        // // show all players in the right place, by adding them to display buffer
        // for (const player of players) {
        //   // print("player position", player);
        //   display.setPixel(player.position, player.playerColor);
        // }

        // // check if player has picked up the ball
        // if (this.game.ball.dropped) {
        //   for (const player of players) {
        //     if (player.position === this.game.ball.droppedPosition) {
        //       player.receiveItem();
        //       this.game.ball.dropped = false;
        //       print("player picked up ball!");
        //     }
        //   }
        // }

        break;

      // Game is over. Show winner and clean everything up so we can start a new game.
      case "SCORE":
        display.off = true;

        // find who is the last one with the ball:
        if (this.game.ball.dropped) {
          // nobody wins
        } else {
          for (const player of players) {
            if (player.hasItem) {
              display.setAllPixels(player.playerColor);
              player.hasItem = false;
            }
          }
        }

        break;

      // Not used, it's here just for code compliance
      default:
        break;
    }
  }
}

function keyPressed() {
  if (key == "S" || key == "s") {
    game.tackle(playerOne);
  }

  if (key == "W" || key == "w") {
    game.placeObstacle(playerOne);
  }

  if (key == "K" || key == "k") {
    game.tackle(playerTwo);
  }

  if (key == "I" || key == "i") {
    game.placeObstacle(playerTwo);
  }
}
