/* ==========================================================================
   CR PLUMBERS & ELECTRICIANS - MAIN JAVASCRIPT
   Location: Pretoria North (0182)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. Mobile Menu Toggle & Accessibility
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById("menuToggle") || document.querySelector(".menu-toggle");
  const navMenu = document.getElementById("navMenu") || document.querySelector("nav");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("open");
      const isExpanded = navMenu.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        navMenu.classList.contains("open")
      ) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. Dynamic Active Link Highlighting
  // ------------------------------------------------------------------------
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    const linkPath = linkHref.split("/").pop();

    if (
      linkPath === currentPath ||
      (currentPath === "" && linkPath === "index.html") ||
      (currentPath === "index.html" && linkHref.endsWith("index.html"))
    ) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });

  // ------------------------------------------------------------------------
  // 3. Contact Form Submission Handling
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm") || document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const nameInput = contactForm.querySelector('input[name="name"]');
      const phoneInput = contactForm.querySelector('input[name="phone"]');

      if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        e.preventDefault();
        alert("Please complete all required fields (Full Name and Phone Number).");
      }
    });
  }
});