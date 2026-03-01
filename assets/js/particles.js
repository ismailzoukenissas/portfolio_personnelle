// assets/js/particles.js
// Simple particles helper (non-module, beginner-friendly)
window.createParticles = function createParticles(containerId, count = 30) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 4 + 2; // 2px -> 6px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100 + 100}%`;

    const duration = Math.random() * 20 + 10; // 10s -> 30s
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(particle);
  }
};