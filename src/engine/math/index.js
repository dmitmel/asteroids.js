export function random(min, max) {
  return min + Math.random() * (max - min);
}

export function lerp(a, b, t) {
  return a + (b - a) * clamp(t, 0, 1);
}

export function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
