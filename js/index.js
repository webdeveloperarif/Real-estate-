/**
 * Main initialization script for the demo site.
 *
 * This file controls dropdown icons, Swiper sliders, counter animations, fade-in effects, and newsletter form popups.
 *
 * To customize, look for the sections marked with 'CUSTOMIZATION' below.
 *
 * Dependencies:
 * - Swiper.js (https://swiperjs.com/)
 * - Bootstrap 5 (for dropdowns)
 * - countUp.js (for animated counters)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Select all dropdown buttons
  document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
    const dropdownIcon = dropdownToggle.querySelector(".dropdown-icon-size");

    dropdownToggle.addEventListener("shown.bs.dropdown", function () {
      dropdownIcon.classList.remove("fa-plus");
      dropdownIcon.classList.add("fa-minus");
    });

    dropdownToggle.addEventListener("hidden.bs.dropdown", function () {
      dropdownIcon.classList.remove("fa-minus");
      dropdownIcon.classList.add("fa-plus");
    });
  });

  /**
   * Swiper - Property Listing Carousel
   * CUSTOMIZATION: Change selector, autoplay speed, slides per view, and space between as needed.
   */
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    speed: 2000, // CUSTOMIZATION: Change slide transition speed (ms)
    autoplay: {
      delay: 3000, // CUSTOMIZATION: Change delay between slides (ms)
      disableOnInteraction: false,
    },
    breakpoints: {
      360: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 35,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    },
  });

  /**
   * Swiper - Testimonial Carousel
   * CUSTOMIZATION: Adjust selector, autoplay delay, slides per view, and breakpoints.
   */
  const swiperTestimonial = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 4000, // CUSTOMIZATION: Testimonial slide delay
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      360: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 35,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
  /**
   * Swiper - Property Detail Carousel
   * CUSTOMIZATION: Adjust selector, autoplay delay, and breakpoints for property detail images.
   */
  const swiperPropertyDetail = new Swiper(".swiper-property-detail", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      360: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  /**
   * Fade-In Animation for Elements
   * Elements with .fade-in-* classes will animate when they enter the viewport.
   * CUSTOMIZATION: Add/remove classes as needed.
   */
  const fadeInElements = document.querySelectorAll(
    ".fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // CUSTOMIZATION: Adjust how much of the element must be visible to trigger animation
    }
  );

  fadeInElements.forEach((el) => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });

  /**
   * Counter Animations Configuration
   * CUSTOMIZATION: Add or edit counters here. Each counter should have an 'id' (element ID), 'endVal' (final value), and 'suffix' (string after the number).
   */
  const counters = [
    { id: "activeAgent", endVal: 400, suffix: "+" },
    { id: "clientSatisfaction", endVal: 99, suffix: "%" },
    { id: "propertyListings", endVal: 250, suffix: "+" },
  ];

  /**
   * Start all counters using countUp.js
   * Called when the counters section enters the viewport.
   */
  const startCounters = () => {
    counters.forEach((counter) => {
      const counterAnim = new countUp.CountUp(counter.id, counter.endVal, {
        suffix: counter.suffix,
        duration: 2, // CUSTOMIZATION: Change animation duration (seconds)
      });
      if (!counterAnim.error) {
        counterAnim.start();
      } else {
        console.error(counterAnim.error);
      }
    });
  };

  /**
   * Observe the counters section and start animation when visible
   * CUSTOMIZATION: Change threshold or section ID if needed.
   */
  const section = document.getElementById("counters");
  if (section) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          startCounters();
          obs.unobserve(section);
        }
      },
      { threshold: 0.5 }
    ); // CUSTOMIZATION: Adjust how much of the section must be visible

    observer.observe(section);
  } else {
    console.error('Element with ID "counters" not found');
  }
});

/**
 * Bootstrap Dropdown Hover Effect
 * Shows dropdown menus on mouseover and hides on mouseleave.
 * CUSTOMIZATION: Adjust selectors or behavior as needed.
 */
document.querySelectorAll(".nav-item.dropdown").forEach(function (dropdown) {
  dropdown.addEventListener("mouseover", function () {
    const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    if (toggle) {
      const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
      instance.show();
    }
  });

  dropdown.addEventListener("mouseleave", function () {
    const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    if (toggle) {
      const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
      instance.hide();
    }
  });
});

/**
 * Newsletter Form Submission Handler
 * Shows a popup message when the newsletter form is submitted.
 * CUSTOMIZATION: Change form ID, popup message ID, or display duration as needed.
 */
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const popupMessage = document.getElementById("popupMessage");
      popupMessage.style.display = "block";
      setTimeout(() => {
        popupMessage.style.display = "none";
      }, 3000); // CUSTOMIZATION: Change how long the popup is shown (ms)
    });
}

/**
 * Other Form Submission Handler
 * Shows a popup message for another form.
 * CUSTOMIZATION: Change form ID, popup message ID, or display duration as needed.
 */
const otherForm = document.getElementById("otherForm");
if (otherForm) {
  document
    .getElementById("otherForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const popupMessage = document.getElementById("otherPopupMessage");
      popupMessage.style.display = "block";
      setTimeout(() => {
        popupMessage.style.display = "none";
      }, 3000); // CUSTOMIZATION: Change how long the popup is shown (ms)
    });
}

document.querySelectorAll(".gallery-img").forEach((img) => {
  img.addEventListener("click", function () {
    const src = this.getAttribute("data-img-src");
    document.getElementById("modalImage").src = src;
  });
});
