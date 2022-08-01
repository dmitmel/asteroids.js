export function random(min, max) {
  return min + Math.random() * (max - min);
}

export function lerp(a, b, t) {
  return (b - a) * t + a;
}
