import { getNodes } from '../lib/index.js';

export const uiController = {
  /**
   * 게임 난이도 클릭 시 ui 컨트롤 및 상태 관리 함수
   * @param {event} e
   */
  handleClickGameMode(e) {
    const target = e.target;
    const others = e.target.parentElement.querySelectorAll('button');

    others.forEach((button) => button.classList.remove('active'));

    target.classList.add('active');

    if (this.onGameModeChange) {
      this.onGameModeChange(target.value);
    }
  },

  handleGameAction(e) {
    const target = e.target;
    const others = e.target.parentElement.querySelectorAll('button');
    others.forEach((button) => button.classList.remove('active'));
    target.classList.add('active');
    // TODO: 게임 스타트 로직
  },

  /**
   * ui 바인딩 함수
   * @param {function} onGameModeChange main에 있는 configState를 변경하기위해 받아오는 함수
   */
  init(onGameModeChange) {
    this.onGameModeChange = onGameModeChange;
    const modeButtons = getNodes('.pokemon-btn');
    const actionButtons = getNodes('.action-btn');

    modeButtons.forEach((button) => {
      button.addEventListener('click', (e) => this.handleClickGameMode(e));
    });

    actionButtons.forEach((button) => {
      button.addEventListener('click', this.handleGameAction);
    });
  },
};
