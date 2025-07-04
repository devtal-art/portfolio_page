// Scroll to top on load
window.scrollTo({ top: 0, behavior: "smooth" });

// Lock scroll during intro animation
document.body.style.overflow = "hidden";
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
  }, 3500); // Match intro animation duration
});

// Gallery slider (auto-scroll)
const track = document.getElementById("galleryTrack");
const container = document.getElementById("galleryContainer");

let scrollSpeed = 1;
let scrollPosition = 0;
let paused = false;

function duplicateTrackContent() {
  const original = [...track.children];
  original.forEach((child) => {
    const clone = child.cloneNode(true);
    track.appendChild(clone);
  });
}

function autoScroll() {
  if (!paused) {
    scrollPosition += scrollSpeed;
    track.style.transform = `translateX(-${scrollPosition}px)`;
    if (scrollPosition >= track.scrollWidth / 2) scrollPosition = 0;
  }
  requestAnimationFrame(autoScroll);
}

container.addEventListener("mouseenter", () => paused = true);
container.addEventListener("mouseleave", () => paused = false);

duplicateTrackContent();
autoScroll();

// Popup logic
function openPopup() {
  document.getElementById("popupForm").classList.add("show");
}
function closePopup() {
  document.getElementById("popupForm").classList.remove("show");
}

// Show contact button after intro animation
window.addEventListener("load", () => {
  setTimeout(() => {
    const button = document.querySelector(".contact-button");
    if (button) button.classList.add("show");
  }, 3600);
});


// After GSAP animation ends, unlock scroll
window.addEventListener("load", () => {
  setTimeout(() => {
    const heading = document.querySelector(".main-heading");
    heading.classList.add("static");

    // Unlock scroll after animation
    document.body.style.overflowY = "scroll";
    window.scrollTo(0, 0); // force scroll to top again just in case
  }, 3500); // Match your GSAP timing
});