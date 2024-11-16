const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: [String],
});

module.exports = mongoose.model('Car', CarSchema);
