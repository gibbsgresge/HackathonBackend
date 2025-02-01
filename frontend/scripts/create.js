document.addEventListener("DOMContentLoaded", () => {
    const colorWheel = document.getElementById("colorWheel");
    const verifyButton = document.getElementById("verifyButton");
    const packNameInput = document.getElementById("packName");
    const saveButton = document.getElementById("saveButton");
    const clearButton = document.getElementById("clearButton");
    const goBackButton = document.getElementById("goBackButton");
    const selectedSlotText = document.getElementById("selectedSlotText");

    const colorBoxes = document.querySelectorAll(".color-box");

    let selectedSlot = null;
    let selectedColors = {
        primary: "",
        secondary: "",
        accent1: "",
        accent2: ""
    };

    // Function to reset highlight from all boxes
    function resetHighlights() {
        colorBoxes.forEach(box => box.classList.remove("selected"));
    }

    // Make color boxes clickable
    colorBoxes.forEach(box => {
        box.addEventListener("click", () => {
            resetHighlights();
            box.classList.add("selected"); // Highlight the selected box
            selectedSlot = box.getAttribute("data-slot");
            selectedSlotText.textContent = `Selected: ${selectedSlot}`;
            verifyButton.disabled = false; // Enable color confirmation
        });
    });

    // When user clicks "Select Color"
    verifyButton.addEventListener("click", () => {
        if (!selectedSlot) {
            alert("Please select a color slot first.");
            return;
        }

        const selectedColor = colorWheel.value;
        selectedColors[selectedSlot] = selectedColor;
        document.getElementById(`${selectedSlot}Box`).style.backgroundColor = selectedColor;

        // Reset selection after confirming color
        resetHighlights();
        selectedSlotText.textContent = "Click a box to select a color";
        selectedSlot = null;
        verifyButton.disabled = true;
    });

    // Clear selected colors
    clearButton.addEventListener("click", () => {
        selectedColors = { primary: "", secondary: "", accent1: "", accent2: "" };
        colorBoxes.forEach(box => {
            box.style.backgroundColor = "#ddd";
            box.classList.remove("selected");
        });
        selectedSlotText.textContent = "Click a box to select a color";
    });

    // Go back to the previous page
    goBackButton.addEventListener("click", () => {
        window.history.back();
    });

    // Save the color pack
    saveButton.addEventListener("click", async () => {
        const packName = packNameInput.value.trim();

        if (!packName || Object.values(selectedColors).includes("")) {
            alert("Please enter a name and set all colors.");
            return;
        }

        const colorPack = {
            name: packName,
            primary: selectedColors.primary,
            secondary: selectedColors.secondary,
            accent1: selectedColors.accent1,
            accent2: selectedColors.accent2,
        };

        try {
            const response = await fetch("http://localhost:5000/api/colorpacks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(colorPack),
            });

            if (!response.ok) throw new Error("Failed to save color pack");

            alert("Color pack saved successfully!");
            window.location.href = "index.html";
        } catch (error) {
            alert(error.message);
        }
    });
});
