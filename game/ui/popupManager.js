import { getNode } from '../../lib/index.js';

/**
 * 승리 팝업 표시
 */
export const showWinPopup = () => {
  const popup = getNode('#popup');
  if (popup) {
    popup.style.display = 'flex';
  }
};

/**
 * 승리 팝업 숨김
 */
export const hideWinPopup = () => {
  const popup = getNode('#popup');
  if (popup) {
    popup.style.display = 'none';
  }
};

/**
 * 팝업 상태 토글
 * @param {boolean} show 표시 여부
 */
export const toggleWinPopup = (show) => {
  if (show) {
    showWinPopup();
  } else {
    hideWinPopup();
  }
};

/**
 * 게임 모드에 따른 승리 팝업창 표시
 * @param {string} 게임 난이도 표시
 */
export const setGameMode = (gameMode) => {
  const popupMode = getNode('#gameMode');

  popupMode.textContent = gameMode;
};
