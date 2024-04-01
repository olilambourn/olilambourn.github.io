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

// Function to display leaderboard and game log
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
        const leaderboardTable = document.createElement('table');
        leaderboardTable.innerHTML = "<tr><th>Player</th><th>Score</th></tr>";

        sortedLeaderboard.forEach(entry => {
            const row = leaderboardTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = entry[0];
            cell2.textContent = entry[1];
        });

        document.getElementById('leaderboard').innerHTML = ""; // Clear existing content
        document.getElementById('leaderboard').appendChild(leaderboardTable);

        // Display game log
        document.getElementById('game-history').innerText = gameLog;
    });
}

// Call function to display data on page load
displayData();
