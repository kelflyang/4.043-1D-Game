// This holds some player information, like color and position.
// It also has some player methods for managing how a player moves.

class Player {
  constructor(_playerId, _playerColor, _position) {
    this.playerId = _playerId;
    this.playerColor = color(_playerColor);
    this.position = _position;
    this.hasBall = false;
    this.blocksLeft = 2;
    this.direction;
    this.tackled = 0;
    this.playerTheme = color(_playerColor);
  }

  show() {
    if (this.hasBall) {
      stroke(color([255, 255, 0]));
      strokeWeight(5);
    }
    fill(this.playerColor);
    rect(this.position * pixelSize, 0, pixelSize, pixelSize);
    stroke(color(0, 0, 0));
    strokeWeight(1);
  }
}
