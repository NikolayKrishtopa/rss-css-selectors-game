import './index.scss';
import Game from '../components/Game';
import TASKS from '../utils/tasks';

import hljs from 'highlight.js/lib/common';
hljs.highlightAll();

const game = new Game(TASKS);

export default game;
