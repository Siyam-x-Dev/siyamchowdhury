const matrixCanvas = document.getElementById("matrix");
const ctx = matrixCanvas.getContext("2d");

const particleCanvas = document.getElementById("particles");
const pctx = particleCanvas.getContext("2d");

const chars =
  "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";

let fontSize = 16;
let columns = 0;
let drops = [];
let particles = [];

function resizeCanvases() {
  matrixCanvas.width = innerWidth;
  matrixCanvas.height = innerHeight;

  particleCanvas.width = innerWidth;
  particleCanvas.height = innerHeight;

  columns = Math.floor(innerWidth / fontSize);

  drops = Array.from(
    { length: columns },
    () => Math.random() * -60
  );

  particles = Array.from(
    { length: Math.min(90, Math.floor(innerWidth / 14)) },
    () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.2
    })
  );
}

resizeCanvases();

addEventListener("resize", resizeCanvases);


// MATRIX RAIN
function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,.075)";
  ctx.fillRect(
    0,
    0,
    matrixCanvas.width,
    matrixCanvas.height
  );

  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {

    const char =
      chars[Math.floor(Math.random() * chars.length)];

    ctx.fillStyle =
      Math.random() > 0.975
        ? "#c7ffd7"
        : "#00ff66";

    ctx.fillText(
      char,
      i * fontSize,
      drops[i] * fontSize
    );

    if (
      drops[i] * fontSize > matrixCanvas.height &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i] += 0.7;
  }
}


// PARTICLE NETWORK
function drawParticles() {

  pctx.clearRect(
    0,
    0,
    particleCanvas.width,
    particleCanvas.height
  );

  for (const p of particles) {

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > innerWidth) {
      p.vx *= -1;
    }

    if (p.y < 0 || p.y > innerHeight) {
      p.vy *= -1;
    }

    pctx.fillStyle = "rgba(0,255,102,.55)";

    pctx.beginPath();

    pctx.arc(
      p.x,
      p.y,
      p.r,
      0,
      Math.PI * 2
    );

    pctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {

    for (let j = i + 1; j < particles.length; j++) {

      const a = particles[i];
      const b = particles[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;

      const distance = Math.hypot(dx, dy);

      if (distance < 105) {

        pctx.strokeStyle =
          `rgba(0,255,102,${(1 - distance / 105) * 0.09})`;

        pctx.beginPath();

        pctx.moveTo(a.x, a.y);
        pctx.lineTo(b.x, b.y);

        pctx.stroke();
      }
    }
  }
}


// ANIMATION LOOP
setInterval(drawMatrix, 35);

function animate() {
  drawParticles();
  requestAnimationFrame(animate);
}

animate();


// BOOT SCREEN
const bootLines = [
  "[ OK ] Loading neural interface...",
  "[ OK ] Establishing encrypted channel...",
  "[ OK ] Rendering Matrix environment...",
  "[ OK ] Identity module loaded...",
  "[ OK ] Access granted."
];

const bootText =
  document.getElementById("bootText");

const progress =
  document.getElementById("bootProgress");

let line = 0;

function boot() {

  if (line < bootLines.length) {

    bootText.innerHTML +=
      bootLines[line] + "<br>";

    line++;

    progress.style.width =
      (line / bootLines.length * 100) + "%";

    setTimeout(boot, 250);

  } else {

    setTimeout(() => {

      document
        .getElementById("boot")
        .classList.add("hide");

    }, 500);
  }
}

setTimeout(boot, 300);


// TYPING EFFECT
const phrases = [
  "Initializing personal interface...",
  "Exploring the digital world...",
  "Building something different...",
  "Welcome to my Matrix."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

const typing =
  document.getElementById("typing");

function typeLoop() {

  const phrase = phrases[phraseIndex];

  typing.textContent =
    deleting
      ? phrase.slice(0, charIndex--)
      : phrase.slice(0, charIndex++);

  if (
    !deleting &&
    charIndex > phrase.length
  ) {

    deleting = true;

    setTimeout(typeLoop, 1200);

    return;
  }

  if (
    deleting &&
    charIndex < 0
  ) {

    deleting = false;

    phraseIndex =
      (phraseIndex + 1) % phrases.length;

    charIndex = 0;
  }

  setTimeout(
    typeLoop,
    deleting ? 35 : 65
  );
}

typeLoop();


// DIGITAL CLOCK
function updateClock() {

  const clock =
    document.getElementById("clock");

  if (!clock) return;

  clock.textContent =
    new Date().toLocaleTimeString(
      "en-GB",
      {
        hour12: false
      }
    );
}

setInterval(updateClock, 1000);

updateClock();


// SCROLL REVEAL
const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );
        }
      });

    },
    {
      threshold: 0.12
    }
  );

document
  .querySelectorAll(".reveal")
  .forEach(el => observer.observe(el));


// PROJECT POPUP
document
  .querySelectorAll(".project-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .getElementById("modalTitle")
          .textContent =
          button.dataset.project;

        document
          .getElementById("modal")
          .classList.add("open");
      }
    );
  });


// CLOSE MODAL
document
  .getElementById("modalClose")
  .onclick = () => {

    document
      .getElementById("modal")
      .classList.remove("open");
  };


// CLICK OUTSIDE MODAL
document
  .getElementById("modal")
  .addEventListener(
    "click",
    event => {

      if (event.target.id === "modal") {

        event.target.classList.remove(
          "open"
        );
      }
    }
  );


// MOBILE MENU
const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.querySelector(".nav nav");

menuBtn.addEventListener(
  "click",
  () => {

    nav.classList.toggle("open");
  }
);


// CLOSE MOBILE MENU
document
  .querySelectorAll(".nav nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        nav.classList.remove("open");
      }
    );
  });


// GLOWING CURSOR
const glow =
  document.querySelector(".cursor-glow");

if (glow) {

  addEventListener(
    "pointermove",
    event => {

      glow.style.transform =
        `translate(${event.clientX}px, ${event.clientY}px)`;
    }
  );
}
