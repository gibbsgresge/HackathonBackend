const express = require("express");
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

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

module.exports = router;
