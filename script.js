// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Burger menu toggle
const burger = document.querySelector('.navbar__burger');
const links  = document.querySelector('.navbar__links');
burger.addEventListener('click', () => {
  links.classList.toggle('open');
});
