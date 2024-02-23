class Ball {
  constructor() {
    this.dropped = false;
    this.droppedPosition = false;
  }

  setPostiion(_position) {
    this.droppedPosition = _position;
  }

  dropBall(pos) {
    this.dropped = true;
    this.droppedPosition = pos;

    print("changed droppedPos to ", pos);
  }

  pickUpBall() {
    this.dropped = false;
  }
}
