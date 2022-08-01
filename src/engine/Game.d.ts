import Vector2 from './math/Vector2';
import Ticker from './Ticker';

type GameObject = {
  onInit?: (game: Game) => void;
  onStart?: () => void;
  onUpdate?: () => void;
  onRender?: (context: CanvasRenderingContext2D) => void;
};

export default class Game {
  constructor(options: { canvas: HTMLCanvasElement; objects: GameObject[] });

  canvas: {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    size: Vector2;
  };

  objects: GameObject[];

  ticker: Ticker;

  start(): void;
  started: boolean;
  stop(): void;
}
