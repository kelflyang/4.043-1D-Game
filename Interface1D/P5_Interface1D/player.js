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
    this.tackledTimes = 0;
    this.playerTheme = color(_playerColor);
    this.acceleratingFactor = 0;
    this.score = 0;
    this.tackled = false;
    this.newPosition;
  }

  show() {
    if (this.tackled) {
      print("tackled");
      // Add a random offset to block position to simulate shaking
      if (this.newPosition > this.position) {
        // this.position = Math.max(
        //   this.position + Math.abs(this.newPosition - this.position) / 10,
        //   this.newPosition
        // );
        this.position += Math.abs(this.newPosition - this.position) / 5;
      } else {
        // this.position = Math.min(
        //   this.position - Math.abs(this.newPosition - this.position) / 10,
        //   this.newPosition
        // );
        this.position -= Math.abs(this.newPosition - this.position) / 5;
      }

      print("this position ", this.position);

      setTimeout(() => {
        this.tackled = false;
      }, 500);
    }

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
