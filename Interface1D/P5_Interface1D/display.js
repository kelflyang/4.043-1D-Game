// This is used to aggregrate visual information from all objects before we display them.
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'

class Display {
  constructor(_displaySize, _pixelSize) {
    this.displaySize = _displaySize;
    this.pixelSize = _pixelSize;
    this.displayColor = color(97, 75, 62);
  }

  show() {
    // noStroke();
    for (let i = 0; i < this.displaySize; i++) {
      if (i == 0 || i == this.displaySize - 1) {
        fill(this.displayColor);
        // stroke(218, 218, 218);
        rect(i * this.pixelSize, 0, this.pixelSize + 5, this.pixelSize);
      } else {
        fill(this.displayColor);
        // stroke(218, 218, 218);
        rect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
      }
    }
    // // Court dimensions (adjust as needed)
    // const courtWidth = 1000;
    // const courtHeight = 20;
    // const laneWidth = courtWidth / 5;
    // const radius = laneWidth;

    // // White stroke for court lines
    // stroke(255);
    // strokeWeight(2);
    // noFill();
    // // Draw rectangle outline
    // rect(0, 0, courtWidth, courtHeight);
    // arc(laneWidth, courtHeight, radius * 2, radius * 2, PI, 0);
    // arc(courtWidth - laneWidth, courtHeight, radius * 2, radius * 2, 0, PI);
    // ellipse(courtWidth / 2, courtHeight, radius * 2, radius * 2);
  }
}
