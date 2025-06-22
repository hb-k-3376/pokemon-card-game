import { getNode } from '../../lib/utils.js';
import { shuffle } from '../core/index.js';
import { createCard } from './cardRenderer.js';

/**
 * 카드 숫자에 따라 cols 갯수를 계산해주는 헬퍼 함수
 * @param {number} amount 카드 숫자
 * @returns {number} cols 카운트
 */
const getColumCount = (amount) => {
  return amount <= 4 ? amount : amount <= 8 ? 4 : Math.ceil(Math.sqrt(amount));
};

/**
 * 카드의 갯수 만큼 동적으로 grid cols 변경
 * @param {number} amount 카드 개수
 */
export const setGridLayout = (amount) => {
  const board = getNode('.board');
  board.style.gridTemplateColumns = `repeat(${getColumCount(amount)}, 1fr)`;
};

/**
 * 게임 보드에 카드들을 렌더링
 * ✅ 기존 dom.js의 renderCards 이동
 * @param {string} selector 카드를 뿌려줄 부모 요소 선택자
 * @param {number[]} cards 카드를 만들 숫자 배열
 */
const renderCards = (selector, cards) => {
  const node = getNode(selector);
  const shuffled = shuffle(cards);
  const cardsHTML = shuffled.map((card, index) => createCard({ card, index })).join('');
  node.innerHTML = cardsHTML;
};

/**
 * 게임 보드 전체 초기화 및 렌더링
 * @param {string} boardSelector 보드 선택자
 * @param {number[]} cards 카드 배열
 */
export const initGameBoard = (boardSelector, cards) => {
  setGridLayout(cards.length);
  renderCards(boardSelector, cards);
};
