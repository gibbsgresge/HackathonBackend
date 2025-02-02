document.addEventListener("DOMContentLoaded", async () => {
    const themeCardsContainer = document.getElementById("themeCards");

    if (!themeCardsContainer) {
        console.error("❌ Error: #themeCards element not found in the DOM.");
        return;
    }

    // Define default theme colors
    const defaultColors = {
        primary: "#3498db",
        secondary: "#FFFFFF",
        accent1: "#e74c3c",
        accent2: "#e74c3c"
    };

    // Apply default theme
    const header = document.querySelector("header");
    if (header) header.style.backgroundColor = defaultColors.accent1;

    try {
        // Fetch color packs from the backend
        const response = await fetch("http://localhost:5000/api/colorpacks");
        const colorPacks = await response.json();

        // Clear existing theme packs
        themeCardsContainer.innerHTML = "";

        // Loop through color packs and generate HTML
        colorPacks.forEach(pack => {
            const themeCard = document.createElement("div");
            themeCard.className = "hover:scale-110 transition-transform duration-200 ease-in-out theme-pack p-4 bg-white rounded-lg shadow-lg cursor-pointer";
            themeCard.dataset.packId = pack._id;

            // Add theme name, author, and color swatches
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

                <div class="flex items-center mt-3 justify-evenly w-full">
                    <!-- Like Button -->
                    <div class="like-btn flex justify-center items-center gap-2 text-gray-500 hover:text-yellow-400 transition duration-200 w-24 h-12 px-4 py-2 rounded-lg border border-transparent"
                        data-pack-id="${pack._id}">
                        <i class="fas fa-star text-xl"></i>
                        <span class="text-sm font-bold">${pack.likes}</span>
                    </div>

                    <!-- Dislike Button -->
                    <div class="dislike-btn flex items-center gap-2 text-gray-500 hover:text-red-400 transition duration-200 w-24 h-12 px-4 py-2 rounded-lg border border-transparent"
                        data-pack-id="${pack._id}">
                        <i class="fas fa-star-half-alt text-xl"></i>
                        <span class="text-sm font-bold">${pack.dislikes}</span>
                    </div>
                </div>
            `;

            // Apply theme on click (except for like/dislike)
            themeCard.addEventListener("click", (event) => {
                if (!event.target.closest(".like-btn") && !event.target.closest(".dislike-btn")) {
                    applyTheme(pack);
                }
            });

            themeCardsContainer.appendChild(themeCard);
        });

        // Add reset functionality
        document.getElementById("reset").addEventListener("click", resetTheme);

    } catch (error) {
        console.error("❌ Error fetching color packs:", error);
    }
});

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
 * Apply selected color theme
 */
function applyTheme(pack) {
    document.documentElement.style.setProperty("--primary-color", pack.primary);
    document.documentElement.style.setProperty("--secondary-color", pack.secondary);
    document.documentElement.style.setProperty("--accent1-color", pack.accent1);
    document.documentElement.style.setProperty("--accent2-color", pack.accent2);

    sessionStorage.setItem("primary", pack.primary);
    sessionStorage.setItem("secondary", pack.secondary);
    sessionStorage.setItem("accent1", pack.accent1);
    sessionStorage.setItem("accent2", pack.accent2);

    console.log("🔹 Theme Applied:", pack.name);

    document.body.style.backgroundColor = pack.primary;
    document.body.style.color = pack.secondary;

    const header = document.querySelector("header");
    if (header) {
        header.style.backgroundColor = pack.accent1;
    }
}

/**
 * Reset theme to default
 */
function resetTheme() {
    document.documentElement.style.setProperty("--primary-color", "#3498db");
    document.documentElement.style.setProperty("--secondary-color", "#FFFFFF");
    document.documentElement.style.setProperty("--accent1-color", "#e74c3c");
    document.documentElement.style.setProperty("--accent2-color", "#e74c3c");

    document.body.style.backgroundColor = "#3498db";
    document.body.style.color = "#FFFFFF";

    const header = document.querySelector("header");
    if (header) {
        header.style.backgroundColor = "#e74c3c";
    }

    sessionStorage.clear();
    console.log("🔹 Theme Reset to Default");
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
    }).catch(err => console.error("❌ Failed to copy:", err));
}
