// This is where your state machines and game logic lives
class Controller {
  // This is the state we start with.
  constructor() {
    this.gameState = "PLAY";
    this.maxScore = 3;
    this.pause;
  }

  // This is called from draw() in sketch.js with every frame
  update() {
    // STATE MACHINE ////////////////////////////////////////////////
    // This is where your game logic lives
    /////////////////////////////////////////////////////////////////
    switch (this.gameState) {
      case "START":
        controller.pause = false;
        MAX_SPEED = 0.001;
        BASE_SPEED = 0.0001;
        BLOCKS_LEFT = 2;
        SPEED_INCREMENT = 0.0001;
        displaySize = 31; // how many pixels are visible in the game
        display = new Display(displaySize, pixelSize);
        createCanvas(displaySize * pixelSize, pixelSize);
        obstaclesCount = 1;

        playerOne = new Player(1, [255, 94, 0], 0);
        playerTwo = new Player(2, [255, 255, 255], display.displaySize - 1);
        ball = new Ball(
          Math.floor(display.displaySize / 2),
          color(255, 255, 0)
        );
        obstacles = generateObstacles(
          display.displaySize,
          playerOne,
          playerTwo,
          1
        );

        players = [playerOne, playerTwo];
        game = new Game();

        this.gameState = "PLAY";
      case "PLAY":
        controller.pause = false;
        // check for winner

        if (
          playerOne.position === display.displaySize - 1 &&
          playerOne.hasBall
        ) {
          playerOne.score += 1;
          if (
            playerOne.score >= this.maxScore ||
            playerTwo.score >= this.maxScore
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
        controller.pause = true;
        newDisplaySize = display.displaySize + 15;
        roundTransition = true;
        this.gameState = "PLAY";

      // Game is over. Show winner and clean everything up so we can start a new game.
      case "SCORE":
        // clear everything

        if (
          playerOne.score >= this.maxScore ||
          playerTwo.score >= this.maxScore
        ) {
          this.pause = true;
          playerOne.hasBall = false;
          playerTwo.hasBall = false;
          obstacles = [];
          ball.position = -1;

          if (playerOne.score >= this.maxScore) {
            playerTwo.position = -1;
            playerOne.lap = true;
          } else {
            plarerOne.position = -1;
            playerTwo.lap = true;
          }
        }

      // Not used, it's here just for code compliance
      default:
        break;
    }
  }
}

function keyReleased() {
  if (controller.pause) {
    return;
  }
  if (key === "D" || key === "d" || key === "a" || key === "A") {
    playerOne.acceleratingFactor = 0;
  }
  if (key === "J" || key === "j" || key === "L" || key === "l") {
    playerTwo.acceleratingFactor = 0;
  }
  return false; // prevent any default behavior
}

function keyPressed() {
  if (controller.pause) {
    return;
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
  if (key == "R" || key == "r") {
    controller.gameState = "START";
  }
}
