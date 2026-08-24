
// Must be logged in to view history
if (!getToken()) {
    alert("Please login to view your quiz history.");
    window.location.href = "login.html";
}

const historyStatsEl = document.getElementById("historyStats");
const historyRowsEl = document.getElementById("historyRows");

loadHistory();

async function loadHistory() {
    try {
        const response = await authFetch(`${API_BASE_URL}/history/me`);

        if (response.status === 401) {
            logout();
            return;
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || "Could not load history");
        }

        renderStats(data.stats);
        renderAttempts(data.attempts);

    } catch (error) {
        console.log(error);
        historyRowsEl.innerHTML = `<div class="history-empty">Something went wrong loading your history.</div>`;
    }
}

function renderStats(stats) {
    historyStatsEl.innerHTML = `
        <div class="stat-card">
            <div class="stat-value">${stats.totalAttempts}</div>
            <div class="stat-label">Quizzes Taken</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.bestScore}</div>
            <div class="stat-label">Best Score</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.averageScore}</div>
            <div class="stat-label">Average Score</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.categoriesTried.length}</div>
            <div class="stat-label">Categories Tried</div>
        </div>
    `;
}

function renderAttempts(attempts) {
    if (!attempts || attempts.length === 0) {
        historyRowsEl.innerHTML = `
            <div class="history-empty">
                No quiz attempts yet. <a href="category.html">Take a quiz</a> to get started!
            </div>
        `;
        return;
    }

    historyRowsEl.innerHTML = "";

    attempts.forEach((attempt) => {
        const row = document.createElement("div");
        row.className = "history-row";

        const date = new Date(attempt.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

        row.innerHTML = `
            <span>${attempt.category}</span>
            <span class="attempt-score">${attempt.score} pts</span>
            <span>${attempt.totalQuestions}</span>
            <span>${date}</span>
            <span>
                <button class="history-delete-btn" data-id="${attempt._id}">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </span>
        `;

        historyRowsEl.appendChild(row);
    });

    document.querySelectorAll(".history-delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => deleteAttempt(btn.dataset.id));
    });
}

async function deleteAttempt(id) {
    const confirmed = confirm("Delete this quiz attempt from your history?");
    if (!confirmed) return;

    try {
        const response = await authFetch(`${API_BASE_URL}/history/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || "Could not delete attempt");
        }

        loadHistory();

    } catch (error) {
        alert(error.message);
    }
}
