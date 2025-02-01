document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    //this checks to see if the user is logged in. 
    if (!token) {
      window.location.href = "login.html"; // Redirect back to login if no token
    }
  });
  