//Controller 1
#define C1_Button 2
#define C1_LED  3

//Controller 2
#define C2_Button 5
#define C2_LED  6

int C1_buttonState = 0;
int C2_buttonState = 0;

void setup() {
  pinMode(C1_Button, INPUT);
  pinMode(C1_LED, OUTPUT);
  pinMode(C2_Button, INPUT);
  pinMode(C2_LED, OUTPUT);

  Serial.begin(9600);
}

void loop() {
   C1_buttonState = digitalRead(C1_Button);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (C1_buttonState == HIGH) {
    // turn LED on:
    digitalWrite(C2_LED, HIGH);
    Serial.println("011"); //0: outgoing, 1: from controller 1, 1: action
  } else {
    // turn LED off:
    digitalWrite(C2_LED, LOW);
    Serial.println("010"); //0: outgoing, 1: from controller 1, 1: action
  }

   C2_buttonState = digitalRead(C2_Button);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (C2_buttonState == HIGH) {
    // turn LED on:
    digitalWrite(C1_LED, HIGH);
    Serial.println("021");
  } else {
    // turn LED off:
    digitalWrite(C1_LED, LOW);
    Serial.println("020");
  }

//  
//  //Controller 1
//  static unsigned long C1_lastDebounceTime = 0;
//  static bool C1_lastButtonState = HIGH;
//  bool C1_currentButtonState = digitalRead(C1_Button);
//  if (C1_currentButtonState != C1_lastButtonState && (millis() - C1_lastDebounceTime) > 50) {
//    C1_lastDebounceTime = millis();
//    if (C1_currentButtonState == LOW) { // Assuming the button is active low
//      Serial.println("0 1 1"); //0: outgoing, 1: from controller 1, 1: action
//      digitalWrite(C2_LED, HIGH);
//    }
//  }
//  C1_lastButtonState = C1_currentButtonState;
//
//
//
//  //Controller 2
//  static unsigned long C2_lastDebounceTime = 0;
//  static bool C2_lastButtonState = HIGH;
//  bool C2_currentButtonState = digitalRead(C2_Button);
//
//  if (C2_currentButtonState != C2_lastButtonState && (millis() - C2_lastDebounceTime) > 50) {
//    C2_lastDebounceTime = millis();
//    if (C2_currentButtonState == LOW) { // Assuming the button is active low
//      Serial.println("0 2 1");
//      digitalWrite(C2_LED, HIGH);
//    }
//  }
//  C2_lastButtonState = C2_currentButtonState;


//  // Check for incoming serial command
//  if (Serial.available() > 0) {
//      // Assuming each number is a single digit and we're receiving three numbers
//      String data = Serial.readStringUntil('\n'); // Read the incoming line
//  
//      // Ensure we have exactly 3 characters (for 3 numbers)
//      int command[3]; // Array to store the three numbers
//
//      // Convert each character to an integer and store it
//      command[0] = data.charAt(0) - '0'; // Convert first character to int
//      command[1] = data.charAt(1) - '0'; // Convert second character to int
//      command[2] = data.charAt(2) - '0'; // Convert third character to int
//      
//      if (command[0] == 1) { //1 = incoming message, 0 = outgoing message
//        if (command[1] == 1){
//          //To Controller 1
//          if (command[2] == 1){
//            digitalWrite(C1_LED, HIGH);
//          } else {
//            digitalWrite(C1_LED, LOW);
//          }
//
//          
//        } else if (command[1] == 2) {
//          //To Controller 2
//          if (command[2] == 1){
//            digitalWrite(C2_LED, HIGH);
//          } else {
//            digitalWrite(C2_LED, LOW);
//          }
//
//          
//        }
//      }
//    }
}
