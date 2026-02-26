// Form switching
function showSignUp() {
    document.querySelector('.form-container').style.transform = 'translateX(0)';
}

function showLogin() {
    document.querySelector('.form-container').style.transform = 'translateX(-50%)';
}

// Dummy sign-up → just redirect
function goToHome() {
    alert("Sign Up successful! (This is a demo — no real account created)");
    window.location.href = "index.html";   // or "main.html" — choose your main page
}

// Real login
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.status === "success") {
            alert("Login successful!");
            window.location.href = "index.html";   // redirect to phishing scanner page
        } else {
            alert("Invalid email or password");
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("Cannot connect to server. Make sure Flask is running.");
    }
}