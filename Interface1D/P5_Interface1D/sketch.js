/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February 9, 2024
  Marcelo Coelho

*/ /////////////////////////////////////
let displaySize = 30; // how many pixels are visible in the game
let pixelSize = 20; // how big each 'pixel' looks on screen

let shadowZoneMin = 3;
let shadowZoneMax = 8;

let game;

let playerOne; // Adding 2 players to the game
let playerTwo;
let target; // and one target for players to catch.

let display; // Aggregates our final visual output before showing it on the screen

let controller; // This is where the state machine and game logic lives

let collisionAnimation; // Where we store and manage the collision animation

let score; // Where we keep track of score and winner

function generateShadowZones(numberOfZones, minLength, maxLength, max) {
  let shadowZones = [];
  for (let i = 0; i < numberOfZones; i++) {
    let length =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let maxStart = max - length + 1;

    let start = Math.floor(Math.random() * maxStart);
    let end = start + length - 1;
    shadowZones.push([start, end]);
  }

  return shadowZones;
}

function setup() {
  createCanvas(displaySize * pixelSize, pixelSize); // dynamically sets canvas size

  // generate shadow zone
  shadowZones = generateShadowZones(
    3,
    shadowZoneMin,
    shadowZoneMax,
    displaySize
  );
  print("SHADOWZONES ", shadowZones);

  display = new Display(displaySize, pixelSize, shadowZones); //Initializing the display

  // initialize player
  playerOne = new Player(1, color(255, 0, 0), parseInt(random(0, displaySize)));
  playerTwo = new Player(2, color(0, 0, 255), parseInt(random(0, displaySize)));
  playerThree = new Player(
    3,
    color(0, 255, 0),
    parseInt(random(0, displaySize))
  );

  players = [playerOne, playerTwo, playerThree];

  // initialize items
  knifePlayer = players[Math.floor(Math.random() * 3)];
  tokenPlayer = players.filter((p) => p !== knifePlayer)[
    Math.floor(Math.random() * 2)
  ];

  knifePlayer.receiveItem("KNIFE");
  tokenPlayer.receiveItem("TOKEN");

  game = new Game(players, displaySize);
  controller = new Controller(game); // Initializing controller
}

function draw() {
  // start with a blank screen
  background(0, 0, 0);

  // Runs state machine at determined framerate
  controller.update();

  // After we've updated our states, we show the current one
  display.show();
}
