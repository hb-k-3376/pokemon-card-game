import { animationShowCardFront } from '../game/animation.js';
import { getNode, getNodes } from '../lib/index.js';

export const uiController = {
  /**
   * 게임 난이도 클릭 시 ui 컨트롤 및 상태 관리 함수
   * @param {event} e
   */
  handleClickGameMode(e) {
    const target = e.target;
    const others = e.target.parentElement.querySelectorAll('button');
    const board = getNode('.board');

    others.forEach((button) => button.classList.remove('active'));

    target.classList.add('active');

    if (this.onGameModeChange) {
      this.onGameModeChange(target.value);
      board.style.pointerEvents = 'none';
    }
  },

  /**
   * 게임 컨트롤 버튼 클릭 게임을 시작할 수 있고 리셋 할 수 있다.
   * TODO: 퍼즈 버튼 추가 예정
   * @param {event} e
   */
  handleGameAction(e) {
    const target = e.target;

    const board = getNode('.board');
    const gameMode = getNode('.pokemon-btn.active');

    if (target.classList.contains('start-btn')) {
      // 시작 버튼 disabled
      target.disabled = true;
      // TODO: 게임 시작 시 로직
      animationShowCardFront(gameMode.value).then(() => {
        board.style.pointerEvents = 'auto';
      });
    } else {
      // 게임 리셋
      // 시작 버튼 disabled 품
      getNode('.start-btn').disabled = false;
      this.onGameModeChange(gameMode.value);
      board.style.pointerEvents = 'none';
    }
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
      button.addEventListener('click', (e) => this.handleGameAction(e));
    });
  },
};
