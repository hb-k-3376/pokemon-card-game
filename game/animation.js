import { getNodes } from '../lib/utils.js';

export const animationCardEntrance = () => {
  const cards = getNodes('.card');

  gsap.set(cards, {
    x: -500,
    opacity: 0,
    scale: 0.5,
  });
  // 각 카드를 순차적으로 애니메이션
  gsap.to(cards, {
    duration: 0.5,
    x: 0, // 원래 자리로
    rotation: 0, // 정상 회전
    opacity: 1, // 불투명
    scale: 1, // 원래 크기
    ease: 'back.out(1.7)', // 탄성 효과
    stagger: 0.1, // 0.1초씩 시차를 두고
  });
};
