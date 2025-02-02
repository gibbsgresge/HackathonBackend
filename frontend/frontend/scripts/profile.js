document.addEventListener("DOMContentLoaded", async () => {
    // Retrieve color values from sessionStorage
    const primary = sessionStorage.getItem('primary');
    const secondary = sessionStorage.getItem('secondary');
    const accent1 = sessionStorage.getItem('accent1');
    const accent2 = sessionStorage.getItem('accent2');

    console.log("🔹 Theme Loaded:", { primary, secondary, accent1, accent2 });

    // Apply stored theme if available
    if (primary && secondary && accent1 && accent2) {
        document.documentElement.style.setProperty('--primary-color', primary);
        document.documentElement.style.setProperty('--secondary-color', secondary);
        document.documentElement.style.setProperty('--accent1-color', accent1);
        document.documentElement.style.setProperty('--accent2-color', accent2);

        document.body.style.backgroundColor = primary;
        document.body.style.color = secondary;
    }

    // Redirect if not logged in
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Get elements safely
    const totalCreationsEl = document.getElementById("totalCreations");
    const totalLikesEl = document.getElementById("totalLikes");
    const createdColorPacksEl = document.getElementById("createdColorPacks");
    const favoritedColorPacksEl = document.getElementById("likedColorPacks");
    const logoutBtn = document.getElementById("logoutBtn");

    console.log("🔹 Checking DOM Elements:");
    console.log("totalCreationsEl:", totalCreationsEl);
    console.log("totalLikesEl:", totalLikesEl);
    console.log("createdColorPacksEl:", createdColorPacksEl);
    console.log("favoritedColorPacksEl:", favoritedColorPacksEl);
    console.log("logoutBtn:", logoutBtn);

    // Prevent errors if elements are missing
    if (!totalCreationsEl || !totalLikesEl || !createdColorPacksEl || !favoritedColorPacksEl) {
        console.error("❌ One or more elements are missing in the HTML!");
        return;
    }

    try {
        // Fetch user data
        const res = await fetch("http://localhost:5000/api/users/me", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch user data");
        const userData = await res.json();

        console.log("🔹 Fetched User Data:", userData);

        // Update profile statistics
        totalCreationsEl.textContent = userData.createdColorPacks?.length || 0;
        totalLikesEl.textContent = userData.likedColorPacks?.length || 0;

        // Populate created color packs
        createdColorPacksEl.innerHTML = userData.createdColorPacks?.length
            ? ""
            : `<p class="text-gray-500">No creations found.</p>`;

        userData.createdColorPacks?.forEach(pack => {
            createdColorPacksEl.appendChild(createColorPackElement(pack));
        });

        // Populate favorited color packs
        favoritedColorPacksEl.innerHTML = userData.likedColorPacks?.length
            ? ""
            : `<p class="text-gray-500">No favorites yet.</p>`;

        userData.likedColorPacks?.forEach(pack => {
            favoritedColorPacksEl.appendChild(createColorPackElement(pack));
        });

    } catch (error) {
        console.error("❌ Error loading profile data:", error);
    }

    // Logout function
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "index.html";
        });
    }

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
