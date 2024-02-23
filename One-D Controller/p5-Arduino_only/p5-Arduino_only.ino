#define C1_LED  2
#define C2_LED 4
#define C3_LED  6
#define C4_LED  8


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {  
  if (Serial.available() >= 2) {
    char firstDigit = Serial.read();
    char secondDigit = Serial.read();

    if (isdigit(firstDigit) && isdigit(secondDigit)) {
      int num1 = firstDigit - '0';  // Convert ASCII to integer
      int num2 = secondDigit - '0';
      int numbers[] = {num1, num2};  // Create the array

      if (numbers[0] == 2){//incoming
        if (numbers[1] == 1){
          digitalWrite(C1_LED, HIGH);
          delay(300);
          digitalWrite(C1_LED, LOW);
        } else if (numbers[1] == 2){
          digitalWrite(C2_LED, HIGH);
          delay(300);
          digitalWrite(C2_LED, LOW);
        } else if (numbers[1] == 3){
          digitalWrite(C3_LED, HIGH);
          delay(300);
          digitalWrite(C3_LED, LOW);
        } else if (numbers[1] == 4){
          digitalWrite(C4_LED, HIGH);
          delay(300);
          digitalWrite(C4_LED, LOW);
        } 
      }
    }
  }
}
