
// If already logged in, skip straight to categories
if (getToken()) {
    window.location.href = "category.html";
}

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const authMessage = document.getElementById("authMessage");

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    authMessage.textContent = "";
    authMessage.className = "auth-message";
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        saveSession(data.token, data.user);

        authMessage.textContent = "Login successful! Redirecting...";
        authMessage.className = "auth-message success";

        setTimeout(() => {
            window.location.href = "category.html";
        }, 600);

    } catch (error) {
        authMessage.textContent = error.message;
        authMessage.className = "auth-message error";
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
    }
});
