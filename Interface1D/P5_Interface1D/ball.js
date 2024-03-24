class Ball {
  constructor(_position, _ballColor) {
    this.position = _position;
    this.ballColor = _ballColor;
    this.isDropped = true;
  }

  show() {
    if (this.isDropped) {
      // translate(random(-5, 5), random(-5, 5));
      strokeWeight(2);
      fill(this.ballColor);
      rect(this.position * pixelSize, 0, pixelSize, pixelSize);
    }
  }
}
