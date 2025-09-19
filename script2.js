/*fetch("./intro.md")
  .then(response => response.text())
  .then(text => {
    document.getElementById("intro-txt").innerText = text;
  })
  .catch(err => console.error("Error loading file:", err));
 */
// Function to add a random rotation to a new element
function addRandomRotation(event) {
  const minDistance = 150; // Minimum distance from the center
  const isClickInsideSafeZone =
    event.clientX > minDistance &&
    event.clientX < (window.innerWidth - minDistance) &&
    event.clientY > minDistance &&
    event.clientY < (window.innerHeight - minDistance);

  if (event.target.closest('.chaos-item') || event.target.closest('#theme-toggle-button') || isClickInsideSafeZone) {
    return;
  }

  const randomRotation = Math.floor(Math.random() * 20) - 10;
  const randomXOffset = Math.floor(Math.random() * 40) - 20;
  const randomYOffset = Math.floor(Math.random() * 40) - 20;

  const body = document.body;
  const item = document.createElement('div');
  item.className = 'chaos-item floating-element';
  item.style.position = 'absolute';
  item.style.left = `${event.clientX + randomXOffset}px`;
  item.style.top = `${event.clientY + randomYOffset}px`;
  item.style.transform = `rotate(${randomRotation}deg)`;

  const phrases = ["Oh, hi!", "Look over here!", "SQUIRREL!", "A random thought...", "Whoops!", "Did you see that?", "Hello there!", "What now?"];
  item.innerHTML = `<span>${phrases[Math.floor(Math.random() * phrases.length)]}</span>`;

  body.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 5000);
}

document.addEventListener('click', addRandomRotation);

// --- Theme Toggle Logic ---
const themeToggleButton = document.getElementById('theme-toggle-button');
const htmlElement = document.documentElement;
const icon = themeToggleButton.querySelector('i');

function setTheme(theme) {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  setTheme(currentTheme);
} else {
  setTheme('dark');
}

themeToggleButton.addEventListener('click', () => {
  const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// --- Intro Pop-up Logic (on hover) ---
const introCard = document.querySelector('.intro-card');
const introPopup = document.querySelector('.full-intro-popup');
const closeBtn = document.querySelector('.close-button');

// Add a class to the body to manage the pop-up state
function showIntroPopup() {
  document.body.classList.add('intro-popup-active');
  introPopup.classList.add('visible');
}

function hideIntroPopup() {
  document.body.classList.remove('intro-popup-active');
  introPopup.classList.remove('visible');
}

introCard.addEventListener('click', showIntroPopup);
closeBtn.addEventListener('click', hideIntroPopup);

// --- Random Rotations for Cards ---
function applyRandomCardTransforms() {
  document.querySelectorAll('.timeline-item, .project-card, .blog-card, .art-section, .lit-section, .music-section, .links-section, .intro-card, .satire-section').forEach(item => {
    const isTimeline = item.classList.contains('timeline-item');
    const isProjectOrBlog = item.classList.contains('project-card') || item.classList.contains('blog-card');

    const rotation = Math.floor(Math.random() * (isProjectOrBlog ? 6 : 4)) - (isProjectOrBlog ? 3 : 2);
    const offsetX = Math.floor(Math.random() * (isProjectOrBlog ? 15 : 10)) - (isProjectOrBlog ? 7 : 5);
    const offsetY = Math.floor(Math.random() * (isProjectOrBlog ? 15 : 10)) - (isProjectOrBlog ? 7 : 5);

    const originalTransform = `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`;
    item.style.transform = originalTransform;
    item.style.setProperty('--original-transform', originalTransform);
  });
}

// Apply transforms on load
document.addEventListener('DOMContentLoaded', applyRandomCardTransforms);

// --- Intersection Observer for Fade-in Animation ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.chaos-item').forEach(item => {
  observer.observe(item);
});

