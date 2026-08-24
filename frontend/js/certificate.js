
// Read data
const playerName = localStorage.getItem("playerName") || "Student";

const selectedCategory = localStorage.getItem("selectedCategory") || "Quiz";

// HTML Elements
const studentName = document.getElementById("studentName");
const quizCategory = document.getElementById("quizCategory");

const completionDate = document.getElementById("completionDate");

// Show Data
studentName.textContent = playerName;
quizCategory.textContent = selectedCategory + " Quiz";

// Current Date
const today = new Date();

const options = {
    day: "numeric",
    month: "long",
    year: "numeric"
};

completionDate.textContent = today.toLocaleDateString("en-IN", options);

// Download / Print
document.getElementById("printBtn").addEventListener("click", function () {
    window.print();
});

