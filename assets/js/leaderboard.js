const usernameInput = document.getElementById("username");
const startGameButton = document.getElementById("startGameButton");
const leaderboard = document.getElementById("leaderboard");


// Start Game
startGameButton.addEventListener("click", function(event) {

  const username = usernameInput.value;

  // Make sure player entered a username
  if (username === "") {
    event.preventDefault();

    alert("Please enter a username.");

    return;
  }

  // Save username
  localStorage.setItem("playerName", username);
});


// Get saved player information
const savedName = localStorage.getItem("playerName");
const savedScore = localStorage.getItem("playerScore");


// Default leaderboard
let players = [
  {
    name: "Lion",
    score: 14
  },

  {
    name: "Johnny",
    score: 11
  }
];


// If a player has completed a game, add them to the leaderboard
if (savedName !== null && savedScore !== null) {

  players.push({
    name: savedName,
    score: Number(savedScore)
  });
}


// Sort leaderboard 
players.sort(function(a, b) {
  return b.score - a.score;
});


// Display leaderboard
players.forEach(function(player) {

  const listItem = document.createElement("li");

  listItem.className =
    "list-group-item d-flex justify-content-between";

  listItem.innerHTML =
    "<span>" + player.name + "</span>" +
    "<span>" + player.score + "</span>";

  leaderboard.appendChild(listItem);
});
