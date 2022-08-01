import Vector2 from './math/Vector2';
import Ticker from './Ticker';

export default class Game {
  constructor({ canvas, objects }) {
    this._initCanvas(canvas);
    this._initObjects(objects);
    this._initTicker();
  }

  _initCanvas(element) {
    this.canvas = {
      element,
      context: element.getContext('2d')
    };

    const resizeCanvas = () => {
      const width = (element.width = window.innerWidth);
      const height = (element.height = window.innerHeight);
      this.canvas.size = new Vector2(width, height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  _initObjects(objects) {
    this.objects = objects;
    this.objects.forEach(({ onInit }) => onInit && onInit(this));
  }

  _initTicker() {
    this.ticker = new Ticker();
    this.ticker.onStart = () =>
      this.objects.forEach(({ onStart }) => onStart && onStart());

    this.ticker.onUpdate = () =>
      this.objects.forEach(({ onUpdate }) => onUpdate && onUpdate());

    this.ticker.onRender = () => {
      const { context, size } = this.canvas;

      context.clearRect(0, 0, size.x, size.y);
      this.objects.forEach(({ onRender }) => onRender && onRender(context));
    };
  }

  start() {
    this.ticker.start();
  }

  get started() {
    return this.ticker.started;
  }

  stop() {
    this.ticker.stop();
  }
}
