// game/animation.js
import { getNode, getNodes } from '../lib/utils.js';

/**
 * 기본적인 카드 앞 면 뒤집기 config
 */
const flipToFrontConfig = {
  rotationY: 180,
  duration: 0.8,
  ease: 'power2.inOut',
  transformOrigin: 'center center',
};
/**
 * 기본적인 카드 뒷 면 뒤집기 config
 */
const flipToBackConfig = {
  rotationY: 0,
  duration: 0.6,
  ease: 'power2.inOut',
  transformOrigin: 'center center',
};

/**
 * 카드 등장시 애니메이션
 */
export const animationCardEntrance = () => {
  const cards = getNodes('.card');

  gsap.set(cards, {
    x: -500,
    opacity: 0,
    scale: 0.5,
  });

  gsap.to(cards, {
    duration: 0.5,
    x: 0,
    rotation: 0,
    opacity: 1,
    scale: 1,
    ease: 'back.out(1.7)',
    stagger: 0.1,
  });
};

/**
 * 뒷면인 카드 뭉치를 랜덤하게 앞연으로 보여줬다가 다시 뒷 면으로 돌리는 애니메이션
 * @param {number} gameMode 게임 난이도 (카드 장 수)
 */
export const animationShowCardFront = async (gameMode) => {
  const cards = getNodes('.card .card-inner');

  const tl = gsap.timeline();

  await tl
    .to(cards, {
      ...flipToFrontConfig,
      stagger: {
        amount: 1.5,
        from: 'random',
      },
    })
    .to(
      cards,
      {
        ...flipToBackConfig,
        stagger: {
          amount: 1.5,
          from: 'random',
        },
      },
      `+=${gameMode / 10}`
    );
};

/**
 * 카드 앞 면 뒤집기 애니메이션
 * @param {number} index 카드에 부여된 인덱스
 */
export const animationFlipToFront = async (index) => {
  const inner = getNode(`[data-index="${index}"] .card-inner`);

  await gsap.to(inner, flipToFrontConfig);
};

/**
 * 카드 뒷 면 뒤집기 애니메이션
 * @param {number} index 카드에 부여된 인덱스
 */
export const animationFlipToBack = (index) => {
  const inner = getNode(`[data-index="${index}"] .card-inner`);

  gsap.to(inner, flipToBackConfig);
};
