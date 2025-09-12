// List of your symbols (update with your own clipart filenames)
const symbols = ["cherry.png", "star.png", "banana.png", "lemon.png", "grape.png"];

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