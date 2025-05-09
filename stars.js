const STAR_COUNT = 120;
const container = document.getElementById('starfield');
for (let i = 0; i < STAR_COUNT; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.top     = Math.random() * 100 + '%';
  s.style.left    = Math.random() * 100 + '%';
  s.style.animationDuration = (Math.random() * 3 + 1) + 's';
  s.style.animationDelay    = Math.random() * 5 + 's';
  container.appendChild(s);
}