// Simple scroll spy for header glass effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 20) {
    nav.classList.add('shadow-2xl');
    nav.style.backgroundColor = 'rgba(11, 19, 38, 0.9)';
  } else {
    nav.classList.remove('shadow-2xl');
    nav.style.backgroundColor = 'rgba(11, 19, 38, 0.8)';
  }
});

// CTA Interactions
document.querySelectorAll('button, a').forEach(el => {
  el.addEventListener('mousedown', () => {
    el.classList.add('scale-95');
  });
  el.addEventListener('mouseup', () => {
    el.classList.remove('scale-95');
  });
  el.addEventListener('mouseleave', () => {
    el.classList.remove('scale-95');
  });
});
