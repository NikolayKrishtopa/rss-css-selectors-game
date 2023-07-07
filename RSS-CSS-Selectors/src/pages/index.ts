import './index.scss';
import Game from '../components/Game';
import TASKS from '../utils/tasks';

import hljs from 'highlight.js/lib/common';
import Popup from '../components/Popup';
hljs.highlightAll();

const resetMock = () => {
  return;
};

const alert = new Popup(resetMock);

const game = new Game(TASKS, alert.open);

alert.reset = game.reset;

export default game;
