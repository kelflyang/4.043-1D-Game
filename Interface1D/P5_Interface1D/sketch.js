/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February 9, 2024
  Marcelo Coelho

*/ /////////////////////////////////////
let displaySize = 30; // how many pixels are visible in the game
let pixelSize = 20; // how big each 'pixel' looks on screen

let game;

let playerOne; // Adding 2 players to the game
let playerTwo;
let target; // and one target for players to catch.

let display; // Aggregates our final visual output before showing it on the screen

let controller; // This is where the state machine and game logic lives

let collisionAnimation; // Where we store and manage the collision animation

let score; // Where we keep track of score and winner

function drawPlayer(set) {
  // Convert set to array
  const array = Array.from(set);
  // Pick a random index
  const randomIndex = Math.floor(Math.random() * array.length);
  // Get the element at the random index
  const randomElement = array[randomIndex];
  // Remove the element from the set
  set.delete(randomElement);
  // Return the randomly drawn element
  return randomElement;
}

function getTeam(playerId, teams) {
  for (i = 0; i < teams.length; i++) {
    if (playerId in teams[i]) {
      return i;
    }
  }
}

function generateOrientation() {
  // Generate a random decimal between 0 and 1
  const randomDecimal = Math.random();
  // Convert the random decimal to either 0 or 1
  const randomBinary = Math.round(randomDecimal);
  return randomBinary;
}

function setup() {
  createCanvas(displaySize * pixelSize, pixelSize); // dynamically sets canvas size

  ball = new Ball();
  display = new Display(displaySize, pixelSize); //Initializing the display

  // initialize pairs of team
  playerIds = new Set([1, 2, 3, 4]);
  team1 = [drawPlayer(playerIds), drawPlayer(playerIds)];
  team2 = Array.from(playerIds);
  teams = [team1, team2];

  // initialize player
  playerOne = new Player(
    1,
    color(255, 0, 0),
    parseInt(random(0, displaySize, getTeam(1, teams))),
    generateOrientation()
  );
  playerTwo = new Player(
    2,
    color(0, 0, 255),
    parseInt(random(0, displaySize, getTeam(2, teams))),
    generateOrientation()
  );
  // playerThree = new Player(
  //   3,
  //   color(0, 255, 255),
  //   parseInt(random(0, displaySize)),
  //   getTeam(3, teams),
  //   generateOrientation()
  // );
  // playerFour = new Player(
  //   4,
  //   color(0, 255, 0),
  //   parseInt(random(0, displaySize)),
  //   getTeam(4, teams),
  //   generateOrientation()
  // );

  players = [playerOne, playerTwo];

  display.setPlayers(players);

  print(players);

  // initialize items
  playwerWithItem = players[Math.floor(Math.random() * 1)];
  playwerWithItem.receiveItem();

  game = new Game(players, displaySize, ball);
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
