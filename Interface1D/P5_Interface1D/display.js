// This is used to aggregrate visual information from all objects before we display them.
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'

class Display {
  constructor(_displaySize, _pixelSize) {
    this.displaySize = _displaySize;
    this.pixelSize = _pixelSize;
    this.displayColor = color(97, 75, 62);
  }

  show(writeToLap = [], player = undefined) {
    noStroke();

    for (let i = 0; i < this.displaySize; i++) {
      fill(this.displayColor);
      rect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
    }

    for (let i = 0; i < writeToLap.length; i++) {
      print("write trail to lap");
      let transparentColor = player.playerTheme;
      let alpha = 50 + 0.5 * i;
      print(alpha);
      transparentColor.setAlpha(alpha);
      fill(transparentColor);
      rect(writeToLap[i] * this.pixelSize, 0, this.pixelSize, this.pixelSize);
    }
  }
}
