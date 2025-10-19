var symbols = [
  "images/animationnew.jpg",
  "images/jecodenew.png",
  "images/jejoue.jpg",
  "images/jenvoieemails.jpg",
  "images/jenvoiesms.jpg",
  "images/jeparleamies.jpg",
  "images/jeparleamiesnew.jpg",
  "images/jeparleamis.jpg",
  "images/jeregardenew.jpg",
  "images/jesurfenew.jpg",
  "images/jetchattenew.png",
  "images/jetelecharge.jpg",
  "images/programmation.jpg"
];

function initializeReels() {
  for (var i = 1; i <= 5; i++) {
    var reel = document.getElementById("reel" + i);
    if (reel) {
      reel.src = symbols[Math.floor(Math.random() * symbols.length)];
    }
  }

  var spinBtn = document.getElementById("spinBtn");
  if (spinBtn) {
    spinBtn.disabled = false;
    spinBtn.addEventListener("click", spin);
  }
}

function spin() {
  if (symbols.length < 5) {
    var result = document.getElementById("result");
    if (result) result.textContent = "Not enough symbols!";
    return;
  }

  var availableSymbols = symbols.slice();
  var reels = [];
  var result = document.getElementById("result");
  var spinBtn = document.getElementById("spinBtn");
  if (spinBtn) spinBtn.disabled = true;
  if (result) result.textContent = "Ça tourne!... 🎰";

  for (var n = 1; n <= 5; n++) {
    (function(n, i) {
      var reel = document.getElementById("reel" + n);
      if (!reel) return;

      reel.classList.add("spinning");
      var duration = 2000 + i * 500;
      var startTime = performance.now();

      function animate(now) {
        var elapsed = now - startTime;
        var speed = Math.max(60, 300 - (elapsed / duration) * 300);
        reel.src = symbols[Math.floor(Math.random() * symbols.length)];

        if (elapsed < duration) {
          setTimeout(function() { requestAnimationFrame(animate); }, speed);
        } else {
          var index = Math.floor(Math.random() * availableSymbols.length);
          var finalChoice = availableSymbols.splice(index, 1)[0];
          reel.src = finalChoice;
          reel.classList.remove("spinning");
          reel.classList.add("stopping");
          setTimeout(function() { reel.classList.remove("stopping"); }, 400);

          reels[n - 1] = finalChoice;

          if (n === 5) {
            if (reels.every(function(r) { return r === reels[0]; })) {
              if (result) result.textContent = "🎉 Jackpot! You got 5 in a row!";
            } else {
              if (result) result.textContent = "Voici tes images!";
            }
            if (spinBtn) spinBtn.disabled = false;
          }
        }
      }

      requestAnimationFrame(animate);
    })(n, n-1);
  }
}

window.addEventListener("DOMContentLoaded", initializeReels);
