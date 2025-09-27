let symbols = [];

async function loadSymbols() {
  try {
    // Fetch the latest images.json
    const response = await fetch("./images/images.json?v=2");
    symbols = await response.json();
    console.log("Loaded symbols:", symbols);

    // Initialize each reel with a random image
    for (let i = 1; i <= 5; i++) {
      const reel = document.getElementById(`reel${i}`);
      if (reel) {
        const choice = symbols[Math.floor(Math.random() * symbols.length)];
        reel.src = `images/${choice}`;
      }
    }

    // Enable the spin button
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
    console.error("Not enough unique symbols to fill all reels.");
    document.getElementById("result").textContent = "Error: Not enough symbols!";
    return;
  }

  let availableSymbols = [...symbols];
  const reels = [];
  const result = document.getElementById("result");
  const spinBtn = document.getElementById("spinBtn");
  spinBtn.disabled = true;
  result.textContent = "Spinning... 🎰";

  [1, 2, 3, 4, 5].forEach((n, i) => {
    const reel = document.getElementById(`reel${n}`);
    if (!reel) return;

    reel.classList.add("spinning");
    let duration = 2000 + i * 500;
    let spinStart = Date.now();

    const spinInterval = setInterval(() => {
      // Show a random symbol during spinning
      const choice = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = `images/${choice}`;

      if (Date.now() - spinStart >= duration) {
        clearInterval(spinInterval);

        // Pick a unique symbol from the remaining pool
        const randomIndex = Math.floor(Math.random() * availableSymbols.length);
        const finalChoice = availableSymbols[randomIndex];
        availableSymbols.splice(randomIndex, 1);

        reel.src = `images/${finalChoice}`;
        reel.classList.remove("spinning");
        reel.classList.add("stopping");
        setTimeout(() => reel.classList.remove("stopping"), 400);

        reels[n - 1] = finalChoice;

        // Show result after last reel stops
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
