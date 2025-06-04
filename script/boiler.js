// Sticky Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
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
  
  // Mobile menu toggle (expand this later as needed)
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show-mobile");
  });
  

  // Modal and button selectors
const messageBtn = document.getElementById('messageBtn');
const modal = document.getElementById('appointmentModal');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('appointmentForm');

// Open modal on message button click
messageBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close modal on X click
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

// Form submit handler
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Gather form data
  const data = {
    fullName: form.fullName.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    appointmentType: form.appointmentType.value,
    appointmentTime: form.appointmentTime.value,
  };
  // Display confirmation message
  alert(`Thank you ${data.fullName}! Your appointment for ${data.appointmentType} at ${data.appointmentTime} has been scheduled. We will contact you at ${data.email} or ${data.phone}.`);
  // Close modal
  modal.style.display = 'none';
  // Reset form
  form.reset();
}
);

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
    backToTopBtn.addEventListener("animationend", () => {
      backToTopBtn.classList.remove("fly");
    }, { once: true });
  });
});
