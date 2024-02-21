var serial;
var message = []; // You'll use this to write incoming data to the canvas

function setup() {
  createCanvas(400, 400);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  // Copy this from the serial control app
  serial.open("COM3");
  serial.on('data', gotData);

}

function gotData() {
  var currentString = serial.readLine().trim(); // Read the line and trim whitespace
  
  // Reset command array for new data
  command = []; 
  
  // Check if the string has content
  if (currentString.length > 0) {
    // Loop over each character in the string
    for (let i = 0; i < currentString.length; i++) {
      command.push(parseInt(currentString[i], 10)); // Base 10 for decimal
    }
    message = command;
  }
}

function draw() {
  background(220);
  fill(0);
  textSize(32); // Ensure text size is large enough to be visible
  text("Hello World", 50, 50);
  if (message[0] == 1) {
    text("Receiving from controller: " + message[1], 10, 100);
  }
  
  let output = 0;

  //OUTPUT LOGIC
  if (message[1] == 1){
    //Controller 1
    output = 2;
  }
  if (message[1] == 2){
    //Controller 2
    output = 1;
  }

  text("Sending action to: " + output, 10, 150);
  serial.write(`2${output}`);

}

