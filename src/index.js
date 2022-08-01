import registerServiceWorker from './registerServiceWorker';
import './canvas.css';
import Game from './engine/Game';
import Ship from './Ship';
import FPSCounter from './FPSCounter';

registerServiceWorker();

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game({
    canvas: document.getElementById('game-canvas'),
    objects: [new Ship(), new FPSCounter()]
  });

  game.start();
});
