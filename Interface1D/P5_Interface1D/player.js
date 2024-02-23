// This holds some player information, like color and position.
// It also has some player methods for managing how a player moves.

class Player {
  constructor(_id, _color, _position, _direction) {
    this.id = _id;
    this.playerColor = _color;
    this.defaultColor = _color;
    this.position = _position;
    this.hasItem = false;
    this.direction = _direction;
  }

  receiveItem() {
    this.hasItem = true;
    // this.playerColor = color(50, 50, 50);
  }

  removeItem(item) {
    this.hasItem = false;
    // this.playerColor = this.defaultColor;
  }
}
