const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

const chars = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";
const fontSize = 16;

let columns;
let drops;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }, () => Math.random() * -50);
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.075)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];

    ctx.fillStyle = Math.random() > 0.97
      ? "#baffca"
      : "#00ff66";

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (
      drops[i] * fontSize > canvas.height &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i] += 0.75;
  }
}

function updateClock() {
  const now = new Date();

  document.getElementById("clock").textContent =
    now.toLocaleTimeString("en-GB", {
      hour12: false
    });
}

function showMessage(text) {
  const box = document.getElementById("message");

  box.textContent = text;
  box.classList.add("show");

  clearTimeout(window.messageTimer);

  window.messageTimer = setTimeout(() => {
    box.classList.remove("show");
  }, 2800);
}

window.addEventListener("resize", resize);

resize();

setInterval(draw, 35);
setInterval(updateClock, 1000);

updateClock();
