document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Staggered Animation for Sidebar Menus (.side-link)
  const sideLinks = document.querySelectorAll(".side-link");
  if (sideLinks.length > 0) {
    sideLinks.forEach((link, index) => {
      // Set initial styles for animation
      link.style.opacity = "0";
      link.style.transform = "translateX(-15px)";
      link.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      
      // Store the original background color based on active state
      const isOutBox = link.classList.contains("active");
      
      // Animate in with delay
      setTimeout(() => {
        link.style.opacity = "1";
        link.style.transform = "translateX(0)";
      }, 60 * index + 100);

      // Smooth hover effects
      link.addEventListener("mouseenter", () => {
        if (!link.classList.contains("active")) {
          link.style.transform = "translateX(8px)";
        }
      });
      link.addEventListener("mouseleave", () => {
        if (!link.classList.contains("active")) {
          link.style.transform = "translateX(0)";
        }
      });
    });
  }

  // 2. Smooth Animation for Top Navigation Menus (.nav a)
  const navLinks = document.querySelectorAll(".nav a");
  if (navLinks.length > 0) {
    navLinks.forEach((link, index) => {
      // Set initial state
      link.style.opacity = "0";
      link.style.transform = "translateY(-10px)";
      link.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      link.style.display = "inline-block"; // needed for transform on inline elements
      
      // Animate in with delay
      setTimeout(() => {
        link.style.opacity = "1";
        link.style.transform = "translateY(0)";
      }, 60 * index + 100);

      // Hover effect for text links (non-buttons)
      if (!link.classList.contains('btn')) {
        link.addEventListener("mouseenter", () => {
          link.style.transform = "translateY(-2px)";
          link.style.color = "#e28667"; // Accent color from project
        });
        link.addEventListener("mouseleave", () => {
          link.style.transform = "translateY(0)";
          link.style.color = ""; // Revert to stylesheet default
        });
      } else {
        // Hover effect for nav buttons (like Login)
        link.addEventListener("mouseenter", () => {
          link.style.transform = "translateY(-2px)";
          link.style.boxShadow = "0 4px 12px rgba(226, 134, 103, 0.3)";
        });
        link.addEventListener("mouseleave", () => {
          link.style.transform = "translateY(0)";
          link.style.boxShadow = "none";
        });
      }
    });
  }
});
