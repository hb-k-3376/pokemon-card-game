import { getNode } from '../lib/index.js';

/**
 * 오디오 파일로부터 재생 가능한 사운드 함수를 생성합니다.
 * @param {string} fileName - 재생할 오디오 파일의 경로
 * @returns {Function} 사운드를 재생하는 함수
 */
const createSound = (fileName) => {
  const audio = new Audio(`./assets/sounds/${fileName}`);

  return () => {
    audio.play();
  };
};

export const tab_card_sound = createSound('tab.wav');
export const win_sound = createSound('wind_sound.ogg');
export const miss_match_sound = createSound('miss_match.wav');

// bgm
export const bgm = (() => {
  let currentBgm = null;

  return {
    play(fileName = './assets/sounds/just_a_remake.wav', volume = 0.3) {
      currentBgm = new Audio(fileName);
      currentBgm.loop = true;
      currentBgm.volume = volume;
      currentBgm.play();
    },
    pause() {
      if (currentBgm) {
        currentBgm.pause();
      }
    },
    setVolume(volume) {
      if (currentBgm) currentBgm.volume = volume;
    },
    isPlaying() {
      return currentBgm && !currentBgm.paused;
    },
  };
})();

/**
 * 배경화면 init
 */
export const sound = {
  isPlaying: false,
  handleMusicClick(e) {
    const target = e.currentTarget;
    if (this.isPlaying) {
      bgm.pause();
      target.textContent = '🔇';
      target.classList.remove('active');
    } else {
      bgm.play();
      target.textContent = '🔊';
      target.classList.add('active');
    }
    this.isPlaying = !this.isPlaying;
  },

  init() {
    const bgmButton = getNode('.volume-btn');

    bgmButton.addEventListener('click', (e) => this.handleMusicClick(e));
  },
};
