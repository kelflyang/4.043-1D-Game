// This is used to aggregrate visual information from all objects before we display them.
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'

class Display {
  constructor(_displaySize, _pixelSize, _shadowZones) {
    this.displaySize = _displaySize;
    this.pixelSize = _pixelSize;
    this.initColor = color(255, 255, 255); // black color
    this.displayBuffer = [];
    this.shadowZones = _shadowZones;
    this.shadowStroke = color(255, 255, 255);
    this.shadowColor = color(0, 0, 0);

    this.anonColor = color(100, 100, 100);

    this.setAllPixels(this.initColor);
  }

  // Color a specific pixel in the buffer
  setPixel(_index, _color) {
    if (this.inShadowZone(_index)) {
      this.displayBuffer[_index] = this.anonColor;
    } else {
      this.displayBuffer[_index] = _color;
    }
  }

  // Color all pixels in the buffer
  setAllPixels(_color) {
    for (let i = 0; i < displaySize; i++) {
      this.setPixel(i, _color);
    }
  }

  setShadowZones() {
    for (const zone of this.shadowZones) {
      let start = zone[0];
      let end = zone[1];

      for (var i = start; i <= end; i++) {
        this.displayBuffer[i] = this.shadowColor;
      }
    }
  }

  inShadowZone(position) {
    for (const zone of this.shadowZones) {
      let start = zone[0];
      let end = zone[1];

      if (start <= position && position <= end) {
        return true;
      }
    }
    return false;
  }

  // Now write it to screen
  // This is the only function in the entire software that writes something directly to the screen. I recommend you keep it this way.
  show() {
    for (let i = 0; i < this.displaySize; i++) {
      // noStroke();
      if (this.inShadowZone(i)) {
        stroke(this.shadowStroke);
      } else {
        stroke(0, 0, 0);
      }
      fill(this.displayBuffer[i]);
      rect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
    }
  }

  // Let's empty the display before we start adding things to it again
  clear() {
    for (let i = 0; i < this.displaySize; i++) {
      this.displayBuffer[i] = this.initColor;
    }
  }
}
