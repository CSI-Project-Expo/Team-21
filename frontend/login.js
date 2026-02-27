function showLogin() {
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

function showSignUp() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}

async function signUp() {
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!username || !email || !password) {
        showMessage("signupMsg", "Please fill in all fields.", "error");
        return;
    }

    // Demo: store user in localStorage
    localStorage.setItem("user_" + email, JSON.stringify({ username, email, password }));
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", username);

    showMessage("signupMsg", "Account created! Redirecting...", "success");
    setTimeout(() => { window.location.href = "index.html"; }, 800);
}

async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        showMessage("loginMsg", "Please enter email and password.", "error");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.status === "success") {
            // Retrieve stored username if available
            const stored = JSON.parse(localStorage.getItem("user_" + email) || "{}");
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("username", stored.username || email);
            window.location.href = "index.html";
        } else {
            showMessage("loginMsg", "Invalid email or password.", "error");
        }

    } catch (error) {
        console.error("Login error:", error);
        showMessage("loginMsg", "Cannot connect to server. Make sure Flask is running.", "error");
    }
}

function showMessage(elementId, message, type) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.style.color = type === "error" ? "#ff6b6b" : "#81f07b";
    el.style.marginTop = "12px";
    el.style.fontSize = "0.88rem";
}