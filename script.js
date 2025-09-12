// List of your symbols (update with your own clipart filenames)
const symbols = ["guitar.jpg", "saxophone.jpg", "trombone.jpg", "piano.jpg", "flute.jpg", "clarinet.jpg", "trumpet.jpg", "violin.jpg", "drums.jpg", "accordeon.jpg", "balalaika.jpg", "playguitar.jpg"];

function spin() {
  const reels = [1, 2, 3].map(n => {
    const choice = symbols[Math.floor(Math.random() * symbols.length)];
    document.getElementById(`reel${n}`).src = `images/${choice}`;
    return choice;
  });

  // Check if all match
  const result = document.getElementById("result");
  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    result.textContent = "🎉 Jackpot! You got 3 in a row!";
  } else {
    result.textContent = "Try again!";
  }
}
