// ── MOBILE MENU ──
function openMenu() {
  document.getElementById('mobileMenu').classList.add('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── SCROLL REVEAL WITH STAGGER ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.children)
        .filter(el => el.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION ──
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let cur = 0;

      const iv = setInterval(() => {
        cur += target / 45;
        if (cur >= target) {
          cur = target;
          clearInterval(iv);
        }
        el.textContent = Math.floor(cur) + suffix;
      }, 28);
    });
    statsObserver.disconnect();
  }
}, { threshold: 0.5 });

statsObserver.observe(document.getElementById('stats'));

// ── NAVBAR SHRINK ON SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 40) {
    nav.style.padding = '11px 6%';
    nav.style.boxShadow = '0 4px 20px rgba(37,99,235,0.08)';
  } else {
    nav.style.padding = '16px 6%';
    nav.style.boxShadow = 'none';
  }
});

// ── CONTACT FORM SUBMIT ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const orig = btn.textContent;
  btn.textContent = '✅ Message Sent!';
  btn.style.background = '#16a34a';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
