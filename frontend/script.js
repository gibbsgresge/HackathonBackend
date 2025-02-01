// script.js

// Select all theme pack cards
const themePacks = document.querySelectorAll('.theme-pack');

// Loop through each pack and add a click event listener
themePacks.forEach(pack => {
  pack.addEventListener('click', () => {
    // Retrieve colors from data attributes
    const primary = pack.getAttribute('data-primary');
    const secondary = pack.getAttribute('data-secondary');
    const accent = pack.getAttribute('data-accent');

    // Update the CSS variables to change the theme
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    document.documentElement.style.setProperty('--accent-color', accent);
  });
});

document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = "login.html";
});