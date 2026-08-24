const playerName = localStorage.getItem("playerName");
const errorMsg = document.getElementById("errorMsg");
const buttons = document.querySelectorAll(".category-btn");

// Check if player name exists
if (!playerName || playerName.trim() === "") {

    errorMsg.textContent = "Please enter your name first!";

    // Disable all category buttons
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Redirect to Home after 2 seconds
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);

} else {

    // Category Selection
    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const category = button.dataset.category;

            localStorage.setItem("selectedCategory", category);

            window.location.href = "quiz.html";

        });

    });

}