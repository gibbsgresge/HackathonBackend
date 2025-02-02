document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"; // Redirect if not logged in
        return;
    }

    const likedColorPacksEl = document.getElementById("likedColorPacks");
    const logoutBtn = document.getElementById("logoutBtn");

    try {
        // Fetch user data
        const res = await fetch("http://localhost:5000/api/users/me", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch user data");
        const userData = await res.json();

        // Populate liked color packs
        likedColorPacksEl.innerHTML = userData.likedColorPacks.length
            ? ""
            : `<p class="text-gray-500">No liked color packs yet.</p>`;

        userData.likedColorPacks.forEach(pack => {
            const packElement = createColorPackElement(pack);
            likedColorPacksEl.appendChild(packElement);
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
