DURABILITY = 4;
class Obstacle {
  constructor(_position, _player) {
    this.position = _position;
    this.player = _player;
    this.durability = DURABILITY;
  }

  show() {
    if (this.durability > 0) {
      fill(this.player.playerColor);
      rect(this.position * pixelSize, 0, pixelSize, pixelSize);
    }
  }
}
