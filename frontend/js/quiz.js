
// Selected Category
const category = localStorage.getItem("selectedCategory");
if (!category) {
    alert("Please select a category first.");
    window.location.href = "category.html";
}

// Questions
const questions = quizData[category];
if (!questions) {
    alert("Questions not found.");
    window.location.href = "category.html";
}

let currentQuestion = Number(localStorage.getItem("currentQuestion")) || 0;
let score = Number(localStorage.getItem("score")) || 0;
let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};

let timeLeft = 15;
let timer;

const questionNumber = document.getElementById("questionNumber");
const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerElement = document.getElementById("timer");

nextBtn.style.display = "none";

// Timer
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${timeLeft}s`;
    timer = setInterval(function () {
        timeLeft--;
        timerElement.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;

            localStorage.setItem("currentQuestion", currentQuestion);

            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                localStorage.setItem("latestScore", score);
                localStorage.setItem("selectedCategory", category);

                localStorage.removeItem("currentQuestion");
                localStorage.removeItem("score");
                localStorage.removeItem("userAnswers");

                window.location.href = "result.html";
            }
        }
    }, 1000);
}

// Load Question
function loadQuestion() {
    nextBtn.style.display = "none";

    questionNumber.innerHTML = `Question ${currentQuestion + 1} / ${questions.length}`;

    question.innerHTML = questions[currentQuestion].question;

    options.innerHTML = "";
    questions[currentQuestion].options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerHTML = option;
        btn.className = "option";
        btn.onclick = function () {
            checkAnswer(index);
        };
        options.appendChild(btn);
    });

    // question- answer
    if (userAnswers[currentQuestion] !== undefined) {

        const allButtons = document.querySelectorAll(".option");

        const savedAnswer = userAnswers[currentQuestion];
        const correctAnswer = questions[currentQuestion].answer;

        allButtons.forEach(btn => btn.disabled = true);

        if (savedAnswer === correctAnswer) {
            allButtons[savedAnswer].classList.add("correct");
        } else {
            allButtons[savedAnswer].classList.add("wrong");
            allButtons[correctAnswer].classList.add("correct");
        }
        nextBtn.style.display = "inline-block";
        clearInterval(timer);
        return;
    }
    startTimer();
}

loadQuestion();

// Check Answer
function checkAnswer(selectedIndex) {
    clearInterval(timer);

    userAnswers[currentQuestion] = selectedIndex;
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

    const correctAnswer = questions[currentQuestion].answer;

    const allButtons = document.querySelectorAll(".option");

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctAnswer) {
        allButtons[selectedIndex].classList.add("correct");
        score += 20;

        localStorage.setItem("score", score);
    } else {
        allButtons[selectedIndex].classList.add("wrong");
        allButtons[correctAnswer].classList.add("correct");
    }
    nextBtn.style.display = "inline-block";
}

nextBtn.onclick = function () {
    currentQuestion++;
    localStorage.setItem("currentQuestion", currentQuestion);
    if (currentQuestion < questions.length) {
        loadQuestion();
    }
    else {
        localStorage.setItem("latestScore", score);

        localStorage.removeItem("currentQuestion");
        localStorage.removeItem("score");
        localStorage.removeItem("userAnswers");

        window.location.href = "result.html";
    }
};

