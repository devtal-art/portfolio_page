// Smooth Scroll

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

// Ensure page always loads from top
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

document.body.style.overflow = "hidden";

// Enable scroll after heading animation ends
window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.style.overflow = "auto";
        window.scrollTo(0, 0);
    }, 3800); // matches total animation time
});

// Setup gallery scroll
const track = document.getElementById("galleryTrack");
const container = document.getElementById("galleryContainer");

let scrollSpeed = 1;
let scrollPosition = 0;
let paused = false;

// Duplicate content for seamless scroll
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
        if (scrollPosition >= track.scrollWidth / 2) {
            scrollPosition = 0;
        }
    }
    requestAnimationFrame(autoScroll);
}

// Pause slider on hover
container.addEventListener("mouseenter", () => paused = true);
container.addEventListener("mouseleave", () => paused = false);

// Init slider
duplicateTrackContent();
autoScroll();

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


// Smooth Scroll to Top Button

window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,       // lower is slower
        effects: true
    });
});

// Contact button show

window.addEventListener("load", () => {
    // Ensure scroll position is top
    window.scrollTo(0, 0);

    // Wait until intro animation finishes (~3.6s or whatever you're using)
    setTimeout(() => {
        const button = document.querySelector(".contact-button");
        button.classList.add("show");
    }, 3600);
});

// Fading Slider

let currentSlide = 0;

window.addEventListener("DOMContentLoaded", () => {
    const sliderImages = document.querySelectorAll(".slide-img");
    const sliderTexts = document.querySelectorAll(".slide-text");
    const slideCounters = document.querySelectorAll(".slide-count");

    setInterval(() => {
        // ✅ Defensive checks inside interval (optional, double protection)
        if (
            sliderImages[currentSlide] &&
            sliderTexts[currentSlide] &&
            slideCounters[currentSlide]
        ) {
            // Remove active classes
            sliderImages[currentSlide].classList.remove("active");
            sliderTexts[currentSlide].classList.remove("active");
            slideCounters[currentSlide].classList.remove("active");

            // Increment slide index
            currentSlide = (currentSlide + 1) % sliderImages.length;

            // Add active classes to next
            sliderImages[currentSlide].classList.add("active");
            sliderTexts[currentSlide].classList.add("active");
            slideCounters[currentSlide].classList.add("active");
        }
    }, 3000);
});


// Popup

// Enable single-select tag groups
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        const group = tag.dataset.group;
        document.querySelectorAll(`.tag[data-group="${group}"]`).forEach(el => el.classList.remove('selected'));
        tag.classList.add('selected');
    });
});

function openPopup() {
    document.getElementById("popupForm").classList.add("show");
}

function closePopup() {
    document.getElementById("popupForm").classList.remove("show");
}


gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.normalizeScroll(true); // helps avoid issues with scroll hijacking



// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, TextPlugin, ExpoScaleEase, SlowMo)
    // gsap code here!
});


// Stacked Cards
gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelectorAll(".card");

ScrollTrigger.create({
  trigger: ".cards-pin-section",
  start: "top top",
  end: `+=${cards.length * 100}%`,
  pin: ".cards-stack",
  scrub: true,
});

cards.forEach((card, index) => {
  const offsetY = Math.min(10 + index * 20, 80); // Cap max Y offset at 80px

  gsap.fromTo(
    card,
    {
      y: "100vh",
      scale: 0.8,
      zIndex: 10 + index,
    },
    {
      y: `${offsetY}px`, // Stacking at top with increasing offset
      scale: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".cards-pin-section",
        start: `${(index * 100) / cards.length}% top`,
        end: `${((index + 1) * 100) / cards.length}% top`,
        scrub: true,
      },
    }
  );
});



// Footer Cards


document.addEventListener("DOMContentLoaded", () => {
  const dragArea = document.querySelector(".drag-container");
  const buttons = document.querySelectorAll(".drag-btn");
  let topZIndex = 10; // Track z-index for stacking

  buttons.forEach((btn, i) => {
    btn.style.left = `${100 + i * 150}px`;
    btn.style.top = `${100 + i * 50}px`;

    let isDragging = false;
    let offsetX, offsetY;

    btn.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - btn.offsetLeft;
      offsetY = e.clientY - btn.offsetTop;
      btn.style.cursor = "grabbing";

      // Bring the clicked button to front
      topZIndex++;
      btn.style.zIndex = topZIndex;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      const rect = dragArea.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      x = Math.max(0, Math.min(x, rect.width - btnRect.width));
      y = Math.max(0, Math.min(y, rect.height - btnRect.height));

      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      btn.style.cursor = "grab";
    });
  });
});


const dragArea = document.querySelector(".drag-container");

buttons.forEach(btn => {
  const size = btn.getBoundingClientRect();
  const randX = Math.random() * (dragArea.offsetWidth - size.width);
  const randY = Math.random() * (dragArea.offsetHeight - size.height);

  gsap.set(btn, { x: randX, y: randY });

  Draggable.create(btn, {
    bounds: dragArea,
    inertia: true,
    type: "x,y"
  });
});