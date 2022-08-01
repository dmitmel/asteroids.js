import raf from 'raf';

function msToSec(ms) {
  return ms * 1e-3;
}

export default class Ticker {
  prevTime = 0;
  time = 0;
  _accumulatedTime = 0;
  maxFps = 60;
  fps = 0;

  started = false;
  frameID = 0;

  start() {
    if (!this.started) {
      this.started = true;

      this.time = msToSec(
        // rAF internally uses performance.now() to get current time
        performance.now()
      );
      this.prevTime = this.time;

      this.onStart && this.onStart();
      // render the very first frame
      this.onRender && this.onRender();
      this._nextFrame();
    }
  }

  stop() {
    this.started = false;
    raf.cancel(this.frameID);
    this.onStop && this.onStop();
  }

  _handleFrame = timestamp => {
    this.time = msToSec(timestamp);

    const timePerFrame = 1 / this.maxFps;

    // throttle the frame rate
    if (this.time >= this.prevTime + timePerFrame) {
      this.deltaTime = this.time - this.prevTime;
      // note `+=` here: there can be some accumulated time from the previous
      // frame
      this._accumulatedTime += this.deltaTime;
      this.prevTime = this.time;
      this.fps = 1 / this.deltaTime;

      // use loop to catch up
      while (this._accumulatedTime >= timePerFrame) {
        this.onUpdate && this.onUpdate();
        this._accumulatedTime -= timePerFrame;
      }

      // render once per frame
      this.onRender && this.onRender();
    }

    this._nextFrame();
  };

  _nextFrame() {
    if (this.started) this.frameID = raf(this._handleFrame);
  }
}
