// assets/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect (common)
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  // Footer current year (only if element exists)
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});