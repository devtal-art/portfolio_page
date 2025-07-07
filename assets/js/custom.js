// Scroll to top on load (once)
window.scrollTo({ top: 0, behavior: "smooth" });

// Lock scroll initially
document.body.style.overflow = "hidden";

// Unlock scroll and trigger animations after intro
window.addEventListener("load", () => {
  // Unlock scroll after GSAP heading animation
  setTimeout(() => {
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);

    const heading = document.querySelector(".main-heading");
    heading.classList.add("static");

    // Show contact button
    const button = document.querySelector(".contact-button");
    if (button) button.classList.add("show");
  }, 3500); // Adjust based on animation duration
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

// Init slider
duplicateTrackContent();
autoScroll();

// Pause slider on hover
container.addEventListener("mouseenter", () => paused = true);
container.addEventListener("mouseleave", () => paused = false);

// Image popup logic
function openImagePopup(src, title, caption) {
  const popup = document.getElementById("imagePopup");
  document.getElementById("popupImage").src = src;
  document.getElementById("popupTitle").textContent = title;
  document.getElementById("popupCaption").textContent = caption;
  popup.classList.add("active");
}

document.querySelectorAll('#galleryTrack img').forEach((img, index) => {
  img.addEventListener('click', () => {
    const src = img.src;
    const title = img.dataset.title || `Image ${index + 1}`;
    const caption = img.dataset.caption || "No description available.";
    openImagePopup(src, title, caption);
  });
});


// Contact popup logic
function openPopup() {
  document.getElementById("popupForm").classList.add("show");
}
function closePopup() {
  document.getElementById("popupForm").classList.remove("show");
}


function closeImagePopup() {
  document.getElementById("imagePopup").classList.remove("active");
}