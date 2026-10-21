// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Interactive cartoon: eyes follow the cursor, wave on click/tap
const coder = document.getElementById('coder');
const svg = coder.querySelector('svg');
const bubble = document.getElementById('bubble');
const eyes = [...svg.querySelectorAll('.eye')];
const lines = ['hi! 👋', 'shipping code…', 'scopes enforced ✅', 'want to build something?', 'click again!'];
let lineIndex = 0;

function lookAt(clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  const scale = rect.width / 320;
  eyes.forEach((eye) => {
    const cx = Number(eye.dataset.cx);
    const cy = Number(eye.dataset.cy);
    const dx = clientX - (rect.left + cx * scale);
    const dy = clientY - (rect.top + cy * scale);
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(4.5, Math.hypot(dx, dy) / 40);
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    eye.querySelector('.pupil').setAttribute('transform', `translate(${x} ${y})`);
    eye.querySelector('.shine').setAttribute('transform', `translate(${x} ${y})`);
  });
}

window.addEventListener('pointermove', (e) => lookAt(e.clientX, e.clientY));

coder.addEventListener('click', () => {
  coder.classList.remove('waving');
  void coder.offsetWidth; // restart animation
  coder.classList.add('waving');
  bubble.textContent = lines[lineIndex % lines.length];
  lineIndex += 1;
});

coder.addEventListener('animationend', (e) => {
  if (e.animationName === 'wave') coder.classList.remove('waving');
});
