document.addEventListener("DOMContentLoaded", function () {
  // --- **NEW:** Notification Function ---
  // A reusable function to show our pop-up notification
  function showNotification(message, isError = false) {
    const notification = document.getElementById("notification");
    if (!notification) return; // Do nothing if the element doesn't exist

    notification.textContent = message;
    notification.className = "notification"; // Reset classes
    if (isError) {
      notification.classList.add("error");
    }

    // Show the notification
    notification.classList.add("show");

    // Hide it after 4 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 4000);
  }

  // --- 1. GENERAL UI SETUP (Navbar, Mobile Menu, Back to Top) ---

  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const navMenu = document.getElementById("navMenu");
  const backToTopBtn = document.getElementById("backToTopBtn");

  // **FIX 1: Consolidated Scroll Listener**
  // Instead of two separate listeners, we handle both effects in one.
  window.addEventListener("scroll", function () {
    // Sticky Navbar
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
    // Back to Top Button
    if (backToTopBtn) {
      if (window.scrollY > 200) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    }
  });

  // Mobile Navigation Menu
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.add("open");
    });
  }
  if (closeMenuBtn && navMenu) {
    closeMenuBtn.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
    // Also handle dropdowns inside the mobile menu
    const dropdownButtons = navMenu.querySelectorAll(".dropdown > button");
    dropdownButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Prevent the click from closing the menu if it propagates
        e.stopPropagation();
        const dropdownContainer = button.parentElement;
        dropdownContainer.classList.toggle("active");
      });
    });
  }

  // Back to Top Button Click Logic
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      // The flying animation is a great touch!
      backToTopBtn.classList.add("fly");
      window.scrollTo({ top: 0, behavior: "smooth" });
      backToTopBtn.addEventListener(
        "animationend",
        () => {
          backToTopBtn.classList.remove("fly");
        },
        { once: true }
      );
    });
  }

  // Floating animation for info-boxes (optional but nice)
  const infoBoxes = document.querySelectorAll(".info-box");
  if (infoBoxes.length > 0) {
    infoBoxes.forEach((box, i) => {
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
  }

  // --- 2. APPOINTMENT MODAL LOGIC ---

  const messageBtn = document.getElementById("messageBtn");
  const modal = document.getElementById("appointmentModal");

  // **FIX 2: Scoped the modal logic inside an 'if (modal)' block**
  // This prevents errors if the modal isn't present on a page.
  if (modal) {
    const modalCloseBtn = modal.querySelector(".close-btn");
    const appointmentForm = document.getElementById("appointmentForm");

    if (messageBtn) {
      messageBtn.addEventListener("click", () => {
        modal.style.display = "block";
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    });

    // **FIX 3: Scoped the form logic**
    // This prevents an error if the form itself doesn't exist for some reason.
    if (appointmentForm) {
      appointmentForm.addEventListener("submit", function (event) {
        // This part of your code is already excellent and doesn't need changes.
        event.preventDefault();

        const submitButton = appointmentForm.querySelector(".submit-btn");
        const formMessage = document.getElementById("appointment-form-message");
        const appointmentTimeInput = document.getElementById("appointmentTime");

        formMessage.innerHTML = "";
        formMessage.className = "";

        // Client-side validation
        if (new Date(appointmentTimeInput.value) < new Date()) {
          formMessage.innerHTML =
            "<strong>Error:</strong> Appointment time cannot be in the past.";
          formMessage.style.color = "red";
          return;
        }
        if (!appointmentForm.checkValidity()) {
          appointmentForm.reportValidity();
          return;
        }

        const originalButtonText = submitButton.textContent;
        submitButton.textContent = "Submitting...";
        submitButton.disabled = true;
        const formData = new FormData(appointmentForm);

        fetch("appointment-handler.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            formMessage.innerHTML = data;
            if (data.includes("Successfully")) {
              formMessage.style.color = "green";
              appointmentForm.reset();
            } else {
              formMessage.style.color = "red";
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            formMessage.innerHTML =
              "<strong>Error:</strong> A network issue occurred. Please try again.";
            formMessage.style.color = "red";
          })
          .finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          });
      });
    }
  }

  // **FIX 4: Removed code for the main application form.**
  // Since you confirmed you want the main form to use the "page reload" method,
  // we must NOT have any JavaScript trying to control its submission with `event.preventDefault()`.
  // If you decide to go back to the AJAX method for the main form, that code would go here.
});
