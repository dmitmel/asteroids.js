import registerServiceWorker from './registerServiceWorker';
import './canvas.css';
import Game from './engine/Game';
import MovingCircle from './MovingCircle';
import FPSCounter from './FPSCounter';
import PositionsTable from './PositionsTable';

registerServiceWorker();

document.addEventListener('DOMContentLoaded', () => {
  const objects = [];
  for (let i = 0; i < 10; i++) objects.push(new MovingCircle(i));
  objects.push(new FPSCounter(), new PositionsTable());

  const game = new Game({
    canvas: document.getElementById('game-canvas'),
    objects
  });

  game.start();
});
