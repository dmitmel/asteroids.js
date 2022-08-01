import { lerp } from './index';

export default class Vector2 {
  constructor(x, y) {
    this.set(x, y);
  }

  static random() {
    return new Vector2(Math.random(), Math.random());
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get sqrLength() {
    return this.x * this.x + this.y * this.y;
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  set(x, y) {
    if (arguments.length < 2) {
      if (x instanceof Vector2) {
        this.x = x.x;
        this.y = x.y;
      } else {
        this.x = this.y = x;
      }
    } else {
      this.x = x;
      this.y = y;
    }
    return this;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  lerp(b, t) {
    return this.set(lerp(this.x, b.x, t), lerp(this.y, b.y, t));
  }

  plus(b) {
    return b instanceof Vector2
      ? this.set(this.x + b.x, this.y + b.y)
      : this.set(this.x + b, this.y + b);
  }

  minus(b) {
    return b instanceof Vector2
      ? this.set(this.x - b.x, this.y - b.y)
      : this.set(this.x - b, this.y - b);
  }

  times(b) {
    return b instanceof Vector2
      ? this.set(this.x * b.x, this.y * b.y)
      : this.set(this.x * b, this.y * b);
  }

  div(b) {
    return b instanceof Vector2
      ? this.set(this.x / b.x, this.y / b.y)
      : this.set(this.x / b, this.y / b);
  }

  negate() {
    this.set(-this.x, -this.y);
  }

  distance(b) {
    const dx = b.x - this.x;
    const dy = b.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  normalize() {
    const len = this.length;
    return len > 0 ? this.set(this.x / len, this.y / len) : this.set(0);
  }

  direction(b) {
    this.x = b.x - this.x;
    this.y = b.y - this.y;
    this.normalize();
    return this;
  }

  dot(b) {
    return this.x * b.x + this.y * b.y;
  }

  rotate(angle) {
    return this.set(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle)
    );
  }
}
