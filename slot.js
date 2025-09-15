let symbols = [];

async function loadSymbols() {
  try {
    const response = await fetch("images/images.json");
    symbols = await response.json();
    console.log("Loaded symbols:", symbols);

    // Enable button after loading
    document.getElementById("spinBtn").disabled = false;
  } catch (err) {
    console.error("Failed to load symbols.json", err);
  }
}

// call this once on page load
loadSymbols();

function spin() {
  if (symbols.length === 0) {
    console.warn("Symbols not loaded yet!");
    return;
  }

  console.log("Spin clicked ✅");
  const reels = [];
  const result = document.getElementById("result");
  result.textContent = "Spinning... 🎰";

  [1, 2, 3, 4, 5].forEach((n, i) => {
    const reel = document.getElementById(`reel${n}`);
    if (!reel) return;

    reel.classList.add("spinning");
    let lastChoice = null;

    const interval = setInterval(() => {
      let choice;
      do {
        choice = symbols[Math.floor(Math.random() * symbols.length)];
      } while (choice === lastChoice);
      reel.src = `images/${choice}`;
      lastChoice = choice;
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      const finalChoice = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = `images/${finalChoice}`;

      // stop blur, add bounce
      reel.classList.remove("spinning");
      reel.classList.add("stopping");
      setTimeout(() => reel.classList.remove("stopping"), 400);

      reels[n - 1] = finalChoice;

      if (n === 5) {
        if (reels.every(r => r === reels[0])) {
          result.textContent = "🎉 Jackpot! You got 5 in a row!";
        } else {
          result.textContent = "Try again!";
        }
      }
    }, (i + 1) * 2000);
  });
}
