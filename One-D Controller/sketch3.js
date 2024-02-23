// Declare serial port object
let serial;
var message = [];
// let portName = 'COM3'; // Adjust this to match your serial port
let portName = '/dev/cu.usbserial-1410';

function setup() {
  createCanvas(420, 200);

  // Initialize serial port
  serial = new p5.SerialPort();
  serial.open(portName, { baudRate: 9600 });
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
  var status1 = "Controller 1: ";
  var status2 = "Controller 2: ";

  if(message > 0){
    console.log(message);

    if (message[0] == 1) { //recieving
      if (message[1] == 1){ //controller 1
        status1.push(" Left");
      }
      if (message[2] == 2){
        status1.push(" Right");
      }
    }
    if (message[1] == 2) { //controller 2
      if (message[2] == 1){
        status1.push(" Left");
      }
      if (message[2] == 2){
        status1.push(" Right");
      }
    }
  }


  //display text
  text(status1, 10, 80);
  text(status2, 10, 130);

}
