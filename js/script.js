// Populate dropdown with images from server
async function loadImages() {
  try {
    const response = await fetch('/api/images');
    const images = await response.json();
    const select = document.getElementById('menuBackground');

    images.forEach(img => {
      const option = document.createElement('option');
      option.value = `img/${img}`;
      option.textContent = img;
      select.appendChild(option);
    });

    // Restore saved background
    const savedBg = localStorage.getItem('menuBackground');
    if (savedBg) {
      document.getElementById('preview').style.backgroundImage = `url('${savedBg}')`;
      select.value = savedBg;
    }
  } catch (err) {
    console.error("Error loading images:", err);
  }
}

// Apply Background
function applyBackground() {
  const bgUrl = document.getElementById('menuBackground').value;
  document.getElementById('preview').style.backgroundImage = `url('${bgUrl}')`;
  localStorage.setItem('menuBackground', bgUrl);
}

// Load everything on page start
window.onload = function() {
  loadImages();

  const savedColor = localStorage.getItem('titleColor');
  const savedAudio = localStorage.getItem('bgMusic');

  if (savedColor) document.getElementById('titleColor').value = savedColor;
  if (savedAudio) document.getElementById('audioPreview').src = savedAudio;
};
