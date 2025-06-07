// Sticky Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const navMenu = document.getElementById("navMenu");

  // Open mobile navigation menu
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.add("open");
  });

  // Close mobile navigation menu
  closeMenuBtn.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });

  // Toggle dropdown sections inside mobile menu
  const dropdownButtons = navMenu.querySelectorAll(".dropdown > button");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dropdownContainer = button.parentElement;
      dropdownContainer.classList.toggle("active");
    });
  });
});

// Floating animation (optional)
document.querySelectorAll(".info-box").forEach((box, i) => {
  box.animate(
    [
      { transform: "translateY(0px)" },
      { transform: "translateY(-5px)" },
      { transform: "translateY(0px)" },
    ],
    {
      duration: 3000 + i * 300,
      iterations: Infinity,
    }
  );
});

// Modal and button selectors
const messageBtn = document.getElementById("messageBtn");
const modal = document.getElementById("appointmentModal");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("appointmentForm");

// Open modal on message button click
messageBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal on X click
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside modal content
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// Form submit handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("appointment-handler.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        alert(result);
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      });
  });
});

// Smooth scroll to top
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    // Add flying animation class
    backToTopBtn.classList.add("fly");

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Remove animation and reset button after animation ends
    backToTopBtn.addEventListener(
      "animationend",
      () => {
        backToTopBtn.classList.remove("fly");
      },
      { once: true }
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("applicationForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("contact-form.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        alert(result);
        form.reset();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Something went wrong. Please try again later.");
      });
  });
});
