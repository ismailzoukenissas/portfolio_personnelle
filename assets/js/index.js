// assets/js/index.js
document.addEventListener("DOMContentLoaded", () => {

  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length === 0) return;

  fadeElements.forEach((el, index) => {
    // 👉 délai automatique (0.15s entre chaque élément)
    el.style.transitionDelay = `${index * 0.15}s`;
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  fadeElements.forEach(el => observer.observe(el));
});
// scroll smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      ?.scrollIntoView({behavior:"smooth"});
  });
});