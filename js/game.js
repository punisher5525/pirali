function startGame(){
  // ensure player name is set
  const savedName = localStorage.getItem('pirali_player_name');
  if(!savedName){
    const n = (prompt('შეიყვანე შენი სახელი (მაქს. 14 სიმბოლო):') || '').trim().slice(0,14);
    if(n) localStorage.setItem('pirali_player_name', n);
  }
  bgmStop();
  score=0;health=5;maxHealth=5;ammo=8;maxAmmo=8;level=1;
  inventory.herbs=0;inventory.medals=0;swordCombo=0;swordComboTimer=0;
  shakePow=0;killStreak=0;killStreakTimer=0;_floats.length=0;bloodDecals=[];
  paused=false;document.getElementById('pause-overlay').style.display='none';
  document.getElementById('btn-pause').textContent='⏸';
  updateHealthUI();updateScoreUI();updateAmmoUI();updateInventoryUI();hideBossUI();
  document.getElementById('screen').style.display='none';
  document.getElementById('screen').className='';
  genWorld();running=true;
  showBanner(LEVEL_NAMES[1]);
}

// ── LOOP ──
let last=0;
function loop(ts){const dt=Math.min((ts-last)/16.67,2.5);last=ts;if(running&&!paused){update(dt);render();}requestAnimationFrame(loop);}
updateHealthUI();updateAmmoUI();
requestAnimationFrame(loop);
// Start BGM on first user interaction (mobile autoplay policy)
(function(){
  function onFirstTouch(){
    _bgmDecode(bgmPlay);
    document.removeEventListener('touchstart',onFirstTouch);
    document.removeEventListener('mousedown',onFirstTouch);
    document.removeEventListener('pointerdown',onFirstTouch);
  }
  document.addEventListener('touchstart',onFirstTouch,{once:true});
  document.addEventListener('mousedown',onFirstTouch,{once:true});
  document.addEventListener('pointerdown',onFirstTouch,{once:true});

// ── Stop music when app goes to background / tab switches / page closes ──
document.addEventListener('visibilitychange', function(){
  if(document.hidden) bgmStop();
});
window.addEventListener('pagehide', function(){ bgmStop(); });
window.addEventListener('blur', function(){ bgmStop(); });
})();

function startIntro(){
  bgmStop();
  document.getElementById('screen').style.display = 'none';

  const container = document.getElementById('introVideoContainer');
  const video = document.getElementById('introVideo');

  // Show intro container
  container.style.display = 'block';
  container.style.opacity = '1';
  
  // Reset and play video
  video.currentTime = 0;
  video.loop = false;
  
  // Stop music
  setTimeout(() => { bgmStop(); }, 50);
  
  // Try to play video
  setTimeout(() => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log('Autoplay blocked');
      });
    }
  }, 100);

  // Guaranteed: After 6 seconds, hide video and start game
  setTimeout(() => {
    try {
      video.pause();
      container.style.opacity = '0';
      container.style.transition = 'opacity 0.3s';
    } catch(e) {}
    
    setTimeout(() => {
      container.style.display = 'none';
      startGame();
    }, 300);
  }, 6000);
}

