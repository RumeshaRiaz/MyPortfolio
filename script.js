// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// ====================
// Custom Cursor with Particles
// ====================
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursorFollower);

const particles = [];
const particleCount = 20;

// Create particles
for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  // Base styles for each particle
  particle.style.position = 'fixed';
  particle.style.backgroundColor = 'var(--particle-color)';
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '9997';

  const size = Math.random() * 10 + 5;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.opacity = Math.random() * 0.5 + 0.1;
  document.body.appendChild(particle);

  particles.push({
    element: particle,
    x: 0,
    y: 0,
    speedX: Math.random() * 2 - 1,
    speedY: Math.random() * 2 - 1,
    angle: 0,
    size
  });
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  cursorFollower.style.left = `${e.clientX}px`;
  cursorFollower.style.top = `${e.clientY}px`;

  particles.forEach(particle => {
    particle.angle += 0.01;
    const distance = 50 + Math.sin(particle.angle * 3) * 20;
    particle.x = e.clientX + Math.cos(particle.angle) * distance;
    particle.y = e.clientY + Math.sin(particle.angle) * distance;
    particle.element.style.left = `${particle.x}px`;
    particle.element.style.top = `${particle.y}px`;
  });
});

// Cursor hover effects
const hoverTargets = document.querySelectorAll('a, button, .project-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ====================
// Video Background Control
// ====================
const bgVideo = document.getElementById('bg-video');

function attemptPlay() {
  bgVideo.play().catch(error => {
    console.log('Video autoplay prevented:', error);
    bgVideo.load();
  });
}

bgVideo.addEventListener('loadedmetadata', () => {
  bgVideo.playbackRate = 0.8;
  attemptPlay();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) bgVideo.pause();
  else attemptPlay();
});

window.addEventListener('resize', () => {
  const aspectRatio = bgVideo.videoWidth / bgVideo.videoHeight;
  if (window.innerWidth / window.innerHeight > aspectRatio) {
    bgVideo.style.width = '100%';
    bgVideo.style.height = 'auto';
  } else {
    bgVideo.style.width = 'auto';
    bgVideo.style.height = '100%';
  }
});

// ====================
// Smooth Scrolling for Anchor Links
// ====================
const pageLinks = document.querySelectorAll('a[href^="#"]');
pageLinks.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
    // Close mobile nav on link click
    if (navLinks.classList.contains('nav-active')) {
      navLinks.classList.remove('nav-active');
      burger.classList.remove('toggle');
    }
  });
});


// ====================
// Mobile Navigation Toggle
// ====================
burger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  burger.classList.toggle('toggle');
});

navLinksItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('nav-active');
    burger.classList.remove('toggle');
  });
});

// ====================
// Scroll Reveal Animation
// ====================
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  const windowHeight = window.innerHeight;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight - 150) {
      section.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
