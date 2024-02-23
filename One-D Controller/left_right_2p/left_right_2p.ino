//Controller 1
#define C1_Button_left 3
#define C1_Button_right 5
#define C1_LED  3

//Controller 2
#define C2_Button_left 7
#define C2_Button_right 9
#define C2_LED  6

int C1_left_buttonState = 0; // Current state of the button
int C1_left_lastButtonState = 0; // Previous state of the button
int C1_right_buttonState = 0; // Current state of the button
int C1_right_lastButtonState = 0; // Previous state of the button

int C2_left_buttonState = 0; // Current state of the button
int C2_left_lastButtonState = 0; // Previous state of the button
int C2_right_buttonState = 0; // Current state of the button
int C2_right_lastButtonState = 0; // Previous state of the button


void setup() {
  pinMode(C1_Button_left, INPUT);
  pinMode(C1_Button_right, INPUT);
  pinMode(C1_LED, OUTPUT);
  pinMode(C2_Button_left, INPUT);
  pinMode(C2_Button_right, INPUT);
  pinMode(C2_LED, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  // Read the current state of buttons
  C1_left_buttonState = digitalRead(C1_Button_left);
  C1_right_buttonState = digitalRead(C1_Button_right);

  C2_left_buttonState = digitalRead(C2_Button_left);
  C2_right_buttonState = digitalRead(C2_Button_right);

  // c1- left
  if (C1_left_buttonState != C1_left_lastButtonState) {
    if (C1_left_buttonState == LOW) {
      Serial.println("111");
    }
    delay(50);
  }

   // c1- right
  if (C1_right_buttonState != C1_right_lastButtonState) {
    if (C1_right_buttonState == LOW) {
      Serial.println("112");
    }
    delay(50);
  }

  // c2- left
  if (C2_left_buttonState != C2_left_lastButtonState) {
    if (C2_left_buttonState == LOW) {
      Serial.println("121");
    }
    delay(50);
  }

  // c2- right
  if (C2_right_buttonState != C2_right_lastButtonState) {
    if (C2_right_buttonState == LOW) {
      Serial.println("122");
    }
    delay(50);
  }

  // Update the last button state
  C1_left_lastButtonState = C1_left_buttonState;
  C1_right_lastButtonState = C1_right_buttonState;
  C2_left_lastButtonState = C2_left_buttonState;
  C2_right_lastButtonState = C2_right_buttonState;


}
