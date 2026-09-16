// ================================================
// LEARN VISUAL PHOTOGRAPHY
// main.js — Site-wide utilities
//
// Handles: navigation active states, scroll reveal,
// mobile menu, and shared page setup.
// ================================================


// ---- Mark the current page's nav link as active ----
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
    }
  });
}


// ---- Mobile nav hamburger toggle ----
function setupMobileMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}


// ---- Scroll-triggered reveal animations ----
// Elements with class 'reveal' fade in when they enter the viewport.
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once revealed — no need to re-trigger
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,    // trigger when 10% of element is visible
    rootMargin: '0px 0px -40px 0px' // slightly before bottom of viewport
  });

  revealElements.forEach(el => observer.observe(el));
}


// ---- Smooth slider fill (visual progress fill behind thumb) ----
// Keeps the filled part of each slider blue and unfilled part gray.
function updateSliderFill(slider) {
  const min  = parseFloat(slider.min)  || 0;
  const max  = parseFloat(slider.max)  || 100;
  const val  = parseFloat(slider.value);
  const pct  = ((val - min) / (max - min)) * 100;

  slider.style.background = `linear-gradient(
    to right,
    var(--blue) 0%,
    var(--blue) ${pct}%,
    var(--bg-muted) ${pct}%,
    var(--bg-muted) 100%
  )`;
}

// Apply fill to all sliders on the page, and update on input
function setupSliderFills() {
  document.querySelectorAll('.slider').forEach(slider => {
    updateSliderFill(slider); // initial fill
    slider.addEventListener('input', () => updateSliderFill(slider));
  });
}


// ---- Run on every page load ----
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
  setupMobileMenu();
  setupScrollReveal();
  setupSliderFills();
});
