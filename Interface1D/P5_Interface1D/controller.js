// This is where your state machines and game logic lives

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
      // This is the main game state, where the playing actually happens
      case "PLAY":
        // clear screen at frame rate so we always start fresh
        display.clear();

        // show all players in the right place, by adding them to display buffer
        for (const player of this.game.players) {
          display.setPixel(player.position, player.playerColor);
        }

        // check if player has picked up the ball
        if (this.game.ball.dropped) {
          for (const player of this.game.players) {
            if (player.position === this.game.ball.droppedPosition) {
              player.receiveItem();
              this.game.ball.dropped = false;
              print("player picked up ball!");
            }
          }
        }

        break;

      // Game is over. Show winner and clean everything up so we can start a new game.
      case "SCORE":
        // reset

        // reset shadow zones

        //light up w/ winner color by populating all pixels in buffer with their color
        display.setAllPixels(200, 34, 79);

        break;

      // Not used, it's here just for code compliance
      default:
        break;
    }
  }
}

// This function gets called when a key on the keyboard is pressed
function keyPressed() {
  // A D to move left and right
  // S to give
  if (key == "A" || key == "a") {
    game.move(playerOne, 0);
  }

  if (key == "D" || key == "d") {
    game.move(playerOne, 1);
  }

  if (key == "S" || key == "s") {
    game.giveItem(playerOne);
  }

  // J L to move left and right
  // K to give
  // U to act
  if (key == "J" || key == "j") {
    game.move(playerTwo, 0);
  }

  if (key == "L" || key == "l") {
    game.move(playerTwo, 1);
  }

  if (key == "K" || key == "k") {
    game.giveItem(playerTwo);
  }

  // F H to move left and right
  // G to give
  // T to act
  if (key == "F" || key == "f") {
    game.move(playerThree, 0);
  }

  if (key == "H" || key == "h") {
    game.move(playerThree, 1);
  }

  if (key == "G" || key == "g") {
    game.giveItem(playerThree);
  }

  // F H to move left and right
  // G to give
  // T to act
  if (key == "Z" || key == "z") {
    game.move(playerFour, 0);
  }

  if (key == "C" || key == "c") {
    game.move(playerFour, 1);
  }

  if (key == "X" || key == "x") {
    game.giveItem(playerFour);
  }

  // When you press the letter R, the game resets back to the play state
  if (key == "R" || key == "r") {
    controller.gameState = "PLAY";
  }
}
