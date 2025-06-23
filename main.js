import { initGame, uiController } from './game/index.js';

// 초기 난이도
const configState = {
  cardCount: 4,
};

document.addEventListener('DOMContentLoaded', () => {
  const count = configState.cardCount;
  initGame(count);
  uiController.init(count);
});
