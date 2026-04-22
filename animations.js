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
      setTimeout(
        () => {
          link.style.opacity = "1";
          link.style.transform = "translateX(0)";
        },
        60 * index + 100,
      );

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
      setTimeout(
        () => {
          link.style.opacity = "1";
          link.style.transform = "translateY(0)";
        },
        60 * index + 100,
      );

      // Hover effect for text links (non-buttons)
      if (!link.classList.contains("btn")) {
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

const recipes = [
  {
    name: "Golden Lentil Soup",
    img: "images/Golden Lentil Soup.avif",
  },
  {
    name: "Roasted Salmon",
    img: "images/Salmon.avif",
  },
  {
    name: "Spicy Tofu Stir Fry",
    img: "images/Spicy Tofu Stir Fry.avif",
  },
];

let selectedSlot = null;

/* ===== MODAL ===== */
const modal = document.createElement("div");
modal.className = "recipe-modal";
modal.innerHTML = `
<div class="recipe-modal-box">
<h2>Pilih Menu</h2>
<div id="recipeList"></div>
</div>
`;
document.body.appendChild(modal);

const recipeList = document.getElementById("recipeList");

/* isi daftar resep */
recipes.forEach((item) => {
  const div = document.createElement("div");
  div.className = "recipe-option";
  div.innerHTML = `
<img src="${item.img}">
<div>
<h4>${item.name}</h4>
</div>
`;

  div.onclick = () => {
    selectedSlot.innerHTML = `
<div class="recipe-fill">
<button class="delete-meal">×</button>
<img src="${item.img}">
<div class="recipe-name">${item.name}</div>
</div>
`;

    selectedSlot.classList.remove("add-slot");
    modal.classList.remove("active");

    addDeleteFeature(selectedSlot);
  };

  recipeList.appendChild(div);
});

/* klik kotak tambah */
document.querySelectorAll(".meal-slot").forEach((slot) => {
  slot.addEventListener("click", () => {
    if (slot.querySelector(".recipe-fill")) return;
    selectedSlot = slot;
    modal.classList.add("active");
  });
});

/* tutup modal */
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

/* grocery checklist */
document.querySelectorAll(".grocery-list li").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("done");
  });
});

/* ===== tombol hapus ===== */
function addDeleteFeature(slot) {
  const btn = slot.querySelector(".delete-meal");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    slot.innerHTML = "";
    slot.classList.add("add-slot");
  });
}

/* BUAT / UPDATE dashboard.js */

/* VISITOR */
new Chart(document.getElementById("visitorChart"), {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Visitors",
        data: [1200, 1450, 1380, 1710, 1880, 2100, 2760],
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
    responsive: true,
  },
});

/* SUBSCRIPTION */
new Chart(document.getElementById("subChart"), {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Subscribers",
        data: [620, 710, 830, 950, 1100, 1248],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
    responsive: true,
  },
});

/* DEVICE */
new Chart(document.getElementById("deviceChart"), {
  type: "doughnut",
  data: {
    labels: ["Mobile", "Desktop", "Tablet"],
    datasets: [
      {
        data: [68, 26, 6],
        borderWidth: 0,
      },
    ],
  },
  options: {
    plugins: {
      legend: { position: "bottom" },
    },
  },
});

/* CATEGORY */
new Chart(document.getElementById("categoryChart"), {
  type: "pie",
  data: {
    labels: ["Dinner", "Lunch", "Breakfast", "Snack"],
    datasets: [
      {
        data: [42, 28, 22, 8],
        borderWidth: 0,
      },
    ],
  },
  options: {
    plugins: {
      legend: { position: "bottom" },
    },
  },
});
