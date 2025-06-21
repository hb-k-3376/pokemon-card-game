import { getCardElementBy, renderCards } from './dom.js';
import { flipToFront, flipToBack, setGridLayout } from './cardView.js';
import { getCards } from './gameUtils.js';
import { getNode } from '../lib/utils.js';

export const gameState = {
  firstCard: null,
  secondCard: null,
  isChecking: false,
  matchedPairs: 0,
};

/**
 * 게임 상태 초기화
 */
const resetGameState = () => {
  gameState.firstCard = null;
  gameState.secondCard = null;
  gameState.isChecking = false;
};

/**
 * 카드 매칭 성공
 */
const handleSuccessMatch = () => {
  const firstNode = getCardElementBy(gameState.firstCard.index);
  const secondNode = getCardElementBy(gameState.secondCard.index);
  firstNode.classList.add('matched');
  secondNode.classList.add('matched');

  gameState.matchedPairs++;

  resetGameState();

  console.log('매칭 성공');
};

/**
 * 카드 매칭 실패
 */
const handleFailMatch = () => {
  setTimeout(() => {
    const firstNode = getCardElementBy(gameState.firstCard.index);
    const secondNode = getCardElementBy(gameState.secondCard.index);

    flipToBack(gameState.firstCard.index);
    flipToBack(gameState.secondCard.index);

    firstNode.classList.remove('flipped');
    secondNode.classList.remove('flipped');

    resetGameState();
  }, 2000);
};

/**
 * first card 와 second card를 매칭하여 같은지 다른지 판단 후 각 로직
 */
const checkMatch = () => {
  const isMatched = gameState.firstCard.card === gameState.secondCard.card;

  if (isMatched) {
    handleSuccessMatch();
  } else {
    handleFailMatch();
  }
};

/**
 * 유요한 카드를 클릭했는지 체크하는 함수
 * @param {Element} clickedCard 클린된 카드 element
 * @param {number} index 클릭된 카드 index
 * @returns {boolean} 유요한 카드 클릭 여부 판단
 */
const isValidCardClick = (clickedCard, index) => {
  if (!clickedCard) return false;
  if (clickedCard.classList.contains('flipped')) return false;
  if (clickedCard.classList.contains('matched')) return false;
  if (gameState.firstCard?.index === index) return false;
  return true;
};

/**
 * 첫 번쨰 카드 선택 함수
 * @param {number} card  클릭된 카드 자체에 부여된 번호 페어를 이루고 있음
 * @param {number} index 클릭된 카드의 인덱스
 */
const selectFirstCard = (card, index) => {
  gameState.firstCard = { card, index };
  flipToFront(index);
};

/**
 * 두 번쨰 카드 선택 함수
 * @param {number} card  클릭된 카드 자체에 부여된 번호 페어를 이루고 있음
 * @param {number} index 클릭된 카드의 인덱스
 */
const selectSecondCard = (card, index) => {
  gameState.secondCard = { card, index };
  gameState.isChecking = true;
  flipToFront(index);
  checkMatch();
};

/**
 * 카드 클릭 이벤트 핸들러
 * @param {event} e
 */
export const handleCardClick = (e) => {
  const clickedCard = e.target.closest('.card');
  const index = clickedCard.dataset.index;
  const card = clickedCard.dataset.card;

  if (!isValidCardClick(clickedCard, index)) return;

  if (!gameState.firstCard) {
    selectFirstCard(card, index);
  } else if (!gameState.secondCard) {
    selectSecondCard(card, index);
  }
};

/**
 * 게임 시작 시 설정해여할 이벤트 리스너 등록
 */
export const initGame = (count) => {
  setGridLayout(count);
  renderCards('.board', getCards(count));
  getNode('.board').addEventListener('click', handleCardClick);
};
