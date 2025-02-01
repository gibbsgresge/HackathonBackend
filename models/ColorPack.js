const mongoose = require('mongoose');

const colorPackSchema = new mongoose.Schema({
  name: { type: String, required: true },         // e.g., "Cool Blues" or "Warm Hues"
  primary: { type: String, required: true },        // e.g., "#3498db"
  secondary: { type: String, required: true },      // e.g., "#2ecc71"
  accent1: { type: String, required: true },        // e.g., "#e74c3c"
  accent2: { type: String, required: true },        // e.g., "#f1c40f"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ColorPack', colorPackSchema);
