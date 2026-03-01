// assets/js/contact.js
document.addEventListener("DOMContentLoaded", () => {

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length > 0) {
    revealEls.forEach((el, idx) => (el.style.transitionDelay = `${idx * 0.08}s`));

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
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

  // Form validation + loading UI
  const form = document.getElementById("contact-form");
  const alertBox = document.getElementById("form-alert");
  const btn = document.getElementById("submit-btn");

  const fields = ["name", "email", "message"];

  const setAlert = (msg, type = "ok") => {
    if (!alertBox) return;
    alertBox.style.display = "block";
    alertBox.classList.toggle("error", type === "error");
    alertBox.textContent = msg;
  };

  const clearErrors = () => {
    document.querySelectorAll(".field-error").forEach(el => (el.textContent = ""));
    if (alertBox) {
      alertBox.style.display = "none";
      alertBox.classList.remove("error");
      alertBox.textContent = "";
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  if (form) {
    form.addEventListener("submit", (e) => {
      clearErrors();

      let ok = true;

      const name = (document.getElementById("name")?.value || "").trim();
      const email = (document.getElementById("email")?.value || "").trim();
      const message = (document.getElementById("message")?.value || "").trim();

      if (name.length < 2) {
        ok = false;
        document.querySelector('[data-error-for="name"]').textContent = "Nom trop court.";
      }
      if (!isValidEmail(email)) {
        ok = false;
        document.querySelector('[data-error-for="email"]').textContent = "Email invalide.";
      }
      if (message.length < 10) {
        ok = false;
        document.querySelector('[data-error-for="message"]').textContent = "Message trop court (min 10 caractères).";
      }

      if (!ok) {
        e.preventDefault();
        setAlert("Veuillez corriger les champs en rouge.", "error");
        return;
      }

      // UX loading (Formspree submit continues normally)
      if (btn) {
        btn.classList.add("loading");
        btn.disabled = true;
      }
      setAlert("Envoi en cours…", "ok");
    });

    // Clear error when typing
    fields.forEach((id) => {
      const input = document.getElementById(id);
      const errorEl = document.querySelector(`[data-error-for="${id}"]`);
      if (!input || !errorEl) return;

      input.addEventListener("input", () => {
        errorEl.textContent = "";
      });
    });
  }
});