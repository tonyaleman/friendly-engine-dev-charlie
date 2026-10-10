const professorPictures = [
  "../assets/images/professor1.jpg",
  "../assets/images/professor2.jpg",
  "../assets/images/professor3.jpg",
  "../assets/images/professor4.jpg"
];

const gameArea = document.getElementById("gameArea");
const professor = document.getElementById("professor");

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

const startButton = document.getElementById("startButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");
const menuButton = document.getElementById("menuButton");

const playerNameDisplay = document.getElementById("playerNameDisplay");


// Get username from menu
const playerName = localStorage.getItem("playerName");

playerNameDisplay.textContent = "Player: " + playerName;


// Game variables
let score = 0;
let lives = 3;

let professorClicked = false;
let gameOver = false;

let gameInterval;


// Start Game
function startGame() {

  score = 0;
  lives = 3;
  gameOver = false;

  scoreDisplay.textContent = "Score: 0";
  livesDisplay.textContent = "Lives: 3";

  startButton.style.display = "none";
  gameOverScreen.style.display = "none";

  professor.style.display = "none";

  // Show first professor
  showProfessor();

  // Show another professor every 2 seconds
  gameInterval = setInterval(showProfessor, 2000);
}


// Show Professor
function showProfessor() {

  if (gameOver) {
    return;
  }

  professorClicked = false;

  // Pick random professor
  const randomProfessor =
    Math.floor(Math.random() * professorPictures.length);

  professor.src = professorPictures[randomProfessor];


  // Professor size
  const professorWidth = 100;
  const professorHeight = 100;


  // Find available space
  const maxX =
    gameArea.clientWidth - professorWidth - 10;

  const maxY =
    gameArea.clientHeight - professorHeight - 10;


  // Pick random location
  const randomX =
    5 + Math.random() * maxX;

  const randomY =
    5 + Math.random() * maxY;


  // Move professor
  professor.style.left = randomX + "px";
  professor.style.top = randomY + "px";


  // Show professor
  professor.style.display = "block";


  // Professor disappears after 750 milliseconds
  setTimeout(function() {

    // If player missed professor
    if (
      professorClicked === false &&
      gameOver === false
    ) {

      lives--;

      livesDisplay.textContent =
        "Lives: " + lives;

      professor.style.display = "none";


      // Player loses
      if (lives === 0) {

        endGame(false);
      }
    }

  }, 750);
}


// Click Professor
professor.addEventListener("click", function() {

  if (
    gameOver === false &&
    professor.style.display !== "none"
  ) {

    professorClicked = true;

    score++;

    scoreDisplay.textContent =
      "Score: " + score;

    professor.style.display = "none";


    // Player reached maximum score
    if (score === 15) {

      endGame(true);
    }
  }
});


// End Game
function endGame(playerWon) {

  gameOver = true;

  clearInterval(gameInterval);

  professor.style.display = "none";


  // Save score for leaderboard
  localStorage.setItem("playerScore", score);


  // Show final score
  finalScore.textContent =
    "Score: " + score;


  // Change message depending on win or loss
  const gameResult =
    gameOverScreen.querySelector("h1");

  if (playerWon) {

    gameResult.textContent = "You Win!";

  } else {

    gameResult.textContent = "You Lose!";
  }


  // Show game over screen
  gameOverScreen.style.display = "block";
}


// Start Button
startButton.addEventListener("click", function() {

  startGame();
});


// Restart Button
restartButton.addEventListener("click", function() {

  clearInterval(gameInterval);

  startGame();
});


// Back to Menu
menuButton.addEventListener("click", function() {

  window.location.href = "../index.html";
});