document.addEventListener("DOMContentLoaded", async () => {
    const themeCardsContainer = document.getElementById("themeCards");

    // Define the default theme colors
    const defaultColors = {
        primary: "#3498db",
        secondary: "#FFFFFF",
        accent1: "#e74c3c",
        accent2: "#e74c3c"
    };

    const header = document.querySelector("header");
    if (header) {
        header.style.backgroundColor = defaultColors.accent1;
    }

    try {
        // Fetch color packs from backend
        const response = await fetch("http://localhost:5000/api/colorpacks");
        const colorPacks = await response.json();

        // Clear existing theme packs
        themeCardsContainer.innerHTML = "";

        // Loop through color packs and generate HTML
        colorPacks.forEach(pack => {
            const themeCard = document.createElement("div");
            themeCard.dataset.packId = pack._id;
            themeCard.className = "hover:scale-110 transition-transform duration-200 ease-in-out theme-pack p-4 bg-white rounded-lg shadow-lg cursor-pointer";

            // Add theme name and author
            themeCard.innerHTML = `
                <p class="text-lg font-bold">${pack.name}</p>
                <p class="text-sm text-gray-500">By: ${pack.author || "Anonymous"}</p>

                <div class="w-full h-px bg-gray-300 my-2"></div>

                <!-- Color Preview -->
                <div class="justify-center mt-2 flex gap-2">
                    ${createColorSwatch(pack.primary)}
                    ${createColorSwatch(pack.secondary)}
                    ${createColorSwatch(pack.accent1)}
                    ${createColorSwatch(pack.accent2)}
                </div>

                <div class="flex items-center justify-between mt-3">
                    <button class="like-btn flex items-center gap-1 text-gray-500 hover:text-yellow-400 transition duration-200" data-pack-id="${pack._id}">
                        <i class="fas fa-star"></i>
                        <span class="text-sm font-bold">${pack.likes}</span>
                    </button>

                    <button class="dislike-btn flex items-center gap-1 text-gray-500 hover:text-red-400 transition duration-200" data-pack-id="${pack._id}">
                        <i class="fas fa-star-half-alt"></i>
                        <span class="text-sm font-bold">${pack.dislikes}</span>
                    </button>
                </div>
            `;

            // Apply the theme when clicking the card (except on like/dislike buttons)
            themeCard.addEventListener("click", (event) => {
                if (!event.target.closest(".like-btn") && !event.target.closest(".dislike-btn")) {
                    applyTheme(pack);
                }
            });

            themeCardsContainer.appendChild(themeCard);
        });

    } catch (error) {
        console.error("Error fetching color packs:", error);
    }
});

/**
 * Apply selected color theme
 */
function applyTheme(pack) {
    document.documentElement.style.setProperty("--primary-color", pack.primary);
    document.documentElement.style.setProperty("--secondary-color", pack.secondary);
    document.documentElement.style.setProperty("--accent1-color", pack.accent1);
    document.documentElement.style.setProperty("--accent2-color", pack.accent2);

    document.body.style.backgroundColor = pack.primary;
    document.body.style.color = pack.secondary;

    const header = document.querySelector("header");
    if (header) {
        header.style.backgroundColor = pack.accent1;
    }
}

/**
 * Create a color swatch div
 */
function createColorSwatch(color) {
    return `
        <div class="relative group">
            <div class="w-6 h-10 rounded-lg hover:scale-125 transition-transform duration-200 cursor-pointer"
                 style="background-color: ${color};"
                 onclick="copyToClipboard('${color}', this)">
            </div>
            <span class="absolute left-6 -top-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ${color}
            </span>
        </div>
    `;
}

/**
 * Copy color to clipboard
 */
function copyToClipboard(color, element) {
    navigator.clipboard.writeText(color).then(() => {
        const tooltip = element.nextElementSibling;
        tooltip.innerText = "Copied!";
        tooltip.classList.remove("opacity-0");

        setTimeout(() => {
            tooltip.innerText = color;
            tooltip.classList.add("opacity-0");
        }, 400);
    }).catch(err => console.error("Failed to copy:", err));
}
