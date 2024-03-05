DURABILITY = 4;
class Obstacle {
  constructor(_position, _player) {
    this.position = _position;
    this.player = _player;
    this.durability = DURABILITY;
  }

  show() {
    if (this.durability > 0) {
      // Calculate alpha based on durability
      noStroke();
      let alpha = (255 * this.durability) / 3.5; // Adjust 100 to your maximum durability
      let transparentColor = this.player.playerTheme;
      transparentColor.setAlpha(alpha);
      fill(transparentColor);
      rect(this.position * pixelSize, 0, pixelSize, pixelSize);
    }
  }
}
