class Timer {
  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.running = false;
  }

  start() {
    if (!this.running) {
      this.startTime = Date.now() - this.elapsedTime;
      this.running = true;
    }
  }

  stop() {
    if (this.running) {
      this.elapsedTime = Date.now() - this.startTime;
      this.running = false;
    }
  }

  reset() {
    this.elapsedTime = 0;
    this.startTime = 0;
    this.running = false;
  }

  update() {
    if (this.running) {
      this.elapsedTime = Date.now() - this.startTime;
    }
  }

  getElapsedTime() {
    if (this.running) {
      this.update();
    }
    return this.elapsedTime;
  }
}
