let symbols = [];

async function loadSymbols() {
  try {
    const response = await fetch("./images/images.json");
    symbols = await response.json();
    console.log("Loaded symbols:", symbols);

    const spinBtn = document.getElementById("spinBtn");
    spinBtn.disabled = false;
    spinBtn.addEventListener("click", spin);
  } catch (err) {
    console.error("Failed to load images.json", err);
  }
}

function spin() {
  if (symbols.length === 0) return;

  const reels = [];
  const result = document.getElementById("result");
  const spinBtn = document.getElementById("spinBtn");
  spinBtn.disabled = true;
  result.textContent = "Spinning... 🎰";

  [1, 2, 3, 4, 5].forEach((n, i) => {
    const reel = document.getElementById(`reel${n}`);
    if (!reel) return;

    reel.classList.add("spinning");
    let duration = 2000 + i * 500; // each reel spins slightly longer than the previous

    let spinStart = Date.now();

    const spinInterval = setInterval(() => {
      const choice = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = `images/${choice}`;

      // Stop spinning after duration
      if (Date.now() - spinStart >= duration) {
        clearInterval(spinInterval);
        const finalChoice = symbols[Math.floor(Math.random() * symbols.length)];
        reel.src = `images/${finalChoice}`;

        reel.classList.remove("spinning");
        reel.classList.add("stopping");
        setTimeout(() => reel.classList.remove("stopping"), 400);

        reels[n - 1] = finalChoice;

        // Once last reel stops, show result
        if (n === 5) {
          if (reels.every(r => r === reels[0])) {
            result.textContent = "🎉 Jackpot! You got 5 in a row!";
          } else {
            result.textContent = "Try again!";
          }
          spinBtn.disabled = false;
        }
      }
    }, 60); // faster update for smoother motion
  });
}

window.addEventListener("DOMContentLoaded", loadSymbols);
