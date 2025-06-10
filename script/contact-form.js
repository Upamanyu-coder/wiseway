document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Navbar and General UI ---

  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const navMenu = document.getElementById("navMenu");
  const backToTopBtn = document.getElementById("backToTopBtn");

  // Sticky Navbar Scroll Effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to Top Button visibility
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  // Mobile Navigation Menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.add("open");
    });
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  }

  // Back to Top Button functionality
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 2. Appointment Modal ---

  const messageBtn = document.getElementById("messageBtn");
  const modal = document.getElementById("appointmentModal");
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

  // Appointment Form Submission (AJAX)
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitButton = appointmentForm.querySelector(".submit-btn");
      const formMessage = document.getElementById("appointment-form-message");
      const appointmentTimeInput = document.getElementById("appointmentTime");

      formMessage.textContent = "";

      // Client-side validation
      if (new Date(appointmentTimeInput.value) < new Date()) {
        formMessage.textContent =
          "Error: Appointment time cannot be in the past.";
        formMessage.style.color = "red";
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
          formMessage.innerHTML = "A network error occurred. Please try again.";
          formMessage.style.color = "red";
        })
        .finally(() => {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        });
    });
  }

  // --- 3. Student Application Form ---

  const applicationForm = document.getElementById("applicationForm");

  if (applicationForm) {
    // **FIX:** Corrected selectors for radio buttons
    const englishTestYes = document.getElementById("yes");
    const englishTestNo = document.getElementById("no");
    const institutionsSection = document.getElementById("institutionsSection");

    // Function to show/hide the institutions field based on radio button selection
    function toggleInstitutionsSection() {
      if (englishTestYes.checked) {
        institutionsSection.style.display = "block";
      } else {
        institutionsSection.style.display = "none";
      }
    }

    // Add event listeners to radio buttons
    englishTestYes.addEventListener("change", toggleInstitutionsSection);
    englishTestNo.addEventListener("change", toggleInstitutionsSection);

    // Initial check on page load
    toggleInstitutionsSection();

    // Application Form Submission (AJAX)
    applicationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitButton = applicationForm.querySelector(".submit-btn");
      const formMessage = document.getElementById("form-message");

      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Submitting...";
      submitButton.disabled = true;
      formMessage.innerHTML = "";

      const formData = new FormData(applicationForm);

      fetch("contact-form.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          formMessage.innerHTML = data;
          if (data.includes("Successfully")) {
            formMessage.style.color = "green";
            applicationForm.reset();
            toggleInstitutionsSection(); // Reset conditional field
          } else {
            formMessage.style.color = "red";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          formMessage.innerHTML =
            "An unexpected network error occurred. Please try again.";
          formMessage.style.color = "red";
        })
        .finally(() => {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        });
    });
  }
});
