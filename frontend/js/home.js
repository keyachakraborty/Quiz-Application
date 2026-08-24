const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const user = getUser();

    if (user) {
        window.location.href = "category.html";
    }
    else {
        window.location.href = "login.html";
    }
});
