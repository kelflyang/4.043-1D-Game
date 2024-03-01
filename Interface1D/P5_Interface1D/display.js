// This is used to aggregrate visual information from all objects before we display them.
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'

class Display {
  constructor(_displaySize, _pixelSize) {
    this.displaySize = _displaySize;
    this.pixelSize = _pixelSize;
    this.displayColor = color(0, 140, 3);
  }

  show() {
    for (let i = 0; i < this.displaySize; i++) {
      fill(this.displayColor);
      stroke(0, 112, 2);
      rect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
    }
  }
}
