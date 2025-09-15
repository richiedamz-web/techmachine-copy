const symbols = [
  "guitar.jpg", "saxophone.jpg", "trombone.jpg", "piano.jpg",
  "flute.jpg", "clarinet.jpg", "trumpet.jpg", "violin.jpg",
  "drums.jpg", "accordeon.jpg", "balalaika.jpg", "playguitar.jpg"
];

function spin() {
  const reels = [];
  const result = document.getElementById("result");
  result.textContent = "Spinning... 🎰";

  [1, 2, 3, 4, 5].forEach((n, i) => {
    const reel = document.getElementById(`reel${n}`);
    reel.classList.add("spinning"); // start animation

const interval = setInterval(() => {
  const choice = symbols[Math.floor(Math.random() * symbols.length)];
  reel.src = `images/${choice}`;
}, 50);  // faster refresh

    // stop reel after (i+1)*2000 ms → 2s, 4s, 6s, etc.
    setTimeout(() => {
      clearInterval(interval);
      const finalChoice = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = `images/${finalChoice}`;
      reel.classList.remove("spinning"); // stop animation
      reels[n - 1] = finalChoice;

      // when the last reel stops, check result
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
