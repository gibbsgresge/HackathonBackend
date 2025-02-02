const express = require("express");
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");
const ColorPack = require("../models/ColorPack"); // Ensure this is correctly imported


const router = express.Router();

/**
 * @route GET /api/users/me
 * @desc Get current user profile (including created & liked color packs)
 * @access Private
 */
router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .populate("createdColorPacks")
            .populate("likedColorPacks")
            .select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});

router.put("/like/:packId", verifyToken, async (req, res) => {
    try {
        console.log("🔹 Like API called");

        // Debug: Check if `req.user` exists
        if (!req.user) {
            console.error("❌ req.user is undefined!");
            return res.status(401).json({ message: "Unauthorized: No user data found." });
        }

        console.log("🔹 req.user:", req.user);

        const user = await User.findById(req.user.userId); // Ensure userId exists
        if (!user) {
            console.error("❌ User not found in database.");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("🔹 Found User:", user.username);

        const colorPack = await ColorPack.findById(req.params.packId);
        if (!colorPack) {
            console.error("❌ Color pack not found.");
            return res.status(404).json({ message: "Color pack not found" });
        }

        console.log("🔹 Found Color Pack:", colorPack.name);

        const isLiked = user.likedColorPacks.includes(req.params.packId);

        if (isLiked) {
            console.log("🔹 Removing like...");
            user.likedColorPacks = user.likedColorPacks.filter(id => id.toString() !== req.params.packId);
            colorPack.likes -= 1;
        } else {
            console.log("🔹 Adding like...");
            user.likedColorPacks.push(req.params.packId);
            colorPack.likes += 1;
        }

        await user.save();
        await colorPack.save();

        console.log("✅ Like operation successful");
        res.json({ liked: !isLiked, likes: colorPack.likes });

    } catch (error) {
        console.error("❌ Error toggling like:", error);
        res.status(500).json({ message: "Error toggling like", error: error.message });
    }
});


module.exports = router;
