const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

const chars =
  "01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ#$%";

let font = 16;
let drops = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  drops = Array(
    Math.ceil(window.innerWidth / font)
  ).fill(0).map(() => Math.random() * -40);
}

resize();

window.addEventListener("resize", resize);


// MATRIX RAIN
function drawMatrix() {

  ctx.fillStyle = "rgba(2,6,4,0.09)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.font = `${font}px monospace`;

  for (let i = 0; i < drops.length; i++) {

    const text =
      chars[
        Math.floor(
          Math.random() * chars.length
        )
      ];

    if (Math.random() > 0.97) {
      ctx.fillStyle = "#d8ffe3";
    } else {
      ctx.fillStyle = "#00ff66";
    }

    ctx.fillText(
      text,
      i * font,
      drops[i] * font
    );

    if (
      drops[i] * font > canvas.height &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i] += 0.72;
  }
}


// START MATRIX
setInterval(drawMatrix, 35);


// YEAR
const year = document.getElementById("year");

if (year) {
  year.textContent =
    new Date().getFullYear();
}


// MOBILE MENU
const menuBtn =
  document.getElementById("menuBtn");

const nav =
  document.getElementById("nav");

if (menuBtn && nav) {

  menuBtn.addEventListener(
    "click",
    () => {

      nav.classList.toggle("open");

    }
  );

}


// CLOSE MOBILE MENU
document
  .querySelectorAll("#nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        if (nav) {
          nav.classList.remove("open");
        }

      }
    );

  });
