// js/menu.js
import { loadSettings } from './settings.js';

export function renderMenu() {
  const settings = loadSettings();

  const menu = document.getElementById('menu');
  menu.style.backgroundImage = `url('${settings.background}')`;

  const title = document.getElementById('gameTitle');
  title.style.color = settings.titleColor;

  if (settings.bgMusic) {
    const audio = new Audio(settings.bgMusic);
    audio.loop = true;
    audio.play();
  }
}
