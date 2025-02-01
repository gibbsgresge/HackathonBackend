document.addEventListener("DOMContentLoaded", async () => {
  const themeCardsContainer = document.getElementById("themeCards");

  try {
      // Fetch color packs from backend
      const response = await fetch("http://localhost:5000/api/colorpacks"); // Update URL if deployed
      const colorPacks = await response.json();

      // Clear existing theme packs
      themeCardsContainer.innerHTML = "";

      // Loop through color packs and generate HTML
      colorPacks.forEach(pack => {
          const themeCard = document.createElement("div");
          themeCard.className = "hover:scale-110 transition-transform duration-200 ease-in-out theme-pack p-4 bg-white rounded-lg shadow-lg cursor-pointer";
          themeCard.dataset.primary = pack.primary;
          themeCard.dataset.secondary = pack.secondary;
          themeCard.dataset.accent1 = pack.accent1;
          themeCard.dataset.accent2 = pack.accent2;

          // Add theme name
          themeCard.innerHTML = `
              <p>${pack.name}</p>
              <div class="mt-2 flex gap-2">
                  <div class="w-6 h-6 rounded" style="background-color: ${pack.primary};"></div>
                  <div class="w-6 h-6 rounded" style="background-color: ${pack.secondary};"></div>
                  <div class="w-6 h-6 rounded" style="background-color: ${pack.accent1};"></div>
                  <div class="w-6 h-6 rounded" style="background-color: ${pack.accent2};"></div>
              </div>
          `;

          // Add click event to change the theme when a card is clicked
          themeCard.addEventListener('click', () => {
              // Extract colors from the clicked theme card
              const primary = pack.primary;
              const secondary = pack.secondary;
              const accent1 = pack.accent1;
              const accent2 = pack.accent2;

              // Apply the colors dynamically
              document.documentElement.style.setProperty('--primary-color', primary);
              document.documentElement.style.setProperty('--secondary-color', secondary);
              document.documentElement.style.setProperty('--accent1-color', accent1);
              document.documentElement.style.setProperty('--accent2-color', accent2);

              // Update the website background and text colors
              document.body.style.backgroundColor = primary;
              document.body.style.color = secondary;

              // Optionally, change header and other elements' styles if needed
              const header = document.querySelector('header');
              if (header) {
                  header.style.backgroundColor = accent1;
              }
          });

          // Append to the container
          themeCardsContainer.appendChild(themeCard);
      });

  } catch (error) {
      console.error("Error fetching color packs:", error);
  }
});
