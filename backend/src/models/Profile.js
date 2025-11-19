const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  strengths: [String],
  triggers: [String]
});

module.exports = mongoose.model('Profile', Profile);
