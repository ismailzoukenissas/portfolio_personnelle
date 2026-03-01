// assets/js/apropos.js
document.addEventListener("DOMContentLoaded", () => {
  // Particles (from your particles.js helper)
  if (window.createParticles) window.createParticles("particles", 35);

  // Reveal on scroll
  const items = document.querySelectorAll(".reveal");
  const progress = document.getElementById("timeline-progress");
  const timelineWrap = document.querySelector(".timeline-wrap");

  if (items.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    items.forEach(el => observer.observe(el));
  }

  // Timeline progress bar
  const updateProgress = () => {
    if (!progress || !timelineWrap) return;

    const rect = timelineWrap.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // portion visible
    const start = Math.max(0, windowHeight - rect.top);
    const total = rect.height + windowHeight * 0.2;
    const percent = Math.max(0, Math.min(1, start / total));

    progress.style.height = `${percent * 100}%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
});