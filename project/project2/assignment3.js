// Set up canvas and context
let canvas;
let ctx;

// Set up variables
let bugX;
let bugY;
let score = 0;
let interval = null;
let hopBugInterval = null;
const initialInterval = 2000;
//Time limit variable
let timeRemaining = 30; // in seconds

// Set up bug hopping function
function hopBug() {
  // Update bug position
  bugX = Math.floor(Math.random() * (canvas.width - 50));
  bugY = Math.floor(Math.random() * (canvas.height - 50));
  
  // Clear canvas and draw bug
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBug();
  
  // Decrease interval and set timeout for next hop
  interval -= 50;
  hopBugInterval = setTimeout(hopBug, interval);
}

// Declare bug image object
const bugImg = new Image();
bugImg.src = "ladybug.png";

// Draw the bug on the canvas
function drawBug() {
  ctx.drawImage(bugImg, bugX, bugY, 50, 50);
}

// Handle mouse click event
function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  if (mouseX >= bugX && mouseX <= bugX + 50 && mouseY >= bugY && mouseY <= bugY + 50) {
    score++;
    document.getElementById("score").innerText = score;
    interval -= 50;
  }
}

//update time remaining
function updateTimeRemaining() {
  document.getElementById("timeRemaining").innerText = timeRemaining;
}

//countdown
function countdown() {
  if (timeRemaining > 0) {
    timeRemaining--;
    updateTimeRemaining();
    setTimeout(countdown, 1000);
  } else {
    endGame();
  }
}

//end game when time is up
function endGame() {
  clearTimeout(hopBugInterval);
  canvas.removeEventListener("click", handleClick);
  alert("Time's up! Your final score is: " + score);
  resetGame();
}




// Reset the game score and speed
function resetGame() {
  // Clear current bug hopping interval and any pending timeouts
  clearTimeout(hopBugInterval);
  clearTimeout(interval);
  
  // Reset game score
  score = 0;
  // Reset interval to initial value
  interval = initialInterval;
  // Reset timer
  timeRemaining = 30;
  
  // Start bug hopping again
  hopBugInterval = setTimeout(hopBug, interval);
  document.getElementById("score").innerText = score;
  updateTimeRemaining();
  
}

// Reset the bug hopping speed
function resetSpeed() {
  // Clear current bug hopping interval
  clearTimeout(hopBugInterval);

  // Reset interval to initial value
  interval = initialInterval;
  hopBugInterval = setTimeout(hopBug, interval);
}

// Start the game and add event listeners to buttons when the window loads
window.onload = function() {
    // Get canvas and context
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

  // Add event listeners to buttons
    document.getElementById("startGameBtn").addEventListener("click", startGame);
    document.getElementById("resetGameBtn").addEventListener("click", resetGame);
    document.getElementById("resetSpeedBtn").addEventListener("click", resetSpeed);
}

function startGame() {
  // Get canvas and context
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  
  // Draw the bug immediately
  hopBug();

  updateTimeRemaining(); // Display initial time remaining
  countdown(); // Start the countdown timer
  
  // Set up bug hopping interval
  interval = initialInterval;
  hopBugInterval = setTimeout(hopBug, interval);
  
  // Add mouse click event listener to canvas
  canvas.addEventListener("click", handleClick);
}

