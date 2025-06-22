// game/gameUtils.js
/**
 * min부터 max 사이의 랜덤한 난수 생성
 * @param {number} min - 최솟값 (기본값: 1)
 * @param {number} max - 최댓값 (기본값: 200)
 * @returns {number} min부터 max 사이의 정수
 */
const getRandomNumber = (min = 1, max = 259) => {
  return Math.floor(Math.random() * max - min + 1) + min;
};

/**
 * 원하는 카드 개수만큼 랜덤한 숫자를 만들어 주는데 해당 값들은 각각 페어를 이루고 있다.
 * @param {number} amount - 생성할 카드 개수 (짝수여야 함)
 * @returns {number[]} 생성된 카드 배열, 각각 페어로 구성됨 (길이: amount)
 */
export const getCards = (amount) => {
  const randomNumbers = Array.from({ length: amount / 2 }, () => getRandomNumber());
  return [...randomNumbers, ...randomNumbers];
};

/**
 * 카드 배열을 섞는 함수
 * @param {number[]} cards - 섞을 카드 배열
 * @returns {number[]}섞인 카드 뭉치
 */
export const shuffle = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[j], shuffled[i]] = [shuffled[i], shuffled[j]];
  }
  return shuffled;
};
