/**
 * 카드 상태 정의
 */
export const CARD_STATE = {
  HIDDEN: 'hidden',
  REVEALED: 'revealed',
  MATCHED: 'matched',
};

/**
 * 게임 상태 객체
 * 모든 게임 상태를 여기서 중앙 관리
 */
export const gameState = {
  // 선택된 카드들
  firstCard: null, // { card: number, index: number }
  secondCard: null, // { card: number, index: number }

  // 게임 진행 상태
  isChecking: false, // 매칭 검사 중인지
  matchedPairs: 0, // 매칭된 페어 수
  cardCount: 0, // 전체 카드 수

  // 각 카드의 상태 배열
  cardStates: [], // ['hidden', 'revealed', 'matched', ...]

  // 게임 완료 여부 계산
  get finish() {
    return this.cardCount / 2 === this.matchedPairs;
  },
};

/**
 * 게임 상태 초기화
 * @param {number} cardCount - 카드 총 개수
 */
export const initGameState = (cardCount) => {
  gameState.firstCard = null;
  gameState.secondCard = null;
  gameState.isChecking = false;
  gameState.matchedPairs = 0;
  gameState.cardCount = cardCount;
  gameState.cardStates = new Array(cardCount).fill(CARD_STATE.HIDDEN);
};

/**
 * 선택 카드 상태 리셋 (매칭 처리 후)
 */
export const resetSelectedCards = () => {
  gameState.firstCard = null;
  gameState.secondCard = null;
  gameState.isChecking = false;
};

/**
 * 카드 상태 확인 함수들
 */
export const isCardMatched = (index) => {
  return gameState.cardStates[index] === CARD_STATE.MATCHED;
};

export const isCardRevealed = (index) => {
  return gameState.cardStates[index] === CARD_STATE.REVEALED;
};

export const isCardHidden = (index) => {
  return gameState.cardStates[index] === CARD_STATE.HIDDEN;
};

/**
 * 카드 상태 변경 함수들
 */
export const setCardRevealed = (index) => {
  gameState.cardStates[index] = CARD_STATE.REVEALED;
};

export const setCardMatched = (index) => {
  gameState.cardStates[index] = CARD_STATE.MATCHED;
};

export const setCardHidden = (index) => {
  gameState.cardStates[index] = CARD_STATE.HIDDEN;
};

/**
 * 첫 번째 카드 선택
 * @param {number} card - 카드 값
 * @param {number} index - 카드 인덱스
 */
export const selectFirstCard = (card, index) => {
  gameState.firstCard = { card, index };
  setCardRevealed(index);
};

/**
 * 두 번째 카드 선택
 * @param {number} card - 카드 값
 * @param {number} index - 카드 인덱스
 */
export const selectSecondCard = (card, index) => {
  gameState.secondCard = { card, index };
  gameState.isChecking = true;
  setCardRevealed(index);
};

/**
 * 매칭 성공 처리
 */
export const handleMatchSuccess = () => {
  const firstIndex = gameState.firstCard.index;
  const secondIndex = gameState.secondCard.index;

  setCardMatched(firstIndex);
  setCardMatched(secondIndex);
  gameState.matchedPairs++;

  resetSelectedCards();
};

/**
 * 매칭 실패 처리
 */
export const handleMatchFailure = () => {
  const firstIndex = gameState.firstCard.index;
  const secondIndex = gameState.secondCard.index;

  setCardHidden(firstIndex);
  setCardHidden(secondIndex);

  resetSelectedCards();
};

/**
 * 카드 선택이 유효한지 검사 (순수 함수)
 * @param {number} index - 선택하려는 카드 인덱스
 * @returns {boolean} - 선택 가능 여부
 */
export const isValidCardSelection = (index) => {
  // 인덱스 범위 검사
  if (index < 0 || index >= gameState.cardCount) return false;

  // 이미 매칭된 카드는 선택 불가
  if (isCardMatched(index)) return false;

  // 이미 뒤집어진 카드는 선택 불가
  if (isCardRevealed(index)) return false;

  // 같은 카드 중복 선택 불가
  if (gameState.firstCard?.index === index) return false;

  // 매칭 검사 중에는 선택 불가
  if (gameState.isChecking) return false;

  return true;
};

/**
 * 현재 게임 상태 정보 조회 (디버깅용)
 * @returns {object} - 게임 상태 정보
 */
export const getGameStateInfo = () => ({
  totalCards: gameState.cardCount,
  totalPairs: gameState.cardCount / 2,
  matchedPairs: gameState.matchedPairs,
  remainingPairs: gameState.cardCount / 2 - gameState.matchedPairs,
  isGameComplete: gameState.finish,
  firstCard: gameState.firstCard,
  secondCard: gameState.secondCard,
  isChecking: gameState.isChecking,
  cardStates: [...gameState.cardStates], // 복사본 반환
});

/**
 * 게임 완료 시 상태 리셋
 */
export const resetGameForRestart = () => {
  gameState.matchedPairs = 0;
  resetSelectedCards();
};
