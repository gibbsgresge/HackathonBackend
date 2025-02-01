document.addEventListener("DOMContentLoaded", async () => {
  const themeCardsContainer = document.getElementById("themeCards");

  // Define the default theme colors
  const defaultColors = {
    primary: "#3498db",
    secondary: "#2ecc71",
    accent1: "#e74c3c",
    accent2: "#e74c3c"
  };
  const header = document.querySelector('header');
          if (header) {
              header.style.backgroundColor = defaultColors.accent1;
          }

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
              <div class="relative group">
                  <div class="w-6 h-6 rounded hover:scale-125 transition-transform duration-200 cursor-pointer" style="background-color: ${pack.primary};" onclick="copyToClipboard('${pack.primary}', this)"></div>
                  <span class="absolute left-6 -top-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      ${pack.primary}
                  </span>
              </div>
              <div class="relative group">
                  <div class="w-6 h-6 rounded hover:scale-125 transition-transform duration-200 cursor-pointer" style="background-color: ${pack.secondary};" onclick="copyToClipboard('${pack.secondary}', this)"></div>
                  <span class="absolute left-6 -top-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      ${pack.secondary}
                  </span>
              </div>
              <div class="relative group">
                  <div class="w-6 h-6 rounded hover:scale-125 transition-transform duration-200 cursor-pointer" style="background-color: ${pack.accent1};" onclick="copyToClipboard('${pack.accent1}', this)"></div>
                  <span class="absolute left-6 -top-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      ${pack.accent1}
                  </span>
              </div>
              <div class="relative group">
                  <div class="w-6 h-6 rounded hover:scale-125 transition-transform duration-200 cursor-pointer" style="background-color: ${pack.accent2};" onclick="copyToClipboard('${pack.accent2}', this)"></div>
                  <span class="absolute left-6 -top-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      ${pack.accent2}
                  </span>
              </div>
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

      // Add reset functionality
      document.getElementById("reset").addEventListener('click', () => {
          // Reset to default colors
          document.documentElement.style.setProperty('--primary-color', defaultColors.primary);
          document.documentElement.style.setProperty('--secondary-color', defaultColors.secondary);
          document.documentElement.style.setProperty('--accent1-color', defaultColors.accent1);
          document.documentElement.style.setProperty('--accent2-color', defaultColors.accent2);

          // Reset the body and header styles
          document.body.style.backgroundColor = defaultColors.primary;
          document.body.style.color = defaultColors.secondary;

          const header = document.querySelector('header');
          if (header) {
              header.style.backgroundColor = defaultColors.accent1;
          }
      });

  } catch (error) {
      console.error("Error fetching color packs:", error);
  }
});
