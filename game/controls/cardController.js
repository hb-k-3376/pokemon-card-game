import { handleCardClick } from './gameController.js';

/**
 * 카드 이벤트 리스너 등록
 * @param {string} boardSelector - 게임 보드 선택자
 */
export const attachCardEventListeners = (boardSelector) => {
  const board = document.querySelector(boardSelector);
  if (board) {
    board.removeEventListener('click', handleCardClick);
    board.addEventListener('click', handleCardClick);
  }
};

/**
 * 카드 이벤트 리스너 제거
 * @param {string} boardSelector - 게임 보드 선택자
 */
export const removeCardEventListeners = (boardSelector) => {
  const board = document.querySelector(boardSelector);
  if (board) {
    board.removeEventListener('click', handleCardClick);
  }
};
