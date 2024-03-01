/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February 9, 2024
  Marcelo Coelho

*/ /////////////////////////////////////
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

function setup() {
  createCanvas(displaySize * pixelSize, pixelSize);
  display = new Display(displaySize, pixelSize);
  controller = new Controller();

  playerOne = new Player(1, color(255, 0, 0), 0);
  playerTwo = new Player(2, color(0, 0, 255), displaySize - 1);
  ball = new Ball(Math.floor(displaySize / 2), color(0, 255, 255));
  obstacles = [new Obstacle(8, 3, playerTwo)];

  game = new Game();
}

function draw() {
  controller.update();
  display.show();

  if (keyIsDown(65)) {
    game.movePlayer(playerOne, -0.2);
  }
  if (keyIsDown(68)) {
    game.movePlayer(playerOne, 0.2);
  }

  if (keyIsDown(74)) {
    game.movePlayer(playerTwo, -0.2);
  }
  if (keyIsDown(76)) {
    game.movePlayer(playerTwo, 0.2);
  }

  playerOne.show();
  playerTwo.show();
  ball.show();
  for (const obstacle of obstacles) {
    obstacle.show();
  }
}
