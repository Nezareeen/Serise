const mongoose = require('mongoose');

const OverthinkingEntry = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  thought: String,
  aiResponse: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OverthinkingEntry', OverthinkingEntry);
