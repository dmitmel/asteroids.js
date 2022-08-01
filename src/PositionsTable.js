import MovingCircle from './MovingCircle';
import GameObject from './engine/GameObject';

const fontSize = 24;
const lineHeight = 1;

export default class PositionsTable extends GameObject {
  onInit = game => {
    this.game = game;
  };

  onRender = ctx => {
    const { objects, canvas } = this.game;

    const lines = objects
      .filter(object => object instanceof MovingCircle)
      .map(
        ({ id, pos }) => `${id}: (${Math.round(pos.x)}, ${Math.round(pos.y)})`
      );

    ctx.fillStyle = 'gray';
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';

    const maxWidth = Math.max(
      ...lines.map(text => ctx.measureText(text).width)
    );

    lines.forEach((line, i) =>
      ctx.fillText(line, canvas.size.x - maxWidth, i * fontSize * lineHeight)
    );
  };
}
