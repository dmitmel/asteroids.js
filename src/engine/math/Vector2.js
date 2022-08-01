export default class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static random() {
    return new Vector2(Math.random(), Math.random());
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  lerp(v, t) {
    return v
      .copy()
      .minus(this)
      .times(t)
      .plus(this);
  }

  plus(b) {
    if (b instanceof Vector2) {
      this.x += b.x;
      this.y += b.y;
    } else {
      this.x += b;
      this.y += b;
    }
    return this;
  }

  minus(b) {
    if (b instanceof Vector2) {
      this.x -= b.x;
      this.y -= b.y;
    } else {
      this.x -= b;
      this.y -= b;
    }
    return this;
  }

  times(b) {
    if (b instanceof Vector2) {
      this.x *= b.x;
      this.y *= b.y;
    } else {
      this.x *= b;
      this.y *= b;
    }
    return this;
  }

  div(b) {
    if (b instanceof Vector2) {
      this.x /= b.x;
      this.y /= b.y;
    } else {
      this.x /= b;
      this.y /= b;
    }
    return this;
  }

  distance(v) {
    return v.copy().minus(this).length;
  }

  normalize() {
    return this.div(this.length);
  }

  direction(v) {
    return v
      .copy()
      .minus(this)
      .normalize();
  }
}
