document.addEventListener("DOMContentLoaded", async () => {
  const themeCardsContainer = document.getElementById("themeCards");

  // Define the default theme colors
  const defaultColors = {
    primary: "#3498db",
    secondary: "#FFFFFF",
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
          themeCard.dataset.primary = pack.primary;
          themeCard.dataset.secondary = pack.secondary;
          themeCard.dataset.accent1 = pack.accent1;
          themeCard.dataset.accent2 = pack.accent2;
          themeCard.className = "hover:scale-110 transition-transform duration-200 ease-in-out theme-pack p-4 bg-white rounded-lg shadow-lg cursor-pointer";

          // Add theme name
          themeCard.innerHTML = `
            <p>${pack.name}</p>
            <div>Author</div>

            <div class="w-full h-px bg-gray-300 my-2"></div>
            
            <div class="justify-center mt-2 flex gap-2">
                <div class="relative group">
                    <div class="w-6 h-10 rounded-lg hover:scale-125 transition-transform duration-200 cursor-pointer" style="background-color: ${pack.primary};" onclick="copyToClipboard('${pack.primary}', this)"></div>
                    <span class="absolute left-6 -top-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        ${pack.primary}
                    </span>
                </div>
                <div class="relative group">
                    <div class="w-6 h-10 rounded-lg hover:scale-125 transition-transform duration-200 cursor-pointer" style="background-color: ${pack.secondary};" onclick="copyToClipboard('${pack.secondary}', this)"></div>
                    <span class="absolute left-6 -top-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        ${pack.secondary}
                    </span>
                </div>
                <div class="relative group">
                    <div class="w-6 h-10 rounded-lg hover:scale-125 transition-transform duration-200 cursor-pointer" style="background-color: ${pack.accent1};" onclick="copyToClipboard('${pack.accent1}', this)"></div>
                    <span class="absolute left-6 -top-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        ${pack.accent1}
                    </span>
                </div>
                <div class="relative group">
                    <div class="w-6 h-10 rounded-lg hover:scale-125 transition-transform duration-200 cursor-pointer" style="background-color: ${pack.accent2};" onclick="copyToClipboard('${pack.accent2}', this)"></div>
                    <span class="absolute left-6 -top-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        ${pack.accent2}
                    </span>
                </div>
            </div>

            <div class="flex items-center mt-3 justify-evenly w-full">
                <!-- Like Button -->
                <button class="flex justify-center items-center gap-2 text-gray-500 hover:text-yellow-400 transition duration-200 w-24 h-12 px-4 py-2 rounded-lg border border-transparent hover:border-yellow-400" onclick="handleLike(this)">
                    <i class="fas fa-star text-xl"></i>
                    <span class="text-sm font-bold" id="like-count">0</span>
                </button>
            
                <!-- Dislike Button -->
                <button class="flex items-center gap-2 text-gray-500 hover:text-red-400 transition duration-200 w-24 h-12 px-4 py-2 rounded-lg border border-transparent hover:border-red-400" onclick="handleDislike(this)">
                    <i class="fas fa-star-half-alt text-xl"></i>
                    <span class="text-sm font-bold" id="dislike-count">0</span>
                </button>
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

              sessionStorage.setItem('primary', primary);
              sessionStorage.setItem('secondary', secondary);
              sessionStorage.setItem('accent1', primary);
              sessionStorage.setItem('accent2', secondary);

                console.log("pr", primary);
                console.log("se", secondary);
                console.log("ac1", accent1);
                console.log("ac2", accent2);

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
