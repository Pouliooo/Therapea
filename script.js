// ── NAVBAR SCROLL ──
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── BURGER MENU ──
const burger = document.querySelector('.navbar__burger');
const navLinks = document.querySelector('.navbar__links');
burger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  });
});

// ── PAGE TRANSITIONS ──
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.35s ease';
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || link.target === '_blank') return;
  e.preventDefault();
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = href; }, 320);
});

// ── SCROLL ANIMATIONS ──
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate').forEach(el => animObserver.observe(el));

// ── LIGHTBOX ──
function initLightbox(containerSelector) {
  const containers = document.querySelectorAll(containerSelector);
  if (!containers.length) return;

  const images = [];
  containers.forEach(c => {
    c.querySelectorAll('img').forEach(img => {
      images.push(img);
      const wrap = img.closest('.real-img, .atelier-gallery__item');
      if (wrap) wrap.style.cursor = 'pointer';
    });
  });
  if (!images.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <div class="lightbox__backdrop"></div>
    <button class="lightbox__close" aria-label="Fermer">✕</button>
    <button class="lightbox__prev" aria-label="Précédent">&#8249;</button>
    <button class="lightbox__next" aria-label="Suivant">&#8250;</button>
    <div class="lightbox__img-wrap">
      <img class="lightbox__img" src="" alt="" />
    </div>
    <div class="lightbox__counter"></div>
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('.lightbox__img');
  const lbCounter = lb.querySelector('.lightbox__counter');
  let current = 0;
  let touchStartX = 0;

  function open(index) {
    current = ((index % images.length) + images.length) % images.length;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    lbCounter.textContent = `${current + 1} / ${images.length}`;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  images.forEach((img, i) => {
    const wrap = img.closest('.real-img, .atelier-gallery__item');
    if (wrap) wrap.addEventListener('click', () => open(i));
  });

  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.querySelector('.lightbox__prev').addEventListener('click', () => open(current - 1));
  lb.querySelector('.lightbox__next').addEventListener('click', () => open(current + 1));
  lb.querySelector('.lightbox__backdrop').addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') open(current - 1);
    if (e.key === 'ArrowRight') open(current + 1);
  });

  lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? open(current + 1) : open(current - 1);
  });
}

initLightbox('.realisations__grid');
initLightbox('.atelier-gallery');

// ── FORMULAIRE TYPE DE SÉANCE ──
const seancePrivee = document.getElementById('seance-privee');
const seanceGroupe = document.getElementById('seance-groupe');
const groupeField = document.getElementById('groupe-field');

if (seancePrivee && seanceGroupe && groupeField) {
  function toggleGroupe() {
    const show = seanceGroupe.checked;
    groupeField.style.display = show ? 'flex' : 'none';
    groupeField.querySelector('input').required = show;
  }
  seancePrivee.addEventListener('change', toggleGroupe);
  seanceGroupe.addEventListener('change', toggleGroupe);
  toggleGroupe();
}
