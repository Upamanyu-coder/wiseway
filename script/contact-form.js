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
  // Get references to the form and its elements
  const appointmentForm = document.getElementById("appointmentForm");
  const submitButton = appointmentForm.querySelector(".submit-btn");
  const formMessage = document.getElementById("appointment-form-message");
  const appointmentTimeInput = document.getElementById("appointmentTime");

  // Listen for the form's submit event
  appointmentForm.addEventListener("submit", function (event) {
    // 1. Prevent the default browser action (page reload)
    event.preventDefault();

    // 2. Clear any previous messages
    formMessage.innerHTML = "";
    formMessage.className = "";

    // 3. --- Client-Side Validation ---
    // Check if the appointment time is in the past
    const selectedDate = new Date(appointmentTimeInput.value);
    const now = new Date();

    if (selectedDate < now) {
      formMessage.textContent =
        "Error: Appointment time cannot be in the past.";
      formMessage.style.color = "red";
      return; // Stop the submission
    }

    // Check for other required fields using the browser's built-in validation
    if (!appointmentForm.checkValidity()) {
      // This will trigger the browser's native error messages for required fields
      appointmentForm.reportValidity();
      return;
    }

    // 4. Provide instant feedback to the user
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Submitting...";
    submitButton.disabled = true;

    // 5. Collect form data
    const formData = new FormData(appointmentForm);

    // 6. Send the data to the server using the Fetch API
    fetch("appointment-handler.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text()) // Get the plain text response from PHP
      .then((data) => {
        // 7. Display the server's response
        formMessage.innerHTML = data;

        // Check if the response text includes the word "Successfully"
        if (data.includes("Successfully")) {
          formMessage.style.color = "green";
          appointmentForm.reset(); // Clear the form on success
        } else {
          formMessage.style.color = "red";
        }
      })
      .catch((error) => {
        // 8. Handle network errors
        console.error("Error:", error);
        formMessage.innerHTML =
          "Sorry, a network error occurred. Please try again later.";
        formMessage.style.color = "red";
      })
      .finally(() => {
        // 9. Re-enable the button and restore its text after the request is complete
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
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
  // --- Get references to the form and its elements ---
  const applicationForm = document.getElementById("applicationForm");
  const submitButton = applicationForm.querySelector(".submit-btn");
  const formMessage = document.getElementById("form-message");

  // --- References for the conditional logic ---
  const englishTestYes = document.getElementById("englishTestYes");
  const englishTestNo = document.getElementById("englishTestNo");
  const institutionsSection = document.getElementById("institutionsSection");
  const institutionsInput = document.getElementById("institutions");

  // --- Function to toggle the visibility of the institutions field ---
  function toggleInstitutionsSection() {
    if (englishTestYes.checked) {
      institutionsSection.style.display = "block";
    } else {
      institutionsSection.style.display = "none";
      institutionsInput.value = ""; // Clear the input when hidden
    }
  }

  // --- Add event listeners to radio buttons ---
  englishTestYes.addEventListener("change", toggleInstitutionsSection);
  englishTestNo.addEventListener("change", toggleInstitutionsSection);

  // --- Run the function once on page load to set the initial state ---
  toggleInstitutionsSection();

  // --- Handle the form submission using AJAX (Fetch API) ---
  applicationForm.addEventListener("submit", function (event) {
    // 1. Prevent the default form submission (which causes a page reload)
    event.preventDefault();

    // 2. Provide instant feedback to the user
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Submitting...";
    submitButton.disabled = true;
    formMessage.innerHTML = ""; // Clear previous messages

    // 3. Collect all form data automatically
    const formData = new FormData(applicationForm);

    // 4. Send the data to the server using the Fetch API
    fetch("contact-form.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text()) // Get the response from the PHP file as text
      .then((data) => {
        // 5. Display the server's response
        formMessage.innerHTML = data;

        // Check if the submission was successful by looking for a keyword in the response
        if (data.includes("Successfully")) {
          formMessage.style.color = "green";
          applicationForm.reset(); // Clear the form fields
          toggleInstitutionsSection(); // Reset the conditional field visibility
        } else {
          formMessage.style.color = "red";
        }
      })
      .catch((error) => {
        // 6. Handle network errors
        console.error("Error:", error);
        formMessage.innerHTML =
          "An unexpected error occurred. Please try again later.";
        formMessage.style.color = "red";
      })
      .finally(() => {
        // 7. Re-enable the submit button regardless of success or failure
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
  });
});
