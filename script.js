const loadingScreen = document.getElementById('loadingScreen');
const enterBtn = document.getElementById('enterBtn');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const gallerySection = document.getElementById('gallery');
const cakeButton = document.getElementById('cakeButton');
const effectLayer = document.getElementById('effectLayer');
const sparkleLayer = document.getElementById('sparkleLayer');
const revealCards = document.querySelectorAll('.reveal-card');
const slideButtons = {
  prev: document.querySelector('.carousel-btn.prev'),
  next: document.querySelector('.carousel-btn.next'),
};
const slides = Array.from(document.querySelectorAll('.slide'));
let activeSlide = 0;
let slideTimer;

window.addEventListener('load', () => {
  window.setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.pointerEvents = 'none';
  }, 1600);
  createSparkles(28);
  startFloatingEmbers();
  startSlideShow();
  observeReveal();
});

enterBtn.addEventListener('click', () => {
  playMusic();
  gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    playMusic();
  } else {
    bgMusic.pause();
    musicToggle.textContent = 'Play Music';
  }
});

slideButtons.prev.addEventListener('click', () => changeSlide(-1));
slideButtons.next.addEventListener('click', () => changeSlide(1));

cakeButton.addEventListener('click', () => {
  createFireworks();
  createConfetti();
  cakeButton.textContent = 'Candles Lit!';
  cakeButton.disabled = true;
});

function playMusic() {
  bgMusic.play().catch(() => {});
  musicToggle.textContent = 'Pause Music';
}

function changeSlide(direction) {
  activeSlide = (activeSlide + direction + slides.length) % slides.length;
  updateSlides();
  resetSlideTimer();
}

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === activeSlide);
  });
}

function startSlideShow() {
  slideTimer = window.setInterval(() => changeSlide(1), 5800);
}

function resetSlideTimer() {
  window.clearInterval(slideTimer);
  startSlideShow();
}

function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
  });

  revealCards.forEach((card) => observer.observe(card));
}

function startFloatingEmbers() {
  createFloatingItems('heart', 12);
  createFloatingItems('petal', 8);
  window.setInterval(() => createFloatingItems('heart', 5), 2800);
  window.setInterval(() => createFloatingItems('petal', 4), 3200);
}

function createFloatingItems(type, amount) {
  for (let i = 0; i < amount; i += 1) {
    const item = document.createElement('div');
    const left = Math.random() * 92 + 4;
    const delay = Math.random() * 2;
    const size = Math.random() * 18 + 18;

    item.classList.add('effect-item');
    if (type === 'heart') {
      item.classList.add('heart-bubble');
      item.textContent = '❤️';
    } else {
      item.classList.add('petal-bubble');
    }

    item.style.left = `${left}vw`;
    item.style.top = '104vh';
    item.style.fontSize = `${size}px`;
    item.style.animationDelay = `${delay}s`;
    item.style.animationDuration = `${7 + Math.random() * 3}s`;

    effectLayer.appendChild(item);
    window.setTimeout(() => item.remove(), 10000);
  }
}

function createSparkles(amount) {
  for (let i = 0; i < amount; i += 1) {
    const sparkle = document.createElement('div');
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 3;
    const size = Math.random() * 6 + 5;
    sparkle.classList.add('effect-item', 'sparkle-bubble');
    sparkle.style.left = `${x}vw`;
    sparkle.style.top = `${y}vh`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.animationDelay = `${delay}s`;
    sparkleLayer.appendChild(sparkle);
  }
}

function createFireworks() {
  const count = 18;
  const centerX = window.innerWidth * 0.55;
  const centerY = window.innerHeight * 0.3;

  for (let i = 0; i < count; i += 1) {
    const spark = document.createElement('div');
    const angle = (Math.PI * 2 * i) / count;
    const distance = 160 + Math.random() * 60;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    spark.classList.add('effect-item', 'firework-piece');
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.setProperty('--tx', `${x}px`);
    spark.style.setProperty('--ty', `${y}px`);
    spark.style.background = `hsl(${Math.random() * 50 + 330}, 90%, 75%)`;
    effectLayer.appendChild(spark);
    setTimeout(() => spark.remove(), 1100);
  }
}

function createConfetti() {
  const count = 40;
  const season = ['#f8c6d4', '#ffd6a7', '#fbc5f6', '#fff1c3'];
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('div');
    const left = window.innerWidth * 0.25 + Math.random() * window.innerWidth * 0.5;
    const top = window.innerHeight * 0.2;
    const x = Math.random() * 280 - 140;
    const y = Math.random() * 220 + 120;
    const rotate = Math.random() * 360;
    piece.classList.add('effect-item', 'confetti-piece');
    piece.style.left = `${left}px`;
    piece.style.top = `${top}px`;
    piece.style.background = season[Math.floor(Math.random() * season.length)];
    piece.style.transform = `rotate(${rotate}deg)`;
    piece.style.setProperty('--tx', `${x}px`);
    piece.style.setProperty('--ty', `${y}px`);
    effectLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}
