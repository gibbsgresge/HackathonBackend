const express = require("express");
const ColorPack = require("../models/ColorPack");
const { verifyToken } = require("../middleware/authMiddleware"); // Ensure authentication

const router = express.Router();

/**
 * @route GET /api/colorpacks
 * @desc Fetch all color packs
 * @access Public
 */
router.get("/", async (req, res) => {
    try {
        const colorPacks = await ColorPack.find();
        res.json(colorPacks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching color packs", error });
    }
});

/**
 * @route POST /api/colorpacks
 * @desc Create a new color pack
 * @access Private (requires authentication)
 */
router.post("/", verifyToken, async (req, res) => {
    try {
        const { name, primary, secondary, accent1, accent2 } = req.body;

        const newColorPack = new ColorPack({
            name,
            primary,
            secondary,
            accent1,
            accent2,
            createdBy: req.user.userId // Store user ID of creator
        });

        const savedColorPack = await newColorPack.save();
        res.status(201).json(savedColorPack);
    } catch (error) {
        res.status(500).json({ message: "Error creating color pack", error });
    }
});

/**
 * @route PUT /api/colorpacks/:id
 * @desc Update a color pack
 * @access Private (only the creator can update)
 */
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const { name, primary, secondary, accent1, accent2 } = req.body;
        const colorPack = await ColorPack.findById(req.params.id);

        if (!colorPack) return res.status(404).json({ message: "Color pack not found" });

        // Ensure the logged-in user is the creator of the color pack
        if (colorPack.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized to update this color pack" });
        }

        // Update fields if provided
        colorPack.name = name || colorPack.name;
        colorPack.primary = primary || colorPack.primary;
        colorPack.secondary = secondary || colorPack.secondary;
        colorPack.accent1 = accent1 || colorPack.accent1;
        colorPack.accent2 = accent2 || colorPack.accent2;

        const updatedColorPack = await colorPack.save();
        res.json(updatedColorPack);
    } catch (error) {
        res.status(500).json({ message: "Error updating color pack", error });
    }
});

/**
 * @route DELETE /api/colorpacks/:id
 * @desc Delete a color pack
 * @access Private (only the creator can delete)
 */
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const colorPack = await ColorPack.findById(req.params.id);

        if (!colorPack) return res.status(404).json({ message: "Color pack not found" });

        // Ensure only the creator can delete the color pack
        if (colorPack.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized to delete this color pack" });
        }

        await colorPack.deleteOne();
        res.json({ message: "Color pack deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting color pack", error });
    }
});



/**
 * @route PUT /api/colorpacks/like/:id
 * @desc Increase like count for a color pack
 * @access Private (requires authentication)
 */
router.put("/like/:id", verifyToken, async (req, res) => {
    try {
        const colorPack = await ColorPack.findById(req.params.id);
        if (!colorPack) return res.status(404).json({ message: "Color pack not found" });

        colorPack.likes += 1;
        await colorPack.save();

        res.json({ message: "Color pack liked", likes: colorPack.likes });
    } catch (error) {
        res.status(500).json({ message: "Error liking color pack", error });
    }
});

/**
 * @route PUT /api/colorpacks/dislike/:id
 * @desc Increase dislike count for a color pack
 * @access Private (requires authentication)
 */
router.put("/dislike/:id", verifyToken, async (req, res) => {
    try {
        const colorPack = await ColorPack.findById(req.params.id);
        if (!colorPack) return res.status(404).json({ message: "Color pack not found" });

        colorPack.dislikes += 1;
        await colorPack.save();

        res.json({ message: "Color pack disliked", dislikes: colorPack.dislikes });
    } catch (error) {
        res.status(500).json({ message: "Error disliking color pack", error });
    }
});


module.exports = router;
