document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("nav-links");

  function updateNavbar() {
      const token = localStorage.getItem("token");

      if (token) {
          // User is logged in
          navLinks.innerHTML = `
              <li><button id="profileBtn" class="px-4 py-2 rounded-lg font-bold">Profile</button></li>
              <li><button id="logoutBtn" class="px-4 py-2 rounded-lg font-bold">Logout</button></li>
          `;

          document.getElementById("profileBtn").addEventListener("click", () => {
              window.location.href = "profile.html";
          });

          document.getElementById("logoutBtn").addEventListener("click", () => {
              localStorage.removeItem("token");
              updateNavbar(); // Refresh UI
          });

      } else {
          // User is logged out
          navLinks.innerHTML = `
              <li><button id="loginBtn" class="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-200">Login</button></li>
              <li><button id="signupBtn" class="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-200">Sign Up</button></li>
          `;

          document.getElementById("loginBtn").addEventListener("click", () => {
              window.location.href = "login.html";
          });

          document.getElementById("signupBtn").addEventListener("click", () => {
              window.location.href = "signup.html";
          });
      }
  }

  updateNavbar(); // Run on page load
});
