class Ball {
  constructor(_position, _ballColor) {
    this.position = _position;
    this.ballColor = _ballColor;
    this.isDropped = true;
  }

  show() {
    if (this.isDropped) {
      fill(this.ballColor);
      rect(this.position * pixelSize, 0, pixelSize, pixelSize);
    }
  }
}
