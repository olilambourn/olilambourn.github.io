// script.js
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAwKBqhqCz-9tEpaGS_ty-i4Sc-65DWhRo",
  authDomain: "cheeaderboard.firebaseapp.com",
  projectId: "cheeaderboard",
  storageBucket: "cheeaderboard.appspot.com",
  messagingSenderId: "422013996796",
  appId: "1:422013996796:web:864f65d34d0c433ad2d179",
  measurementId: "G-7WT1608D9E"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Function to delete a game
function deleteGame(gameId) {
  // Delete game data from the database
  firebase.database().ref('games').child(gameId).remove();
}

// Function to reset all data
function resetData() {
  // Reset all data in the database (use with caution)
  firebase.database().ref().remove();
}

// Function to fetch and display leaderboard
function displayLeaderboard() {
  firebase.database().ref('leaderboard').once('value', function(snapshot) {
    // Update leaderboard display with data from the snapshot
  });
}

// Event listener for submitting a game
document.getElementById('submit-game').addEventListener('click', function() {
  var player = document.getElementById('player').value;
  var result = document.getElementById('result').value;
  addGame(player, result);
});

// Event listener for deleting a game (password protected)
document.getElementById('delete-game').addEventListener('click', function() {
  var password = prompt("Enter password to delete game:");
  if (password === "bot") {
    var gameId = prompt("Enter ID of game to delete:");
    deleteGame(gameId);
  } else {
    alert("Incorrect password!");
  }
});

// Event listener for resetting data (password protected)
document.getElementById('reset-data').addEventListener('click', function() {
  var password = prompt("Enter password to reset data:");
  if (password === "botsystemfailure") {
    resetData();
  } else {
    alert("Incorrect password!");
  }
});

// Call function to display leaderboard on page load
displayLeaderboard();
