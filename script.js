document.addEventListener("DOMContentLoaded", function() {

    const formContainer = document.querySelector(".form-container");

    function showLogin() {
        formContainer.style.transform = "translateX(-50%)";
    }

    function showSignUp() {
        formContainer.style.transform = "translateX(0%)";
    }

    function goToHome() {
        window.location.href = "index.html";
    }

    // Make functions global
    window.showLogin = showLogin;
    window.showSignUp = showSignUp;
    window.goToHome = goToHome;

});
function login() {
    // simple validation example
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email !== "" && password !== "") {
        window.location.href = "url.html"; 
    } else {
        alert("Please enter email and password");
    }
    window.location.href = "index.html";
}
function login() {
    window.location.href = "index.html";
}

function goToHome() {
    window.location.href = "index.html";
}

