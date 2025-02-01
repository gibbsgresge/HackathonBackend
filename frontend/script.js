document.getElementById('searchInput').addEventListener('input', function() {
  const searchQuery = this.value.toLowerCase();
  const themeCards = document.querySelectorAll('.theme-pack');

  themeCards.forEach(card => {
    const cardText = card.querySelector('p').textContent.toLowerCase();
    if (cardText.includes(searchQuery)) {
      card.style.display = 'block'; // Show the card
    } else {
      card.style.display = 'none'; // Hide the card
    }
  });
});

document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = "login.html";
});