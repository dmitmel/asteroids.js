import Game from './Game';

export default interface GameObject {
  onInit?(game: Game): void;
  onStart?(): void;
  onUpdate?(): void;
  onRender?(context: CanvasRenderingContext2D): void;
};
