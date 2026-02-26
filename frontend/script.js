async function checkURL() {
    const urlInput = document.getElementById("urlInput")?.value?.trim();
    const resultDiv = document.getElementById("result");

    if (!urlInput) {
        alert("Please enter a URL");
        return;
    }

    if (!resultDiv) {
        console.error("CRITICAL: Element with id='result' NOT FOUND in the page");
        return;
    }

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

        const data = await response.json();

        if (data.result === "Phishing") {
            resultDiv.innerHTML = `
                ❌ PHISHING DETECTED!
                <small>Do NOT visit this site!</small>
            `;
            resultDiv.className = "danger";
        } else if (data.result === "Legitimate") {
            resultDiv.innerHTML = `
                ✅ Appears Legitimate
                <small>Stay cautious anyway!</small>
            `;
            resultDiv.className = "safe";
        } else {
            resultDiv.innerHTML = `⚠️ Unexpected response: ${JSON.stringify(data)}`;
            resultDiv.className = "warning";
        }

    } catch (err) {
        console.error("Fetch failed:", err);
        resultDiv.innerHTML = `
            ⚠️ Cannot connect to server
            <small>Make sure Flask is running on port 5000</small>
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