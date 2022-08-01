import raf from 'raf';

function msToSec(ms) {
  return ms * 1e-3;
}

export default class Ticker {
  prevTime = 0;
  time = 0;
  deltaTime = 0;
  _accumulatedTime = 0;
  maxFps = 60;
  fps = 0;
  maxUpdatesPerFrame = Infinity;

  started = false;
  frameID = 0;

  start() {
    if (!this.started) {
      this.started = true;

      this.prevTime = this.time = msToSec(
        // rAF internally uses performance.now() to get current time
        performance.now()
      );

      this.onStart && this.onStart();
      // render the very first frame
      if (this.started) this.onRender && this.onRender();
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
    this.deltaTime = this.time - this.prevTime;

    // skip this frame if the frame rate is too low
    if (this.deltaTime < 1000) {
      const timePerFrame = 1 / this.maxFps;

      if (this.time >= this.prevTime + timePerFrame) {
        // note `+=` here: there can be some accumulated time from the previous
        // frame
        this._accumulatedTime += this.deltaTime;
        this.prevTime = this.time;
        this.fps = 1 / this.deltaTime;

        let updatesPerFrame = 0;
        // use loop to catch up
        while (this.started && this._accumulatedTime >= timePerFrame) {
          // sanity check
          if (updatesPerFrame > this.maxUpdatesPerFrame) {
            this._accumulatedTime = 0;
            break;
          }
          updatesPerFrame++;

          this.onUpdate && this.onUpdate();
          this._accumulatedTime -= timePerFrame;
        }

        // render once per frame
        if (this.started) this.onRender && this.onRender();
      }
    }

    this._nextFrame();
  };

  _nextFrame() {
    if (this.started) this.frameID = raf(this._handleFrame);
  }
}
