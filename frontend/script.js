async function checkURL() {
    // 🔒 Auth check
    if (!sessionStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
        return;
    }

    const urlInput = document.getElementById("urlInput")?.value?.trim();
    const resultDiv = document.getElementById("result");

    if (!urlInput) {
        alert("Please enter a URL to scan.");
        return;
    }

    if (!resultDiv) return;

    // Show scanning state
    resultDiv.innerHTML = "🔍 Scanning...";
    resultDiv.className = "scanning";
    resultDiv.style.display = "block";

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: urlInput })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        if (data.result === "Phishing") {
            resultDiv.innerHTML = `
                ❌ PHISHING DETECTED!
                <small>Do NOT visit this site — it may steal your data!</small>
            `;
            resultDiv.className = "danger";
        } else if (data.result === "Legitimate") {
            resultDiv.innerHTML = `
                ✅ Appears Legitimate
                <small>Stay cautious — always double-check the domain.</small>
            `;
            resultDiv.className = "safe";
        } else if (data.error) {
            resultDiv.innerHTML = `⚠️ ${data.error}`;
            resultDiv.className = "warning";
        } else {
            resultDiv.innerHTML = `⚠️ Unexpected response from server.`;
            resultDiv.className = "warning";
        }

    } catch (err) {
        console.error("Fetch failed:", err);
        resultDiv.innerHTML = `
            ⚠️ Cannot connect to server
            <small>Make sure the Flask backend is running on port 5000</small>
        `;
        resultDiv.className = "warning";
    }
}

// Allow pressing Enter to scan
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("urlInput");
    if (input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") checkURL();
        });
    }
});