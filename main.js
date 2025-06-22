import { initGame, gameState } from './game/index.js';
import { uiController } from './ui/index.js';

const configState = {
  cardCount: 4,
};

const handleGameModeChange = (newCount) => {
  configState.cardCount = newCount;
  initGame(newCount);
};

document.addEventListener('DOMContentLoaded', () => {
  const count = configState.cardCount;
  initGame(count);
  uiController.init(handleGameModeChange);
});
