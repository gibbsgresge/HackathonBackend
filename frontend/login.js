document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // TODO: rewrite and test this code
    try {
        const response = await fetch("", { // Change URL to the DB endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            // Login successful, redirect to homepage or dashboard
            window.location.href = "index.html";
        } else {
            // Show error message
            document.getElementById("errorMessage").innerText = data.message || "Invalid credentials.";
        }
    } catch (error) {
        console.error("Login error:", error);
        document.getElementById("errorMessage").innerText = "Something went wrong. Please try again.";
    }
});