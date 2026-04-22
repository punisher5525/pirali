// List of available images in img/ folder
const imageList = [
  "menu_background.jpg",
  "forest.jpg",
  "desert.jpg",
  "city.jpg"
];

// Populate dropdown
window.onload = function() {
  const select = document.getElementById('menuBackground');
  imageList.forEach(img => {
    const option = document.createElement('option');
    option.value = `img/${img}`;
    option.textContent = img;
    select.appendChild(option);
  });

  // Load saved settings
  const savedBg = localStorage.getItem('menuBackground');
  const savedColor = localStorage.getItem('titleColor');
  const savedAudio = localStorage.getItem('bgMusic');

  if (savedBg) {
    document.getElementById('preview').style.backgroundImage = `url('${savedBg}')`;
    select.value = savedBg;
  }
  if (savedColor) document.getElementById('titleColor').value = savedColor;
  if (savedAudio) document.getElementById('audioPreview').src = savedAudio;
};

// Apply Background
function applyBackground() {
  const bgUrl = document.getElementById('menuBackground').value;
  document.getElementById('preview').style.backgroundImage = `url('${bgUrl}')`;
  localStorage.setItem('menuBackground', bgUrl);
}
