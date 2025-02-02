async function handleLike(button) {
    try {
        console.log("Like button clicked");

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

        console.log("Updated like count:", data.likes);

        // Update the button UI
        button.querySelector("span").textContent = data.likes;
        button.classList.toggle("text-yellow-400", data.liked);

        // Update localStorage to persist liked state
        let likedPacks = JSON.parse(localStorage.getItem("likedPacks")) || [];
        
        if (data.liked) {
            likedPacks.push(packId);
        } else {
            likedPacks = likedPacks.filter(id => id !== packId);
        }

        localStorage.setItem("likedPacks", JSON.stringify(likedPacks));

    } catch (error) {
        console.error("Error liking pack:", error);
    }
}
