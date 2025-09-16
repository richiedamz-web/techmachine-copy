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
  // Safety check: Ensure there are enough unique symbols for all reels.
  if (symbols.length < 5) {
    console.error("Not enough unique symbols to fill all reels.");
    document.getElementById("result").textContent = "Error: Not enough symbols!";
    return;
  }

  // Create a copy of the symbols array to pick from for this spin.
  // This prevents modifying the original 'symbols' array.
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
    let duration = 2000 + i * 500; // each reel spins slightly longer

    let spinStart = Date.now();

    const spinInterval = setInterval(() => {
      // The visual spinning can still show duplicates, which is fine.
      const choice = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = `images/${choice}`;

      // Stop spinning after duration
      if (Date.now() - spinStart >= duration) {
        clearInterval(spinInterval);

        // --- MODIFICATION START ---
        // Pick a random index from the CURRENT available symbols
        const randomIndex = Math.floor(Math.random() * availableSymbols.length);
        
        // Get the symbol at that index
        const finalChoice = availableSymbols[randomIndex];
        
        // Remove the chosen symbol from the available pool so it can't be picked again
        availableSymbols.splice(randomIndex, 1);
        // --- MODIFICATION END ---
        
        reel.src = `images/${finalChoice}`;
        reel.classList.remove("spinning");
        reel.classList.add("stopping");
        setTimeout(() => reel.classList.remove("stopping"), 400);

        reels[n - 1] = finalChoice;

        // Once the last reel stops, show the result
        if (n === 5) {
          // The jackpot condition of 5 in a row is now impossible with this logic,
          // but we'll leave the structure here.
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
