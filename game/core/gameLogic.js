import { gameState } from './gameState.js';

/**
 * 두 카드가 매칭되는지 확인하는 순수한 로직
 * @param {object} firstCard - 첫 번째 카드 { card: number, index: number }
 * @param {object} secondCard - 두 번째 카드 { card: number, index: number }
 * @returns {boolean} - 매칭 여부
 */
export const isCardsMatched = (firstCard, secondCard) => {
  if (!firstCard || !secondCard) return;
  return firstCard.card === secondCard.card;
};

/**
 * 게임 완료 여부 확인
 * @returns {boolean} - 게임 완료 여부
 */
export const isGameComplete = () => {
  return gameState.finish;
};
