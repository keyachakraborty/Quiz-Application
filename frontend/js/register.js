
if (getToken()) {
    window.location.href = "category.html";
}

const registerForm = document.getElementById("registerForm");
const registerBtn = document.getElementById("registerBtn");
const authMessage = document.getElementById("authMessage");

registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    authMessage.textContent = "";
    authMessage.className = "auth-message";
    registerBtn.disabled = true;
    registerBtn.textContent = "Creating account...";

    try {
        const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
            throw new Error(registerData.message || "Registration failed");
        }

        const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
            authMessage.textContent = "Account created! Please log in.";
            authMessage.className = "auth-message success";
            setTimeout(() => (window.location.href = "login.html"), 800);
            return;
        }

        saveSession(loginData.token, loginData.user);

        authMessage.textContent = "Account created! Redirecting...";
        authMessage.className = "auth-message success";

        setTimeout(() => {
            window.location.href = "category.html";
        }, 600);

    } catch (error) {
        authMessage.textContent = error.message;
        authMessage.className = "auth-message error";
    } finally {
        registerBtn.disabled = false;
        registerBtn.textContent = "Create Account";
    }
});
