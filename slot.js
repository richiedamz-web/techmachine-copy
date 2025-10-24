function getCacheBustedUrl(url) {
  return url + "?v=" + new Date().getTime();
}

// Symbol list (use the actual filenames of your new sharp images)
var symbols = [
  "images/elleaunchien.jpg",
  "images/ilaunchat.jpg",
  "images/jadoreleschat.jpg",
  "images/jaimeleschiens.jpg",
  "images/jenaimepaslesperroquets.jpg",
  "images/jenaipasdanimal.jpg",
  "images/ouijaimelesanimaux.jpg",
  "images/tuaimeslesanimaux.jpg",
  "images/unchat.jpg",
  "images/uncheval.jpg",
  "images/unchien.jpg",
  "images/uncochondinde.jpg", 
  "images/unesouris", 
  "images/unhamster",
  "images/unherisson", 
  "images/unlapin",
  "images/unperroquet",
  "images/unpoissonrouge"
];

// Initialize reels on page load
function initializeReels() {
  for (var i = 1; i <= 5; i++) {
    var reel = document.getElementById("reel" + i);
    if (reel) {
      // Pick a random symbol and add a cache-buster
      reel.src = getCacheBustedUrl(symbols[Math.floor(Math.random() * symbols.length)]);
    }
  }

  var spinBtn = document.getElementById("spinBtn");
  if (spinBtn) {
    spinBtn.disabled = false;
    spinBtn.addEventListener("click", spin);
  }
}

// Spin function
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
    (function(n) {
      var reel = document.getElementById("reel" + n);
      if (!reel) return;

      reel.classList.add("spinning");
      var duration = 2000 + (n - 1) * 500;
      var startTime = performance.now();

      function animate(now) {
        var elapsed = now - startTime;
        var speed = Math.max(60, 300 - (elapsed / duration) * 300);

        // Spinning: pick random symbol with cache-buster
        reel.src = getCacheBustedUrl(symbols[Math.floor(Math.random() * symbols.length)]);

        if (elapsed < duration) {
          setTimeout(function() { requestAnimationFrame(animate); }, speed);
        } else {
          var index = Math.floor(Math.random() * availableSymbols.length);
          var finalChoice = availableSymbols.splice(index, 1)[0];
          reel.src = getCacheBustedUrl(finalChoice); // Final symbol with cache-buster
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
    })(n);
  }
}

// Run on page load
window.addEventListener("DOMContentLoaded", initializeReels);
