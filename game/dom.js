import { getNode } from '../lib/index.js';
import { createCard } from './cardView.js';
import { shuffle } from './gameUtils.js';

/**
 *
 * @param {string} selector string 값으로 들어오는 카드를 뿌려줄 부모 요소
 * @param {number[]} cards 카드를 만들 숫자 배열
 */
export const renderCards = (selector, cards) => {
  const node = getNode(selector);
  const shuffled = shuffle(cards);
  const cardsHTML = shuffled.map((card, index) => createCard({ card, index })).join('');
  node.innerHTML = cardsHTML;
};

/**
 * 카드 인덱스로 해당 카드의 element 가져오는 함수
 * @param {number} index 카드 인덱스
 * @returns {Element} 카드 element
 */
export const getCardElementBy = (index) => getNode(`[data-index="${index}"]`);
