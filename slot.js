let symbols = [];

async function loadSymbols() {
  try {
    const response = await fetch("./images/images.json?v=2");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    symbols = await response.json();
    console.log("Symbols loaded:", symbols);

    // Initialize each reel with a random image
    for (let i = 1; i <= 5; i++) {
      const reel = document.getElementById(`reel${i}`);
      if (reel) {
        const choice = symbols[Math.floor(Math.random() * symbols.length)];
        reel.src = `images/${choice}`;
      }
    }

    const spinBtn = document.getElementById("spinBtn");
    spinBtn.disabled = false;
    spinBtn.addEventListener("click", spin);

  } catch (err) {
    console.error("Failed to load images.json", err);
    document.getElementById("result").textContent = "Error loading images!";
  }
}

function spin() {
  if (symbols.length < 5) {
    document.getElementById("result").textContent = "Not enough symbols!";
    return;
  }

  const availableSymbols = [...symbols];
  const reels = [];
  const result = document.getElementById("result");
  const spinBtn = document.getElementById("spinBtn");
  spinBtn.disabled = true;
  result.textContent = "Spinning... 🎰";

  [1, 2, 3, 4, 5].forEach((n, i) => {
    const reel = document.getElementById(`reel${n}`);
    if (!reel) return;

    reel.classList.add("spinning");
    const duration = 2000 + i * 500;
    const spinStart = Date.now();

    const spinInterval = setInterval(() => {
      // Random symbol for spinning effect
      const randomChoice = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = `images/${randomChoice}`;

      if (Date.now() - spinStart >= duration) {
        clearInterval(spinInterval);

        // Final symbol: pick unique one
        const index = Math.floor(Math.random() * availableSymbols.length);
        const finalChoice = availableSymbols.splice(index, 1)[0];
        reel.src = `images/${finalChoice}`;
        reel.classList.remove("spinning");
        reel.classList.add("stopping");
        setTimeout(() => reel.classList.remove("stopping"), 400);

        reels[n - 1] = finalChoice;

        // After last reel
        if (n === 5) {
          if (reels.every(r => r === reels[0])) {
            result.textContent = "🎉 Jackpot! You got 5 in a row!";
          } else {
            result.textContent = "Here are your symbols!";
          }
          spinBtn.disabled = false;
        }
      }
    }, 60);
  });
}

window.addEventListener("DOMContentLoaded", loadSymbols);
