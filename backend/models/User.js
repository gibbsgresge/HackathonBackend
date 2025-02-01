const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  
  // List of ColorPacks the user has created
  createdColorPacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "ColorPack" }],

  // List of ColorPacks the user has liked
  likedColorPacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "ColorPack" }]
});

module.exports = mongoose.model("User", userSchema);
