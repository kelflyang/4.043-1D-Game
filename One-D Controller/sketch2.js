// Declare serial port object
let serial;
let portName = 'COM3'; // Adjust this to match your serial port

function setup() {
  createCanvas(420, 200);

  // Initialize serial port
  serial = new p5.SerialPort();
  serial.open(portName, { baudRate: 9600 });
  serial.on('open', () => console.log('Serial Port Opened'));
  serial.on('error', (err) => console.log('Serial Port Error: ' + err));

  // Create buttons
  let btn1 = createButton('1');
  let btn2 = createButton('2');
  let btn3 = createButton('3');
  let btn4 = createButton('4');

  btn1.position(50, 100);
  btn2.position(150, 100);
  btn3.position(250, 100);
  btn4.position(350, 100);

  btn1.mousePressed(() => {
    serial.write("21");
    console.log("21");
  });

  btn2.mousePressed(() => {
    serial.write("22");
    console.log("22");
  });

  btn3.mousePressed(() => {
    serial.write("23");
    console.log("23");
  });

  btn4.mousePressed(() => {
    serial.write("24");
    console.log("24");
  });



}

function draw() {
  background(220);
}
