document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");
  
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the form from refreshing the page
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "Login failed. Please try again.");
        }
  
        // Store the token in localStorage
        localStorage.setItem("token", data.token);
  
        // Redirect user to another page (e.g., dashboard.html)
        window.location.href = "index.html";
      } catch (error) {
        errorMessage.textContent = error.message;
      }
    });
  });
  