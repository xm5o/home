// utils.js
// Highlight function for debugging
function highlight(element) {
  element.style.outline = '2px solid red';
  setTimeout(() => element.style.outline = '', 2000);
}