/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February 9, 2024
  Marcelo Coelho

*/ /////////////////////////////////////
let displaySize = 60; // how many pixels are visible in the game
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
  playerOne = new Player(1, color(0, 0, 0), 0);
  playerTwo = new Player(2, color(255, 255, 255), displaySize - 1);
  ball = new Ball(Math.floor(displaySize / 2), color(255, 255, 0));
  obstacles = [new Obstacle(8, 3, playerTwo), new Obstacle(displaySize - 8, 3, playerOne)];

  game = new Game();
}

function draw() {
  controller.update();
  display.show();

  // if (keyIsDown(65)) {
  //   game.movePlayer(playerOne, -0.1);
  // }
  // if (keyIsDown(68)) {
  //   game.movePlayer(playerOne, 0.1);
  // }

  // if (keyIsDown(74)) {
  //   game.movePlayer(playerTwo, -0.1);
  // }
  // if (keyIsDown(76)) {
  //   game.movePlayer(playerTwo, 0.1);
  // }

  for (const obstacle of obstacles) {
    obstacle.show();
  }
  
  playerOne.show();
  playerTwo.show();
  ball.show();

}
