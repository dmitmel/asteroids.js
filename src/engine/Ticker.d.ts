export default class Ticker {
  prevTime: number;
  time: number;
  deltaTime: number;
  maxFps: number;
  fps: number;
  maxUpdatesPerFrame: number;

  started: boolean;
  frameID: number;

  start(): void;
  stop(): void;
}
