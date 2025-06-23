import {
  animationCardEntrance,
  animationFlipToFront,
  animationFlipToBack,
  animationShowCardFront,
} from '../animation.js';
import { attachCardEventListeners, removeCardEventListeners } from './cardController.js';
import {
  selectFirstCard,
  gameState,
  selectSecondCard,
  isValidCardSelection,
  handleMatchSuccess,
  handleMatchFailure,
  getCards,
  resetGameForRestart,
  isCardsMatched,
  isGameComplete,
  initGameState,
} from '../core/index.js';
import { initGameBoard } from '../ui/gameRenderer.js';
import { showWinPopup } from '../ui/popupManager.js';
import { miss_match_sound, tab_card_sound, win_sound } from '../sound.js';

/**
 * 게임 승리 핸들러
 */
const handleGameWin = () => {
  showWinPopup();
  resetGameForRestart();
  win_sound();
};

/**
 * first card 와 second card를 매칭하여 같은지 다른지 판단 후 각 로직
 */
const checkMatch = () => {
  const isMatched = isCardsMatched(gameState.firstCard, gameState.secondCard);

  if (isMatched) {
    handleMatchSuccess();

    // 게임 완료 확인
    if (isGameComplete()) {
      handleGameWin();
    }
  } else {
    animationFlipToBack(gameState.firstCard.index);
    animationFlipToBack(gameState.secondCard.index);
    miss_match_sound();
    handleMatchFailure();
  }
};

/**
 * 카드 클릭 이벤트 핸들러
 * @param {event} e
 */
export const handleCardClick = (e) => {
  const clickedCard = e.target.closest('.card');
  const index = clickedCard.dataset.index;
  const card = clickedCard.dataset.card;

  if (!isValidCardSelection(index)) return;
  // 사운드
  tab_card_sound();
  // 첫 번재 카드 선택
  if (!gameState.firstCard) {
    selectFirstCard(card, index);
    // 애니메이션
    animationFlipToFront(index);
  }
  // 두 번째 카드 선택
  else if (!gameState.secondCard) {
    selectSecondCard(card, index);
    // 애니메이션 및 매칭 체크
    animationFlipToFront(index).then(() => checkMatch());
  }
};
/**
 * 게임 시작 (카드 미리보기 후 시작)
 * @param {number} gameMode - 게임 난이도 (카드 개수)
 */
export const startGame = async (gameMode) => {
  // 카드 미리보기 애니메이션
  await animationShowCardFront(gameMode);

  // 게임 시작 - 카드 클릭 활성화
  enableCardInteraction();
};

/**
 * 게임 리셋
 * @param {number} count - 카드 개수
 */
export const resetGame = (count) => {
  // 기존 이벤트 리스너 제거
  removeCardEventListeners('.board');

  // 새 게임 시작
  initGame(count);
};

/**
 * 카드 상호작용 활성화
 */
export const enableCardInteraction = () => {
  const board = document.querySelector('.board');
  if (board) {
    board.style.pointerEvents = 'auto';
  }
};

/**
 * 카드 상호작용 비활성화
 */
export const disableCardInteraction = () => {
  const board = document.querySelector('.board');
  if (board) {
    board.style.pointerEvents = 'none';
  }
};

/**
 * 게임 시작 시 설정해여할 이벤트 리스너 등록
 */
export const initGame = (count) => {
  // 게임 보드에 카드 깔기
  initGameBoard('.board', getCards(count));
  // 기본적인 게임 데이터 설정
  initGameState(count);
  // 카드 애니메이션
  animationCardEntrance();
  attachCardEventListeners('.board');
};
