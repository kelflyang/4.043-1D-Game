// This holds some player information, like color and position.
// It also has some player methods for managing how a player moves.

class Player {
  constructor(_id, _color, _position) {
    this.id = _id;
    this.playerColor = _color;
    this.defaultColor = _color;
    this.position = _position;
    this.hasToken = false;
    this.hasKnife = false;

    this.lives = 2;
  }

  receiveItem(item) {
    if (item == "KNIFE") {
      this.hasKnife = true;
      this.playerColor = color(50, 50, 50);
    } else {
      this.hasToken = true;
      this.playerColor = color(200, 50, 200);
    }
  }

  removeItem(item) {
    if (item == "KNIFE") {
      this.hasKnife = false;
    } else {
      this.hasToken = false;
    }
    this.playerColor = this.defaultColor;
  }

  die() {
    this.lives -= 1;
  }
}
