import { getNode, getNodes } from '../../lib/index.js';
import { hideWinPopup } from '../ui/popupManager.js';
import { initGame, disableCardInteraction, startGame, resetGame } from './gameController.js';

export const uiController = {
  // 현재 선택된 게임 모드
  currentGameMode: null,

  // 게임 모드 변경 콜백 (기존 호환성을 위해 유지)
  onGameModeChange: null,
  /**
   * 시작 버튼 활성화
   */
  enableStartButton() {
    const startBtn = getNode('.start-btn');
    if (startBtn) {
      startBtn.disabled = false;
    }
  },

  /**
   * 시작 버튼 비활성화
   */
  disableStartButton() {
    const startBtn = getNode('.start-btn');
    if (startBtn) {
      startBtn.disabled = true;
    }
  },

  /**
   * 게임 난이도 클릭 시 ui 컨트롤 및 상태 관리 함수
   * @param {event} e
   */
  handleClickGameMode(e) {
    const target = e.target;
    const gameMode = parseInt(target.value);

    // UI 상태 업데이트
    this.updateGameModeButtons(target);

    // 게임 모드 저장
    this.currentGameMode = gameMode;
    // 게임 초기화
    initGame(gameMode);

    // 카드 클릭 비활성화 (시작 버튼을 눌러야 활성화)
    disableCardInteraction();

    // 시작 버튼 활성화
    this.enableStartButton();

    if (this.onGameModeChange) {
      this.onGameModeChange(target.value);
    }
  },
  /**
   * 게임 모드 버튼들 UI 상태 업데이트
   * @param {Element} selectedButton - 선택된 버튼
   */
  updateGameModeButtons(selectedButton) {
    const buttons = selectedButton.parentElement.querySelectorAll('button');
    buttons.forEach((button) => button.classList.remove('active'));
    selectedButton.classList.add('active');
  },

  /**
   * 게임 컨트롤 버튼 클릭 게임을 시작할 수 있고 리셋 할 수 있다.
   * TODO: 퍼즈 버튼 추가 예정
   * @param {event} e
   */
  async handleGameAction(e) {
    const target = e.target;

    if (target.classList.contains('start-btn')) {
      await this.handleStartGame(target);
    } else {
      this.handleResetGame();
    }
  },

  /**
   * 게임 시작 처리
   * @param {Element} startButton - 시작 버튼
   */
  async handleStartGame(startButton) {
    // 시작 버튼 비활성화
    startButton.disabled = true;

    // 게임 시작 (카드 미리보기 포함)
    await startGame(this.currentGameMode);

    // 시작 후에는 리셋 버튼만 활성화
    this.disableStartButton();
  },

  /**
   * 게임 리셋 처리
   */
  handleResetGame() {
    // 게임 리셋
    console.log(this.currentGameMode);
    resetGame(this.currentGameMode);

    // 카드 클릭 비활성화
    disableCardInteraction();

    // 시작 버튼 다시 활성화
    this.enableStartButton();
  },

  /**
   * 게임 승리 시 나오는 팝업창 이벤트 핸들러
   * @param {event} e
   */
  handlePopupControl(e) {
    const target = e.target;
    const gameMode = getNode('.pokemon-btn.active');

    if (target.classList.contains('popup-overlay') || target.classList.contains('btn-primary')) {
      hideWinPopup();
      this.onGameModeChange(gameMode.value);
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
    const popupOverly = getNode('.popup-overlay');
    this.currentGameMode = getNode('.pokemon-btn.active').value;

    modeButtons.forEach((button) => {
      button.addEventListener('click', (e) => this.handleClickGameMode(e));
    });

    actionButtons.forEach((button) => {
      button.addEventListener('click', (e) => this.handleGameAction(e));
    });

    popupOverly.addEventListener('click', (e) => this.handlePopupControl(e));
  },
};
