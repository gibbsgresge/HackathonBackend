document.addEventListener("DOMContentLoaded", async () => {
        // Retrieve color values from sessionStorage
        const primary = sessionStorage.getItem('primary');
        const secondary = sessionStorage.getItem('secondary');
        const accent1 = sessionStorage.getItem('accent1');
        const accent2 = sessionStorage.getItem('accent2');
        console.log("pr", primary);
        console.log("se", secondary);
        console.log("ac1", accent1);
        console.log("ac2", accent2);

      
        // If all color values exist in sessionStorage, apply them
        if (primary && secondary && accent1 && accent2) {
          document.documentElement.style.setProperty('--primary-color', primary);
          document.documentElement.style.setProperty('--secondary-color', secondary);
          document.documentElement.style.setProperty('--accent1-color', accent1);
          document.documentElement.style.setProperty('--accent2-color', accent2);
      
          // Optionally, apply them to the body or other elements
          document.body.style.backgroundColor = primary;
          document.body.style.color = secondary;
        }

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"; // Redirect if not logged in
        return;
    }

    const totalCreationsEl = document.getElementById("totalCreations");
    const totalLikesEl = document.getElementById("totalLikes");
    const totalDislikesEl = document.getElementById("totalDislikes");
    const createdColorPacksEl = document.getElementById("createdColorPacks");
    const favoritedColorPacksEl = document.getElementById("favoritedColorPacks");
    const logoutBtn = document.getElementById("logoutBtn");

    try {
        // Fetch user data
        const res = await fetch("http://localhost:5000/api/users/me", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch user data");
        const userData = await res.json();

        // Update profile statistics
        totalCreationsEl.textContent = userData.createdColorPacks.length;
        totalLikesEl.textContent = userData.likedColorPacks.length; // Placeholder for organic likes
        totalDislikesEl.textContent = "0"; // Placeholder for dislikes (needs backend support)

        // Populate created color packs
        createdColorPacksEl.innerHTML = userData.createdColorPacks.length
            ? ""
            : `<p class="text-gray-500">No creations found.</p>`;

        userData.createdColorPacks.forEach(pack => {
            const packElement = createColorPackElement(pack);
            createdColorPacksEl.appendChild(packElement);
        });

        // Populate favorited color packs
        favoritedColorPacksEl.innerHTML = userData.likedColorPacks.length
            ? ""
            : `<p class="text-gray-500">No favorites yet.</p>`;

        userData.likedColorPacks.forEach(pack => {
            const packElement = createColorPackElement(pack);
            favoritedColorPacksEl.appendChild(packElement);
        });

    } catch (error) {
        console.error("Error loading profile data:", error);
    }

    // Logout function
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    // Function to create color pack elements
    function createColorPackElement(pack) {
        const div = document.createElement("div");
        div.className = "p-4 bg-gray-200 rounded-lg shadow";

        div.innerHTML = `
            <h3 class="text-lg font-bold">${pack.name}</h3>
            <div class="flex gap-2 mt-2">
                <div class="w-6 h-6 rounded" style="background: ${pack.primary};"></div>
                <div class="w-6 h-6 rounded" style="background: ${pack.secondary};"></div>
                <div class="w-6 h-6 rounded" style="background: ${pack.accent1};"></div>
                <div class="w-6 h-6 rounded" style="background: ${pack.accent2};"></div>
            </div>
        `;

        return div;
    }
});
