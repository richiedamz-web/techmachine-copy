
const symbols = ["guitar.jpg", "saxophone.jpg", "trombone.jpg", "piano.jpg", "flute.jpg", "clarinet.jpg", "trumpet.jpg", "violin.jpg", "drums.jpg", "accordeon.jpg", "balalaika.jpg", "playguitar.jpg"];




function spin() {
  const reels = [1, 2, 3, 4, 5].map(n => {
    const choice = symbols[Math.floor(Math.random() * symbols.length)];
    document.getElementById(`reel${n}`).src = `images/${choice}`;
    return choice;
  });

  // Check if all 5 match
  const result = document.getElementById("result");
  if (reels.every(r => r === reels[0])) {
    result.textContent = "🎉 Jackpot! You got 5 in a row!";
  } else {
    result.textContent = "Try again!";
  }
}
