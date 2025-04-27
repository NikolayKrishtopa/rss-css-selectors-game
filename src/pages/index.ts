import './index.scss';
import Game from '../components/Game';
import TASKS from '../utils/tasks';

import hljs from 'highlight.js';

import Popup from '../components/Popup';

const highlight = hljs.highlightAll;

const resetMock = () => {
  return;
};

const alert = new Popup(resetMock);

const game = new Game(TASKS, alert.open, highlight);

alert.reset = game.reset;

export default game;
