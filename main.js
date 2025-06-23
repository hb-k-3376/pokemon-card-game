// main.js

import { initGame, uiController } from './game/index.js';

const configState = {
  cardCount: 4,
};

document.addEventListener('DOMContentLoaded', () => {
  const count = configState.cardCount;
  initGame(count);
  uiController.init(count);
});
