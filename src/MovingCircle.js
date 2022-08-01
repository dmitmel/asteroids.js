import GameObject from './engine/GameObject';
import Vector2 from './engine/math/Vector2';
import { random } from './engine/math';

const minSize = 25;
const maxSize = 75;
const minSpeed = 1;
const maxSpeed = 5;

export default class MovingCircle extends GameObject {
  size = random(minSize, maxSize);
  speed = random(minSpeed, maxSpeed);
  color = Math.floor(random(0, 360));

  constructor(id) {
    super();
    this.id = id;
  }

  onInit = game => {
    this.game = game;
    this.pos = this._randomPointOnCanvas();
    this.targetPos = this._randomPointOnCanvas();
  };

  _randomPointOnCanvas() {
    const { canvas } = this.game;
    return Vector2.random().times(canvas.size);
  }

  onUpdate = () => {
    const { ticker } = this.game;

    this.pos = this.pos.lerp(this.targetPos, this.speed * ticker.deltaTime);

    if (this.pos.distance(this.targetPos) < this.size / 2)
      this.targetPos = this._randomPointOnCanvas();
  };

  onRender = ctx => {
    ctx.fillStyle = `hsl(${this.color}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.font = `${this.size}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.id, this.pos.x, this.pos.y);
  };
}
