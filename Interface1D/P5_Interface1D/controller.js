// This is where your state machines and game logic lives
class Controller {
  // This is the state we start with.
  constructor() {
    this.gameState = "PLAY";
    this.maxScore = 3;
  }

  // This is called from draw() in sketch.js with every frame
  update() {
    // STATE MACHINE ////////////////////////////////////////////////
    // This is where your game logic lives
    /////////////////////////////////////////////////////////////////
    switch (this.gameState) {
      case "START":
        MAX_SPEED = 0.001;
        BASE_SPEED = 0.0001;
        BLOCKS_LEFT = 2;
        SPEED_INCREMENT = 0.0001;
        displaySize = 31; // how many pixels are visible in the game
        display = new Display(displaySize, pixelSize);
        obstaclesCount = 1;

        playerOne = new Player(1, [255, 94, 0], 0);
        playerTwo = new Player(2, [255, 255, 255], displaySize - 1);
        ball = new Ball(Math.floor(displaySize / 2), color(255, 255, 0));
        obstacles = generateObstacles(displaySize, playerOne, playerTwo, 1);

        players = [playerOne, playerTwo];
        game = new Game();
        this.gameState = "PLAY";
      case "PLAY":
        // check for winner

        if (playerOne.position === displaySize - 1 && playerOne.hasBall) {
          playerOne.score += 1;
          if (
            playerOne.score >= this.maxScore ||
            playerTwo.maxScore >= this.maxScore
          ) {
            this.gameState = "SCORE";
          } else {
            this.gameState = "NEW_ROUND";
          }
        }

        if (playerTwo.position === 0 && playerTwo.hasBall) {
          playerTwo.score += 1;
          if (playerOne.maxScore >= 3 || playerTwo.maxScore >= 3) {
            this.gameState = "SCORE";
          } else {
            this.gameState = "NEW_ROUND";
          }
        }

        break;

      case "NEW_ROUND":
        displaySize = Math.round(displaySize * 1.5);
        display.displaySize = displaySize;
        ball = new Ball(Math.floor(displaySize / 2), color(255, 255, 0));
        // obstaclesCount += 1;
        MAX_SPEED += 0.0015;
        BASE_SPEED += 0.00015;
        SPEED_INCREMENT += 0.00015;
        BLOCKS_LEFT += 1;
        playerOne.blocksLeft = BLOCKS_LEFT;
        playerTwo.blocksLeft = BLOCKS_LEFT;
        obstacles = generateObstacles(
          displaySize,
          playerOne,
          playerTwo,
          obstaclesCount
        );

        playerOne.hasBall = false;
        playerTwo.hasBall = false;
        playerOne.position = 0;
        playerTwo.position = displaySize - 1;
        this.gameState = "PLAY";

      // Game is over. Show winner and clean everything up so we can start a new game.
      case "SCORE":
        if (playerOne.score >= this.maxScore) {
          print("playerOne wins!");
        }

        if (playerTwo.score >= this.maxScore) {
          print("playerTwo wins!");
        }

      // Not used, it's here just for code compliance
      default:
        break;
    }
  }
}

function keyReleased() {
  if (key === "D" || key === "d" || key === "a" || key === "A") {
    playerOne.acceleratingFactor = 0;
  }
  if (key === "J" || key === "j" || key === "L" || key === "l") {
    playerTwo.acceleratingFactor = 0;
  }
  return false; // prevent any default behavior
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
  if (key == "R" || key == "r") {
    controller.gameState = "START";
  }
}
