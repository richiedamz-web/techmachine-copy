const symbols = [
  "guitar.jpg", "saxophone.jpg", "trombone.jpg", "piano.jpg",
  "flute.jpg", "clarinet.jpg", "trumpet.jpg", "violin.jpg",
  "drums.jpg", "accordeon.jpg", "balalaika.jpg", "playguitar.jpg"
];

function spin() {
  const reels = [];
  const result = document.getElementById("result");
  result.textContent = "Spinning... 🎰";

  console.log("Spin clicked");
[1,2,3,4,5].forEach(n => {
  const el = document.getElementById(`reel${n}`);
  console.log(`reel${n}:`, el);
});

  [1, 2, 3, 4, 5].forEach((n, i) => {
    const reel = document.getElementById(`reel${n}`);
    reel.classList.add("spinning"); // start blur/shake

    let lastChoice = null;

    const interval = setInterval(() => {
      let choice;
      do {
        choice = symbols[Math.floor(Math.random() * symbols.length)];
      } while (choice === lastChoice); // prevent repeats
      reel.src = `images/${choice}`;
      lastChoice = choice;
    }, 80); // fast cycle

    // stop reel after (i+1)*2000 ms → 2s, 4s, 6s, etc.
    setTimeout(() => {
      clearInterval(interval);
      const finalChoice = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = `images/${finalChoice}`;
      reel.classList.remove("spinning"); // stop blur/shake
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
