JAVA SCRIPT


/* ==================================
   RJL Group Website JavaScript
   Bright Glassmorphism Theme — FINAL FIXED
   =================================== */

const BACKEND_URL = window.location.origin;
const API_BASE = `${BACKEND_URL}/api`;

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     MOBILE NAVIGATION TOGGLE
  ------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });
  }

  /* -------------------------------
     HEADER LINE & ACTIVE LINK
  ------------------------------- */
  const navLinks = document.querySelectorAll(".nav-link");
  let headerLine = document.querySelector(".header-line");

  // Buat header-line jika belum ada
  if (!headerLine && navMenu) {
    headerLine = document.createElement("div");
    headerLine.className = "header-line";
    headerLine.style.position = "absolute";
    headerLine.style.bottom = "6px";
    headerLine.style.height = "2px";
    headerLine.style.background = "var(--color-warm-brown)";
    headerLine.style.transition = "all 0.25s ease";
    headerLine.style.willChange = "transform, width";
    navMenu.style.position = "relative";
    navMenu.appendChild(headerLine);
  }

  function moveHeaderLine(link) {
    if (!headerLine || !link) return;
    const rect = link.getBoundingClientRect();
    const menuRect = link.parentElement.getBoundingClientRect();
    headerLine.style.width = `${rect.width}px`;
    headerLine.style.transform = `translateX(${rect.left - menuRect.left}px)`;
  }

  // Smooth scroll (untuk halaman 1-page)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      navLinks.forEach(l => l.classList.remove("active"));
      anchor.classList.add("active");
      moveHeaderLine(anchor);
    });
  });

  // Highlight active section saat scroll
  const sections = document.querySelectorAll("section[id]");
  if (sections.length > 0) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY + 120;
      sections.forEach(sec => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (scrollY >= top && scrollY < bottom && link) {
          navLinks.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
          moveHeaderLine(link);
        }
      });
    });
    } else {
    // Multi-page: aktifkan link berdasarkan nama file halaman
    window.addEventListener("DOMContentLoaded", () => {
      const currentFile = window.location.pathname.split("/").pop() || "index.html";
      let currentLink = [...navLinks].find(l => {
        const href = l.getAttribute("href") || "";
        return href.endsWith(currentFile) || l.href.includes(currentFile);
      });
      if (currentLink) {
        navLinks.forEach(l => l.classList.remove("active"));
        currentLink.classList.add("active");

        // Pindahkan garis setelah halaman benar-benar siap
        setTimeout(() => moveHeaderLine(currentLink), 150);
      }
    });
  }

  window.addEventListener("resize", () => {
    const activeNow = document.querySelector(".nav-link.active");
    if (activeNow) moveHeaderLine(activeNow);
  });

  /* -------------------------------
     SCROLL ANIMATIONS (fade / slide)
  ------------------------------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -80px 0px" });

  document.querySelectorAll(".slide-up").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    observer.observe(el);
  });

/* -------------------------------
   CONTACT FORM
------------------------------- */
const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactFormMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(contactForm));
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
      // 💡 Simulasi delay 1 detik biar terasa realistis
      await new Promise(resolve => setTimeout(resolve, 1000));

      // ✅ Anggap pesan terkirim sukses
      console.log("Contact form data:", formData);
      contactMsg.textContent = "✅ Thank you! We’ll get back soon.";
      contactMsg.className = "form-message success";
      contactForm.reset();
    } catch {
      contactMsg.textContent = "❌ Error sending message.";
      contactMsg.className = "form-message error";
    } finally {
      btn.textContent = original;
      btn.disabled = false;
      contactMsg.style.display = "block";
      setTimeout(() => (contactMsg.style.display = "none"), 4000);
    }
  });
}

/* -------------------------------
   REGISTRATION FORM
------------------------------- */
const regForm = document.getElementById("registrationForm");
const regMsg = document.getElementById("registrationFormMessage");

if (regForm) {
  regForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(regForm));
    const btn = regForm.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = "Submitting...";
    btn.disabled = true;

    try {
      // 💡 Simulasi delay 1 detik
      await new Promise(resolve => setTimeout(resolve, 1000));

      // ✅ Anggap registrasi sukses
      console.log("Registration data:", formData);
      regMsg.textContent = "✅ Registration successful!";
      regMsg.className = "form-message success";
      regForm.reset();
    } catch {
      regMsg.textContent = "❌ Error submitting registration.";
      regMsg.className = "form-message error";
    } finally {
      btn.textContent = original;
      btn.disabled = false;
      regMsg.style.display = "block";
      setTimeout(() => (regMsg.style.display = "none"), 4000);
    }
  });
}


  /* -------------------------------
     GALLERY MODAL & BUTTON EFFECTS
  ------------------------------- */
  document.querySelectorAll(".gallery-image, .gallery-item").forEach(img => {
    img.addEventListener("click", () => {
      const bg = img.style.backgroundImage || "";
      const url = bg.slice(5, -2);
      if (!url) return;

      const modal = document.createElement("div");
      modal.style.cssText = `
        position:fixed;inset:0;display:flex;
        align-items:center;justify-content:center;
        background:rgba(0,0,0,.9);z-index:10000;
        cursor:pointer;animation:fadeIn .3s ease;
      `;

      const image = document.createElement("img");
      image.src = url;
      image.style.cssText = `
        max-width:90%;max-height:90%;
        border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.5);
      `;
      modal.appendChild(image);
      document.body.appendChild(modal);

      modal.addEventListener("click", () => {
        modal.style.animation = "fadeOut .3s ease";
        setTimeout(() => modal.remove(), 300);
      });
    });
  });

  document.querySelectorAll(".btn-glass, .btn-small").forEach(btn => {
    btn.addEventListener("mouseenter", () => (btn.style.transform = "translateY(-2px)"));
    btn.addEventListener("mouseleave", () => (btn.style.transform = "translateY(0)"));
  });

  /* -------------------------------
     NAVBAR SHADOW ON SCROLL
  ------------------------------- */
  const navbar = document.querySelector(".navbar-glass");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.style.boxShadow =
        window.scrollY > 50
          ? "0 4px 30px rgba(0,0,0,.1)"
          : "0 4px 20px rgba(0,0,0,.05)";
    });
  }

  /* -------------------------------
     FORM VALIDATION + LAZY LOAD + DATE INPUT
  ------------------------------- */
  document.querySelectorAll(".form-input, .form-textarea, .form-select").forEach(input => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required")) {
        this.style.borderColor = this.value.trim()
          ? "rgba(76,175,80,0.5)"
          : "rgba(244,67,54,0.5)";
      }
    });
    input.addEventListener("focus", function () {
      this.style.borderColor = "var(--color-soft-gold)";
    });
  });

  const lazyItems = document.querySelectorAll(".gallery-item, .menu-image, .product-image");
  const lazyObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = "0";
        el.style.transition = "opacity 0.6s ease";
        requestAnimationFrame(() => (el.style.opacity = "1"));
        lazyObs.unobserve(el);
      }
    });
  }, { rootMargin: "50px" });
  lazyItems.forEach(el => lazyObs.observe(el));

  const dateInput = document.getElementById("preferredDate");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split("T")[0];
  }

  /* -------------------------------
     PAGE LOAD ANIMATION
  ------------------------------- */
  document.body.style.opacity = "0";
  window.addEventListener("load", () => {
    document.body.style.transition = "opacity 0.6s ease";
    document.body.style.opacity = "1";
  });
});
