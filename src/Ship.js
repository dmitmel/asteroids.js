import keycode from 'keycode';
import GameObject from './engine/GameObject';
import Vector2 from './engine/math/Vector2';

const pressedKeys = new Set();
window.addEventListener('keydown', e => pressedKeys.add(keycode(e)));
window.addEventListener('keyup', e => pressedKeys.delete(keycode(e)));

const rotationSpeed = 5;
const movementSpeed = 10;

export default class MovingCircle extends GameObject {
  pos = new Vector2(0, 0);
  rot = 0;
  scale = 10;
  vel = new Vector2(0, 0);
  mesh = [new Vector2(0, -2), new Vector2(-1, 1), new Vector2(1, 1)];

  onInit = game => {
    this.game = game;
    this.pos = this._getCanvasCenter();
  };

  _getCanvasCenter() {
    const { canvas } = this.game;
    return canvas.size.copy().div(2);
  }

  onUpdate = () => {
    const { ticker } = this.game;

    if (pressedKeys.has('d') || pressedKeys.has('right'))
      this.rot += rotationSpeed * ticker.deltaTime;
    if (pressedKeys.has('a') || pressedKeys.has('left'))
      this.rot -= rotationSpeed * ticker.deltaTime;

    this.vel =
      pressedKeys.has('w') || pressedKeys.has('up')
        ? new Vector2(0, -1).rotate(this.rot)
        : new Vector2(0, 0);
    this.pos.plus(this.vel);
  };

  onRender = ctx => {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    ctx.beginPath();

    const [firstMeshPoint, ...nextMeshPoints] = this._getTransformedMesh();
    const { x: firstX, y: firstY } = firstMeshPoint;
    ctx.moveTo(firstX, firstY);
    nextMeshPoints.forEach(({ x, y }) => ctx.lineTo(x, y));

    ctx.closePath();
    ctx.stroke();
  };

  _getTransformedMesh() {
    return this.mesh.map(point =>
      point
        .copy()
        .rotate(this.rot)
        .times(this.scale)
        .plus(this.pos)
    );
  }
}
