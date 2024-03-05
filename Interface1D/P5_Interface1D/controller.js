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
      case "PLAY":
        // check for winner

        if (playerOne.position === 0 && playerOne.hasItem) {
          this.gameState = "SCORE";
          console.log("SCORE");
        }

        if (playerTwo.position === displaySize - 1 && playerTwo.hasItem) {
          this.gameState = "SCORE";
          console.log("SCORE");
        }

        break;

      // Game is over. Show winner and clean everything up so we can start a new game.
      case "SCORE":
        console.log("SCORE");

        break;

      // Not used, it's here just for code compliance
      default:
        break;
    }
  }
}

function keyPressed() {
  if (key == "A" || key == "a") {
    game.movePlayer(playerOne, -1);
  }
  if (key == "D" || key == "d") {
    game.movePlayer(playerOne, 1);
  }
  if (key == "J" || key == "j") {
    game.movePlayer(playerTwo, -1);
  }
  if (key == "L" || key == "l") {
    game.movePlayer(playerTwo, 1);
  }
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
