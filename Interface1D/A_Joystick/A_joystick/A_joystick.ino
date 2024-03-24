

#include <Keyboard.h>      // include library that let's Arduino act as a keyboard
#include <RotaryEncoder.h> // include rotary encoder library

// // Setup a RoraryEncoder for pins A0 and A1:
RotaryEncoder encoder(A0, A1);

// some useful values
#define OFF 0
#define ON 1

// start by assuming no buttons are pressed
bool keyA = OFF;
bool keyB = OFF;

void setup()
{

  // connect to serial port for debugging
  Serial.begin(57600);

  pinMode(3, INPUT_PULLUP);
  pinMode(4, INPUT_PULLUP);

  Keyboard.begin();
}

void loop()
{
  // A=65, D=68,    B=66, C=67,     E= 69, F=70,        J=74, L=76

  // Read the encoder and output its value,
  /////////////////////////////////////////
  int potVal = analogRead(A0);
  
  if (potVal < 300){
    Serial.println("Left");
    Keyboard.write(65); //A
    // Keyboard.write(74); //J
    delay(200);
    
  } else if (potVal > 800){
    Serial.println("Right");
    Keyboard.write(68); // D 
    // Keyboard.write(76); //L
    delay(200);
  }

  // All the key presses happen here
  //////////////////////////////////////////////

  //Tackle
  if ((digitalRead(3) == HIGH) && keyA == OFF)
  {
    keyA = ON;
    Serial.println("Tackle");
    Keyboard.write(83); // S
    // Keyboard.write(75); // K
    delay(200);
  }
  if (digitalRead(3) == LOW)
  {
    keyA = OFF;
  }

  //Place obstacle
  if ((digitalRead(4) == HIGH) && keyB == OFF)
  {
    keyB = ON;
    Serial.println("Place Obstacle");
    Keyboard.write(87); // W
    // Keyboard.write(73); //I
    delay(200);
  }
  if (digitalRead(4) == LOW)
  {
    keyB = OFF;
  }

}
