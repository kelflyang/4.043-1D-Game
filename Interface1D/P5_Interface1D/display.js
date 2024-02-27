// This is used to aggregrate visual information from all objects before we display them.
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'

class Display {
  constructor(_displaySize, _pixelSize, _ball) {
    this.displaySize = _displaySize;
    this.pixelSize = _pixelSize;
    this.initColor = color(255, 255, 255); // black color
    this.displayBuffer = [];
    this.rangeColor = color(0, 0, 0);
    this.ball = ball;
    this.off = false;

    this.setAllPixels(this.initColor);
  }

  setPlayers(_players) {
    this.players = _players;
  }

  // Color a specific pixel in the buffer
  setPixel(_index, _color) {
    this.displayBuffer[_index] = _color;
  }

  // Color all pixels in the buffer
  setAllPixels(_color) {
    for (let i = 0; i < displaySize; i++) {
      this.setPixel(i, _color);
    }
  }

  setPassRange(position, direction) {
    if (direction === 0) {
      for (let i = position; i < -1; i--) {
        this.setPixel(i, this.rangeColor);
      }
    } else {
      for (let i = position; i > this.displaySize; i++) {
        this.setPixel(i, this.rangeColor);
      }
    }
  }

  // Now write it to screen
  // This is the only function in the entire software that writes something directly to the screen. I recommend you keep it this way.
  show() {
    for (let i = 0; i < this.displaySize; i++) {
      stroke("black");
      // noStroke();
      fill(this.displayBuffer[i]);
      rect(i * this.pixelSize, 0, this.pixelSize, this.pixelSize);
    }
    if (!this.off) {
      // show player orientation
      for (const player of players) {
        fill("pink");
        if (player.direction == 0) {
          rect(
            player.position * this.pixelSize,
            0,
            this.pixelSize / 4,
            this.pixelSize
          );
        } else {
          rect(
            (player.position + 1) * this.pixelSize - this.pixelSize / 4,
            0,
            this.pixelSize / 4,
            this.pixelSize
          );
        }
      }

      // show ball
      let itemPlayer;
      for (const player of players) {
        if (player.hasItem) {
          itemPlayer = player;
        }
      }

      fill("orange");

      if (itemPlayer) {
        ellipse(
          itemPlayer.position * this.pixelSize + this.pixelSize / 2,
          this.pixelSize / 2,
          this.pixelSize / 2,
          this.pixelSize / 2
        );

        // set passing range

        color = itemPlayer.playerColor;
        fill(color);
        noStroke();
        let alpha = 255;
        if (itemPlayer.direction == 1) {
          for (let i = 1; i <= 3; i++) {
            alpha = alpha * 0.5;
            color.setAlpha(alpha);
            fill(color);
            ellipse(
              (itemPlayer.position + i) * this.pixelSize + this.pixelSize / 2,
              this.pixelSize / 2,
              this.pixelSize / 4,
              this.pixelSize / 4
            );
          }
        } else {
          for (let i = 1; i <= 3; i++) {
            alpha = alpha * 0.5;
            color.setAlpha(alpha);
            fill(color);
            ellipse(
              (itemPlayer.position - i) * this.pixelSize + this.pixelSize / 2,
              this.pixelSize / 2,
              this.pixelSize / 4,
              this.pixelSize / 4
            );
          }
        }
        color.setAlpha(255);
      } else {
        // ball is dropped
        if (this.ball.dropped) {
          ellipse(
            ball.droppedPosition * this.pixelSize + this.pixelSize / 2,
            this.pixelSize / 2,
            this.pixelSize / 2,
            this.pixelSize / 2
          );
        }
      }
    }
  }

  // Let's empty the display before we start adding things to it again
  clear() {
    for (let i = 0; i < this.displaySize; i++) {
      this.displayBuffer[i] = this.initColor;
    }
  }
}
