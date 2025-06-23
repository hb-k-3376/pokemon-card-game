import { bgm, initGame, sound, uiController } from './game/index.js';

// 초기 난이도
const configState = {
  cardCount: 4,
};

document.addEventListener('DOMContentLoaded', () => {
  initGame(configState.cardCount);
  uiController.init(configState.cardCount);

  // bgm
  sound.init();
});
