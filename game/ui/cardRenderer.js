import { POKEMON_CARD_IMAGES } from '../../lib/index.js';

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
