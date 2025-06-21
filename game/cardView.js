import { POKEMON_CARD_IMAGES } from '../lib/pokemon.js';
import { getNode } from '../lib/utils.js';

/**
 * 카드 숫자에 따라 cols 갯수를 계산해주는 헬퍼 함수
 * @param {number} amount 카드 숫자
 * @returns cols 카운트
 */
const getColumCount = (amount) => {
  return amount <= 4 ? amount : amount <= 8 ? 4 : Math.ceil(Math.sqrt(amount));
};

/**
 * 카드의 갯수 만큼 동적으로 grid cols 변경
 * @param {number} cards
 */
export const setGridLayout = (amount) => {
  const board = getNode('.board');

  board.style.gridTemplateColumns = `repeat(${getColumCount(amount)}, 1fr)`;
};

/**
 * 숫자를 부여할 카드 생성
 * @param {number} card 카드에 적용할 숫자
 * @returns {Element} card
 */
export const createCard = ({ card, index }) => {
  const cardImage = POKEMON_CARD_IMAGES[card - 1];
  return `
    <li class="card" data-card="${card}" data-index="${index}">
      <div class="card-inner">
        <div class="card-front" style="background-image: url('${cardImage}')"></div>
        <div class="card-back"></div>
      </div>
    </li>
  `;
};

export const flipToFront = (index) => {
  const inner = getNode(`[data-index="${index}"] .card-inner`);

  gsap.to(inner, {
    rotationY: 180,
    duration: 0.8,
    ease: 'power2.inOut',
    transformOrigin: 'center center',
  });
};

export const flipToBack = (index) => {
  const inner = getNode(`[data-index="${index}"] .card-inner`);

  gsap.to(inner, {
    rotationY: 0,
    duration: 0.6,
    ease: 'power2.inOut',
    transformOrigin: 'center center',
  });
};
