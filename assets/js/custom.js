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

// Split and animate lines of #aboutText
const splitText = new SplitType("#aboutText", { types: "lines" });

gsap.from(splitText.lines, {
    scrollTrigger: {
        trigger: "#aboutText",
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none none",
        // scrub: true  // Optional for scroll-synced effect
    },
    y: 50,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out"
});

// Fading Slider

let currentSlide = 0;

window.addEventListener("DOMContentLoaded", () => {
    const sliderImages = document.querySelectorAll(".slide-img");
    const sliderTexts = document.querySelectorAll(".slide-text");
    const slideCounters = document.querySelectorAll(".slide-count");

    setInterval(() => {
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


import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother);