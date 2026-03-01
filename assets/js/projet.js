// assets/js/projet.js
document.addEventListener("DOMContentLoaded", () => {

  // Particles
  if (window.createParticles) window.createParticles("particles", 40);

  // Typing
  const typingText = document.getElementById("typing-text");
  const cursor = document.querySelector(".cursor");
  const text = "Mes Projets";

  if (typingText) {
    typingText.textContent = "";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i += 1;
        setTimeout(typeWriter, 70);
      } else if (cursor) {
        cursor.style.display = "inline-block";
      }
    };
    setTimeout(typeWriter, 300);
  }

  // Reveal
  const cards = document.querySelectorAll(".reveal");
  if (cards.length > 0) {
    cards.forEach((el, idx) => el.style.transitionDelay = `${idx * 0.07}s`);

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    cards.forEach(el => observer.observe(el));
  }

  // Page progress bar
  const bar = document.getElementById("page-progress");
  const updateProgress = () => {
    if (!bar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const p = docHeight > 0 ? (scrollTop / docHeight) : 0;
    bar.style.width = `${Math.max(0, Math.min(1, p)) * 100}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Filters (only web/data/java/all)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-col");

  const applyFilter = (filter) => {
    projects.forEach(p => {
      const tags = (p.getAttribute("data-tags") || "").split(" ");
      const show = (filter === "all") || tags.includes(filter);
      p.classList.toggle("hidden", !show);
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  applyFilter("all");
});