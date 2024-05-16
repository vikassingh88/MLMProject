
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  referralCode: { type: String, unique: true },
  referredBy: String,
  referredLevel:{type:Number},
  amount: {type:Number},
  // directReferrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
