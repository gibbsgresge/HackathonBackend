// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ColorPack = require('./models/ColorPack');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow cross-origin requests if your frontend is hosted elsewhere

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Endpoints

// GET all color packs
app.get('/api/colorpacks', async (req, res) => {
  try {
    const colorPacks = await ColorPack.find();
    res.json(colorPacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// (Optional) GET a specific color pack by id
app.get('/api/colorpacks/:id', async (req, res) => {
  try {
    const pack = await ColorPack.findById(req.params.id);
    if (!pack) return res.status(404).json({ message: 'Color pack not found' });
    res.json(pack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new color pack (admin use)
app.post('/api/colorpacks', async (req, res) => {
  // In a real-world scenario, you’d include authentication here to verify admin status.
  const { name, primary, secondary, accent1, accent2 } = req.body;
  const newPack = new ColorPack({ name, primary, secondary, accent1, accent2 });
  try {
    const savedPack = await newPack.save();
    res.status(201).json(savedPack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update an existing color pack (admin use)
app.put('/api/colorpacks/:id', async (req, res) => {
  // Authentication should also be added here for admin-only access.
  try {
    const updatedPack = await ColorPack.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPack) return res.status(404).json({ message: 'Color pack not found' });
    res.json(updatedPack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a color pack (admin use)
app.delete('/api/colorpacks/:id', async (req, res) => {
  // Admin authentication should be implemented in a production app.
  try {
    const deletedPack = await ColorPack.findByIdAndDelete(req.params.id);
    if (!deletedPack) return res.status(404).json({ message: 'Color pack not found' });
    res.json({ message: 'Color pack deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
