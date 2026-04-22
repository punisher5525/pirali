
// Tab switching
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// Apply Background
function applyBackground() {
  const bgUrl = document.getElementById('menuBackground').value;
  if (bgUrl) {
    document.getElementById('preview').style.backgroundImage = `url('${bgUrl}')`;
    localStorage.setItem('menuBackground', bgUrl);
  }
}

// Apply Appearance
function applyAppearance() {
  const titleColor = document.getElementById('titleColor').value;
  localStorage.setItem('titleColor', titleColor);
  alert("Appearance settings saved!");
}

// Apply Audio
function applyAudio() {
  const audioUrl = document.getElementById('bgMusic').value;
  const audioPlayer = document.getElementById('audioPreview');
  if (audioUrl) {
    audioPlayer.src = audioUrl;
    audioPlayer.play();
    localStorage.setItem('bgMusic', audioUrl);
  }
}

// Load saved settings
window.onload = function() {
  const bgUrl = localStorage.getItem('menuBackground');
  const titleColor = localStorage.getItem('titleColor');
  const audioUrl = localStorage.getItem('bgMusic');

  if (bgUrl) document.getElementById('preview').style.backgroundImage = `url('${bgUrl}')`;
  if (titleColor) document.getElementById('titleColor').value = titleColor;
  if (audioUrl) document.getElementById('audioPreview').src = audioUrl;
};
