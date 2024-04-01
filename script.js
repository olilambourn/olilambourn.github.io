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

// Function to submit a game
document.getElementById('submit-game').addEventListener('click', function() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const result = document.getElementById('result').value;

    db.ref('games').push({
        player1: player1,
        player2: player2,
        result: result
    });
});

// Function to delete a game (password protected)
document.getElementById('delete-game').addEventListener('click', function() {
    const password = prompt("Enter password to delete game:");
    if (password === "bot") {
        const gameId = prompt("Enter ID of game to delete:");
        db.ref('games').child(gameId).remove();
    } else {
        alert("Incorrect password!");
    }
});

// Function to reset data (password protected)
document.getElementById('reset-data').addEventListener('click', function() {
    const password = prompt("Enter password to reset data:");
    if (password === "botsystemfailure") {
        db.ref('games').remove();
    } else {
        alert("Incorrect password!");
    }
});

// Display leaderboard and game log
function displayData() {
    db.ref('games').on('value', function(snapshot) {
        const games = snapshot.val();
        let leaderboard = {};
        let gameLog = "";
        if (games) {
            Object.values(games).forEach(game => {
                // Update leaderboard
                if (!leaderboard[game.player1]) leaderboard[game.player1] = 0;
                if (!leaderboard[game.player2]) leaderboard[game.player2] = 0;
                if (game.result === 'win') {
                    leaderboard[game.player1] += 1;
                    leaderboard[game.player2] -= 1;
                } else if (game.result === 'lose') {
                    leaderboard[game.player1] -= 1;
                    leaderboard[game.player2] += 1;
                }
                // Update game log
                gameLog += `${game.player1} vs ${game.player2}: ${game.result}\n`;
            });
        }

        // Sort and display leaderboard
        const sortedLeaderboard = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
        document.getElementById('leaderboard').innerHTML = "<ol>";
        sortedLeaderboard.forEach(entry => {
            document.getElementById('leaderboard').innerHTML += `<li>${entry[0]}: ${entry[1]}</li>`;
        });
        document.getElementById('leaderboard').innerHTML += "</ol>";

        // Display game log
        document.getElementById('game-history').innerText = gameLog;
    });
}

// Call function to display data on page load
displayData();
