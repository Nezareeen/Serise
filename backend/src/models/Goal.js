const mongoose = require('mongoose');

const Goal = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  cadence: String,
  progress: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', Goal);
