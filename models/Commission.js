
const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  percentage: Number,
  commissionAmount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Commission', commissionSchema);
