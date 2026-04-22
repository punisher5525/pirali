// js/settings.js
export function loadSettings() {
  return {
    background: localStorage.getItem('menuBackground') || 'img/menu_background.jpg',
    titleColor: localStorage.getItem('titleColor') || '#000000',
    bgMusic: localStorage.getItem('bgMusic') || null
  };
}
