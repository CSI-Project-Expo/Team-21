function showLogin() {
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

function showSignUp() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}

function goToHome() {
    alert("Sign Up successful! (This is a demo — no real account created)");
    window.location.href = "index.html";
}

async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
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
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("Cannot connect to server. Make sure Flask is running.");
    }
}
