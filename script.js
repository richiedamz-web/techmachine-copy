const symbols = [
  "guitar.jpg", "saxophone.jpg", "trombone.jpg", "piano.jpg",
  "flute.jpg", "clarinet.jpg", "trumpet.jpg", "violin.jpg",
  "drums.jpg", "accordeon.jpg", "balalaika.jpg", "playguitar.jpg"
];

function spin() {
  console.log("Spin clicked ✅");
  const reels = [];
  const result = document.getElementById("result");
  result.textContent = "Spinning... 🎰";

  [1, 2, 3, 4, 5].forEach((n, i) => {
    const reel = document.getElementById(`reel${n}`);
    if (!reel) {
      console.error("Reel element not found:", n);
      return;
    }

    reel.classList.add("spinning"); // start animation
    let lastChoice = null;

    // change symbol every 80ms
    const interval = setInterval(() => {
      let choice;
      do {
        choice = symbols[Math.floor(Math.random() * symbols.length)];
      } while (choice === lastChoice);
      reel.src = `images/${choice}`;
      lastChoice = choice;
    }, 80);

    // stop each reel at staggered intervals: 2s, 4s, 6s, 8s, 10s
    setTimeout(() => {
      clearInterval(interval);
      const finalChoice = symbols[Math.floor(Math.random() * symbols.length)];
      reel.src = `images/${finalChoice}`;
      reel.classList.remove("spinning");
      reels[n - 1] = finalChoice;
      console.log(`Reel ${n} stopped on: ${finalChoice}`);

      // check result after last reel stops
      if (n === 5) {
        console.log("All reels stopped:", reels);
        if (reels.every(r => r === reels[0])) {
          result.textContent = "🎉 Jackpot! You got 5 in a row!";
        } else {
          result.textContent = "Try again!";
        }
      }
    }, (i + 1) * 2000);
  });
}
