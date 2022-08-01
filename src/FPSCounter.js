import GameObject from './engine/GameObject';

export default class FPSCounter extends GameObject {
  onInit = game => {
    this.game = game;
  };

  onRender = ctx => {
    const { ticker } = this.game;

    ctx.fillStyle = 'gray';
    ctx.font = '24px monospace';
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';
    ctx.fillText(`${Math.round(ticker.fps)} FPS`, 0, 0);
  };
}
