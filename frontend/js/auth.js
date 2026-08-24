/*
  auth.js
  Shared helper for the account / login system.
  Include this on every page AFTER the page's own nav markup exists,
  and it will:
    - Expose helper functions (getToken, getUser, logout, authFetch)
    - Auto-fill the "authArea" nav slot with Login/Register OR
      Welcome + History + Logout, depending on whether the user is
      logged in.

  Where does the API live?
  Change API_BASE_URL below if your backend runs somewhere other than
  http://localhost:5000
*/

const API_BASE_URL = "http://localhost:5000/api";

// Token / User Helpers 

function getToken() {
    return localStorage.getItem("authToken");
}

function getUser() {
    const raw = localStorage.getItem("authUser");
    return raw ? JSON.parse(raw) : null;
}

function saveSession(token, user) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));

    if (user && user.name) {
        localStorage.setItem("playerName", user.name);
    }
}

function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    window.location.href = "index.html";
}

async function authFetch(url, options = {}) {
    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, { ...options, headers });
}

//  Nav Rendering 

function renderAuthNav() {
    const slot = document.getElementById("authArea");
    if (!slot) return;

    const user = getUser();

    if (user) {
        slot.innerHTML = `
            <span class="auth-welcome">Hi, ${user.name}</span>
            <a href="history.html">History</a>
            <a href="#" id="logoutLink">Logout</a>
        `;
        const logoutLink = document.getElementById("logoutLink");
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault();
            logout();
        });
    } else {
        slot.innerHTML = `
            <a href="login.html">Login</a>
            <a href="register.html">Register</a>
        `;
    }
}

document.addEventListener("DOMContentLoaded", renderAuthNav);
