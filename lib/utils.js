// lib/utils.js
/**
 * DOM에서 CSS 선택자로 첫 번째 요소를 선택합니다.
 * @param {string} selector - CSS 선택자 문자열
 * @returns {Element|null} 선택된 HTML 요소 또는 null
 */
export const getNode = (selector) => document.querySelector(selector);

/**
 * 여러가지 선택자
 * @param {string} selector CSS 선택자 문자열
 * @returns {NodeList} 선택된 NodeList 요소 또는 []
 */
export const getNodes = (selector) => document.querySelectorAll(selector);
