/* ============================================
   IKS Presentation Deck — Slide Engine
   ============================================
   Architecture:
   1. Uses IntersectionObserver to detect which slide is currently fully snapped into view.
   2. Adds 'is-active' class to the current slide to trigger CSS transitions (.anim-up, image pans).
   3. Updates the Navigation slide indicator at the top right.
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const slideIndicator = document.getElementById("current-slide");
  const nav = document.querySelector("nav");

  // Show Nav after a brief delay
  setTimeout(() => {
    nav.classList.remove("opacity-0");
  }, 800);

  // Setup Observer options
  // threshold: 0.5 means the slide must be 50% visible to be considered active
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Find the index of the current slide
      const index = Array.from(slides).indexOf(entry.target) + 1;

      if (entry.isIntersecting) {
        // Add active class for animations
        entry.target.classList.add("is-active");
        
        // Update the slide counter (e.g., 01, 02... 10)
        slideIndicator.textContent = index < 10 ? `0${index}` : index;
      } else {
        // Remove active class when slide leaves viewport so animations re-trigger next time
        entry.target.classList.remove("is-active");
      }
    });
  }, observerOptions);

  // Observe all slides
  slides.forEach((slide) => {
    slideObserver.observe(slide);
  });
});
