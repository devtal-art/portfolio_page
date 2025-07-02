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
document.addEventListener("DOMContentLoaded", () => {
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
const dragArea = document.querySelector(".drag-container");
const buttons = document.querySelectorAll(".drag-btn");

const placedRects = []; // Store placed button bounding boxes

buttons.forEach((btn, i) => {
  const size = btn.getBoundingClientRect();
  const btnWidth = size.width;
  const btnHeight = size.height;

  let tries = 0;
  let randX, randY;
  let overlaps;

  do {
    overlaps = false;
    randX = Math.random() * (dragArea.offsetWidth - btnWidth);
    randY = Math.random() * (dragArea.offsetHeight - btnHeight - 50);

    const newRect = {
      left: randX,
      top: randY,
      right: randX + btnWidth,
      bottom: randY + btnHeight
    };

    for (const rect of placedRects) {
      if (
        !(newRect.right < rect.left ||
          newRect.left > rect.right ||
          newRect.bottom < rect.top ||
          newRect.top > rect.bottom)
      ) {
        overlaps = true;
        break;
      }
    }

    tries++;
  } while (overlaps && tries < 50); // prevent infinite loop

  placedRects.push({
    left: randX,
    top: randY,
    right: randX + btnWidth,
    bottom: randY + btnHeight
  });

  // Drop in with bounce
  gsap.set(btn, { x: randX, y: -150 });
  gsap.to(btn, {
    y: randY,
    duration: 1,
    delay: 0.2 + i * 0.15,
    ease: "bounce.out"
  });

  // Make draggable
  Draggable.create(btn, {
    bounds: dragArea,
    inertia: true,
    type: "x,y"
  });
});



// Contact Buttons Hide

// Smooth show/hide contact button on scroll
const contactButton = document.querySelector('.contact-button');
const hideSection = document.querySelector('.contact-panel'); // or use another selector if needed

ScrollTrigger.create({
  trigger: hideSection,
  start: "top center",
  end: "bottom center",
  onEnter: () => {
    gsap.to(contactButton, { autoAlpha: 0, duration: 0.5, ease: "power1.out" });
  },
  onLeaveBack: () => {
    gsap.to(contactButton, { autoAlpha: 1, duration: 0.5, ease: "power1.out" });
  },
});


// ✅ Real-Time Clock
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour12: false });
  document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// ✅ Get User Location (City, Country - Approximate)
function updateLocation() {
  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      const locationText = `${data.city}, ${data.region}, ${data.country_name}`;
      document.getElementById('location').textContent = locationText;
    })
    .catch(() => {
      document.getElementById('location').textContent = "Location unavailable";
    });
}
updateLocation();



window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".drag-container");
  const buttons = Array.from(document.querySelectorAll(".drag-btn"));

  const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

  const engine = Engine.create();
  const world = engine.world;

  const render = Render.create({
    element: container,
    engine: engine,
    options: {
      width: container.offsetWidth,
      height: container.offsetHeight,
      wireframes: false,
      background: 'transparent'
    }
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  // Add walls
  const ground = Bodies.rectangle(container.offsetWidth / 2, container.offsetHeight + 50, container.offsetWidth, 100, {
    isStatic: true
  });
  const leftWall = Bodies.rectangle(-50, container.offsetHeight / 2, 100, container.offsetHeight, { isStatic: true });
  const rightWall = Bodies.rectangle(container.offsetWidth + 50, container.offsetHeight / 2, 100, container.offsetHeight, { isStatic: true });

  Composite.add(world, [ground, leftWall, rightWall]);

  // Add buttons as physics objects
  buttons.forEach(btn => {
    const rect = btn.getBoundingClientRect();
    const x = Math.random() * (container.offsetWidth - rect.width);
    const y = -Math.random() * 300;

    const body = Bodies.rectangle(x + rect.width / 2, y, rect.width, rect.height, {
      restitution: 0.6, // bounce
      friction: 0.1,
      angle: Math.random() * 2 * Math.PI,
    });

    Composite.add(world, body);

    // Sync button position to physics body
    Matter.Events.on(engine, "afterUpdate", () => {
      btn.style.left = `${body.position.x - rect.width / 2}px`;
      btn.style.top = `${body.position.y - rect.height / 2}px`;
      btn.style.transform = `rotate(${body.angle}rad)`;
    });

    // Optional: Mouse dragging
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(world, mouseConstraint);
  });
});

// Click events on buttons

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // Example action: open popup or scroll
    openPopup(); // or any other function like scrollToSection()

    // Optional visual feedback
    btn.style.transform += " scale(1.1)";
    setTimeout(() => {
      btn.style.transform = btn.style.transform.replace(" scale(1.1)", "");
    }, 200);
  });
});