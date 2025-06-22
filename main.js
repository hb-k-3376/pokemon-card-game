// main.js

import { initGame, uiController } from './game/index.js';

const configState = {
  cardCount: 4,
};

const handleGameModeChange = (newCount = configState.cardCount) => {
  configState.cardCount = newCount;
  initGame(newCount);
};

document.addEventListener('DOMContentLoaded', () => {
  const count = configState.cardCount;
  initGame(count);
  uiController.init(handleGameModeChange);
});
