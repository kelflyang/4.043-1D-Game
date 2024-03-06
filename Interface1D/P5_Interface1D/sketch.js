/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February 9, 2024
  Marcelo Coelho

*/ /////////////////////////////////////
let MAX_SPEED = 0.001;
let BASE_SPEED = 0.0001;
let BLOCKS_LEFT = 2;
let SPEED_INCREMENT = 0.0001;
let displaySize = 31; // how many pixels are visible in the game
let pixelSize = 20; // how big each 'pixel' looks on screen

let game;

let playerOne; // Adding 2 players to the game
let playerTwo;
let target; // and one target for players to catch.

let display; // Aggregates our final visual output before showing it on the screen

let controller; // This is where the state machine and game logic lives

let collisionAnimation; // Where we store and manage the collision animation

let score; // Where we keep track of score and winner

let obstacle;

let obstaclesCount;

function generateObstacles(displaySize, playerOne, playerTwo, obstaclesCount) {
  // generate obstacles symmetrically, assumes displaySize is odd
  let maxOffset = Math.round(displaySize / 2) - 2;
  let minOffset = 1;
  let obstacles = [];

  for (let i = 0; i < obstaclesCount; i++) {
    let offSet = Math.random() * (maxOffset - minOffset) + minOffset;
    obstacles.push(new Obstacle(offSet, playerTwo));
    obstacles.push(new Obstacle(displaySize - offSet - 1, playerOne));
    // minOffset = offSet;
  }
  return obstacles;
}

function setup() {
  display = new Display(displaySize, pixelSize);
  obstaclesCount = 1;

  controller = new Controller();
  playerOne = new Player(1, [255, 94, 0], 0);
  playerTwo = new Player(2, [255, 255, 255], displaySize - 1);
  ball = new Ball(Math.floor(displaySize / 2), color(255, 255, 0));
  obstacles = generateObstacles(displaySize, playerOne, playerTwo, 1);

  players = [playerOne, playerTwo];
  game = new Game();
}

function draw() {
  createCanvas(displaySize * pixelSize, pixelSize);
  controller.update();
  display.show();

  if (keyIsDown(65)) {
    playerOne.acceleratingFactor = Math.max(
      playerOne.acceleratingFactor + 0.0001,
      0.15
    );
    game.movePlayer(
      playerOne,
      Math.min(-BASE_SPEED - playerOne.acceleratingFactor, -MAX_SPEED)
    );
  }
  if (keyIsDown(68)) {
    playerOne.acceleratingFactor = Math.max(
      playerOne.acceleratingFactor + 0.0001,
      0.15
    );
    game.movePlayer(
      playerOne,
      Math.max(BASE_SPEED + playerOne.acceleratingFactor, MAX_SPEED)
    );
  }

  if (keyIsDown(74)) {
    playerTwo.acceleratingFactor = Math.max(
      playerTwo.acceleratingFactor + 0.0001,
      0.15
    );
    game.movePlayer(
      playerTwo,
      Math.min(-BASE_SPEED - playerTwo.acceleratingFactor, -MAX_SPEED)
    );
  }
  if (keyIsDown(76)) {
    playerTwo.acceleratingFactor = Math.max(
      playerTwo.acceleratingFactor + 0.0001,
      0.15
    );
    game.movePlayer(
      playerTwo,
      Math.max(BASE_SPEED + playerTwo.acceleratingFactor, MAX_SPEED)
    );
  }

  for (const obstacle of obstacles) {
    obstacle.show();
  }

  playerOne.show();
  playerTwo.show();
  ball.show();
}
