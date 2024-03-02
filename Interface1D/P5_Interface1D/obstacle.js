class Obstacle {
  constructor(_position, _durability, _player) {
    this.position = _position;
    this.durability = _durability;
    this.player = _player;
    
  }

  show() {
    if (this.durability > 0) {
      // this.player.playerColor.setAlpha(128);
      // fill(this.player.playerColor);
      // rect(this.position * pixelSize, 0, pixelSize, pixelSize);

      // Calculate alpha based on durability
      let alpha = 255 * this.durability / 3;  // Adjust 100 to your maximum durability
      let transparentColor = color(this.player.playerColor);
      transparentColor.setAlpha(alpha);
      fill(transparentColor);
      rect(this.position * pixelSize, 0, pixelSize, pixelSize);
    }
  }
}
