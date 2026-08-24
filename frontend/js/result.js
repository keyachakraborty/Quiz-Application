
const playerName = localStorage.getItem("playerName") || "Anonymous";
const latestScore = parseInt(localStorage.getItem("latestScore")) || 0;
const selectedCategory = localStorage.getItem("selectedCategory") || "General";

const congratsMsgEl = document.getElementById("congratsMsg");
const categoryNameEl = document.getElementById("categoryName");
const scoreValueEl = document.getElementById("scoreValue");
const leaderboardRowsEl = document.getElementById("leaderboardRows");

/* Display Result */

categoryNameEl.textContent = selectedCategory;
scoreValueEl.textContent = latestScore;

if (latestScore >= 80) {
    congratsMsgEl.textContent = "Excellent Work, " + playerName + "! 🏆";
}
else if (latestScore >= 50) {
    congratsMsgEl.textContent = "Good Job, " + playerName + "! 🎉";
}
else {
    congratsMsgEl.textContent = "Keep Practicing, " + playerName + "! 👍";
}

leaderboardRowsEl.innerHTML = "<div class='lb-empty'>Loading scores...</div>";

async function saveToLeaderboard() {

    console.log("saveToLeaderboard function called");

    try {
        const lastSaved = localStorage.getItem("lastSavedScore");

        if (lastSaved === `${playerName}-${selectedCategory}-${latestScore}`) {
            return;
        }

        const response = await authFetch(`${API_BASE_URL}/leaderboard/save`, {
            method: "POST",

            body: JSON.stringify({
                name: playerName,
                category: selectedCategory,
                score: latestScore,
                totalQuestions: 20
            })
        });

        console.log(response.status);
        const data = await response.json();
        console.log(data);

        localStorage.setItem(
            "lastSavedScore",
            `${playerName}-${selectedCategory}-${latestScore}`
        );
    }
    catch (error) {
        console.log(error);
    }
}

/* Show Leaderboard */
saveToLeaderboard().then(() => displayLeaderboard());

async function displayLeaderboard() {
    try {
        leaderboardRowsEl.innerHTML = "";
        const response = await fetch(`${API_BASE_URL}/leaderboard/global`);
        const result = await response.json();

        if (!result.leaderboard || result.leaderboard.length === 0) {
            leaderboardRowsEl.innerHTML = "<div class='lb-empty'>No Scores Yet!</div>";
            return;
        }

        result.leaderboard.forEach((entry, index) => {
            const row = document.createElement("div");
            row.className = "lb-row";
            row.innerHTML = `
                <span><strong>#${index + 1}</strong> ${entry.name}</span>
                <span>${entry.category}</span>
                <span>${entry.score} pts</span>
            `;
            leaderboardRowsEl.appendChild(row);
        });
    }
    catch (error) {
        console.log(error);
    }
}

/* Download Certificate */
function downloadCertificate() {
    window.location.href = "certificate.html";
}