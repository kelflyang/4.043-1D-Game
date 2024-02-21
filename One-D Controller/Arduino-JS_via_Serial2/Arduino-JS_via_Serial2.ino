//Controller 1
#define C1_Button 2
#define C1_LED  3

//Controller 2
#define C2_Button 5
#define C2_LED  6

int C1_buttonState = 0; // Current state of the button
int C1_lastButtonState = 0; // Previous state of the button

int C2_buttonState = 0; // Current state of the button
int C2_lastButtonState = 0; // Previous state of the button

void setup() {
  pinMode(C1_Button, INPUT);
  pinMode(C1_LED, OUTPUT);
  pinMode(C2_Button, INPUT);
  pinMode(C2_LED, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  // Read the current state of buttons
  C1_buttonState = digitalRead(C1_Button);
  C2_buttonState = digitalRead(C2_Button);

  // Check if state changed from high to low (button release)
  if (C1_buttonState != C1_lastButtonState) {
    if (C1_buttonState == LOW) { // If current state is LOW then button was released
      Serial.println("11"); // Send from controller 1
    }
    // Delay a little bit to avoid bouncing
    delay(50);
  }

  if (C2_buttonState != C2_lastButtonState) {
    if (C2_buttonState == LOW) { // If current state is LOW then button was released
      Serial.println("12"); // Send from controller 2
    }
    // Delay a little bit to avoid bouncing
    delay(50);
  }

  // Update the last button state
  C1_lastButtonState = C1_buttonState;
  C2_lastButtonState = C2_buttonState;

//  // Receive from serial port (kept unchanged)
//  if (Serial.available() > 0) {
//    String data = Serial.readStringUntil('\n'); // Read the incoming line
//
//    int command[2];
//    command[0] = data.charAt(0) - '0';
//    command[1] = data.charAt(1) - '0';
//
//    if (command[0] == 2) { // 2 = incoming message, 0 = outgoing message
//      if (command[1] == 1) {
//        // To Controller 1
//        digitalWrite(C1_LED, HIGH);
////        delay(1000);
////        digitalWrite(C1_LED, LOW);
//      } else if (command[1] == 2) {
//        // To Controller 2
//        digitalWrite(C2_LED, HIGH);
////        delay(1000);
////        digitalWrite(C2_LED, LOW);
//      }
//    }
//  }
}
