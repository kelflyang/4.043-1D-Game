let serial;
let latestData = "waiting for data";

function setup() {
 createCanvas(windowWidth, windowHeight);

 serial = new p5.SerialPort();

 serial.list();
 serial.open('/dev/tty.usbserial-1410');
 serial.on('connected', serverConnected);
 serial.on('list', gotList);
 serial.on('data', gotData);
 serial.on('error', gotError);
 serial.on('open', gotOpen);
 serial.on('close', gotClose);
}

function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
 console.log(currentString);
 latestData = currentString;
}

function draw() {
 background(255,255,255);
//  fill(0,0,0);
//  text(latestData, 10, 10);

  var status1 = "Controller 1: ";
  var status2 = "Controller 2: ";

  if(latestData > 0){
    console.log(latestData);

    if (latestData[0] == 1) { //recieving
        if (latestData[1] == 1){ //controller 1
            if (latestData[2] == 1){
                status1 = status1 + "Left";
            }
            if (latestData[2] == 2){
                status1 = status1 + "Right";
            }
    

        } else if (latestData[1] == 2) { //controller 2
            if (latestData[2] == 1){
                status2 = status2 +  "Left";
            }
            if (latestData[2] == 2){
                status2 = status2 +  "Right";
            }
        } 
        
    }
}


  //display text
  text(status1, 10, 80);
  text(status2, 10, 130);

  latestData = 0;

}