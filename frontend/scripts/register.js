document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const errorMessage = document.getElementById("errorMessage");
  
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent page reload
  
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      // Check if passwords match
      if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "Sign-up failed. Please try again.");
        }
  
        alert("Account created successfully! Redirecting to login...");
        window.location.href = "login.html"; // Redirect to login page
      } catch (error) {
        errorMessage.textContent = error.message;
      }
    });
  });
  