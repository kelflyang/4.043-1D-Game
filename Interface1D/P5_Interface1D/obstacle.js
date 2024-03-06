DURABILITY = 4;
class Obstacle {
  constructor(_position, _player) {
    this.position = _position;
    this.player = _player;
    this.durability = DURABILITY;
    this.hit = false;
    this.translate = 0;
    this.originalPosition;
  }

  show() {
    if (this.durability > 0) {
      // Calculate alpha based on durability
      if (this.hit) {
        // Add a random offset to block position to simulate shaking
        if (this.translate === 0) {
          this.translate += 1;
          this.position += 0.15;
        } else if (this.translate === 1) {
          this.translate += 1;
          this.position -= 0.15;
        } else if (this.translate === 2) {
          this.translate += 1;
          this.position -= 0.15;
        } else if (this.translate === 3) {
          this.translate = 0;
          this.position += 0.15;
        }
        setTimeout(() => {
          this.hit = false;
          this.position = this.originalPosition;
        }, 750);
      }
      noStroke();
      let alpha = (255 * this.durability) / 5; // Adjust 100 to your maximum durability
      let transparentColor = this.player.playerTheme;
      transparentColor.setAlpha(alpha);
      fill(transparentColor);
      rect(this.position * pixelSize, 0, pixelSize, pixelSize);
    }
  }
}
