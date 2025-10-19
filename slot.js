let symbols = [
  "images/animationnew.jpg",
  "images/jecodenew.png",
  "images/jejoue.jpg",
  "images/jenvoieemails.jpg",
  "images/jenvoiesms.jpg",
  "images/jeparleamies.jpg",
  "images/jeparleamiesnew.jpg",
  "images/jeparleamis.jpg",
  "images/jeregardenew.jpg",
  "images/jesurfenew.jpg",
  "images/jetchattenew.png",
  "images/jetelecharge.jpg",
  "images/programmation.jpg"
];

function initializeReels() {
  for (let i = 1; i <= 5; i++) {
    const reel = document.getElementById(`reel${i}`);
    if (reel) {
      reel.src = symbols[Math.floor(Math.random() * symbols.length)];
    }
  }

  const spinBtn = document.getElementById("spinBtn");
  if (spinBtn) {
    spinBtn.disabled = false;
    spinBtn.addEventListener("click", spin);
  }
}

  const spinBtn = document.getElementById("spinBtn");
  if (spinBtn) {
    spinBtn.disabled = false;
    spinBtn.addEventListener("click", spin);
  }
}

function spin() {
  if (symbols.length < 5) {
    const result = document.getElementById("result");
    if (result) result.textContent = "Not enough symbols!";
    return;
  }

  const availableSymbols = [...symbols];
  const reels = [];
  const result = document.getElementById("result");
  const spinBtn = document.getElementById("spinBtn");
  if (spinBtn) spinBtn.disabled = true;
  if (result) result.textContent = "Ça tourne!... 🎰";

  [1, 2, 3, 4, 5].forEach((n, i) => {
    const reel = document.getElementById(`reel${n}`);
    if (!reel) return;

    reel.classList.add("spinning");
    const duration = 2000 + i * 500;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const speed = Math.max(60, 300 - (elapsed / duration) * 300);
      const randomChoice = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = randomChoice;

      if (elapsed < duration) {
        setTimeout(() => requestAnimationFrame(animate), speed);
      } else {
        const index = Math.floor(Math.random() * availableSymbols.length);
        const finalChoice = availableSymbols.splice(index, 1)[0];
        reel.src = finalChoice;
        reel.classList.remove("spinning");
        reel.classList.add("stopping");
        setTimeout(() => reel.classList.remove("stopping"), 400);

        reels[n - 1] = finalChoice;

        if (n === 5) {
          if (reels.every(r => r === reels[0])) {
            if (result) result.textContent = "🎉 Jackpot! You got 5 in a row!";
          } else {
            if (result) result.textContent = "Voici tes images!";
          }
          if (spinBtn) spinBtn.disabled = false;
        }
      }
    }

    requestAnimationFrame(animate);
  });
}

// Initialize reels on page load
window.addEventListener("DOMContentLoaded", initializeReels);
