console.log("interactionHandler.js loaded"); // Debugging

document.addEventListener("click", async (event) => {
    // Check if a like button was clicked
    if (event.target.closest(".like-btn")) {
        event.stopPropagation();
        const button = event.target.closest(".like-btn");
        await handleLike(button);
    }

    // Check if a dislike button was clicked
    if (event.target.closest(".dislike-btn")) {
        event.stopPropagation();
        const button = event.target.closest(".dislike-btn");
        await handleDislike(button);
    }
});

/**
 * Handle like button click
 */
async function handleLike(button) {
    try {
        console.log("Like button clicked"); // Debugging

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to like a color pack.");
            return;
        }

        const packId = button.getAttribute("data-pack-id");
        if (!packId) {
            console.error("Error: packId is missing!");
            return;
        }

        const res = await fetch(`http://localhost:5000/api/users/like/${packId}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to like");

        console.log("Updated like count:", data.likes); // Debugging
        button.querySelector("span").textContent = data.likes;
        button.classList.toggle("text-yellow-400", data.liked);

    } catch (error) {
        console.error("Error liking pack:", error);
    }
}

/**
 * Handle dislike button click
 */
async function handleDislike(button) {
    try {
        console.log("Dislike button clicked"); // Debugging

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to dislike a color pack.");
            return;
        }

        const packId = button.getAttribute("data-pack-id");
        if (!packId) {
            console.error("Error: packId is missing!");
            return;
        }

        const res = await fetch(`http://localhost:5000/api/colorpacks/dislike/${packId}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to dislike");

        console.log("Updated dislike count:", data.dislikes); // Debugging
        button.querySelector("span").textContent = data.dislikes;
        button.classList.toggle("text-red-400", data.disliked);

    } catch (error) {
        console.error("Error disliking pack:", error);
    }
}
