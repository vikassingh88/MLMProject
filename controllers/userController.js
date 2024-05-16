// controllers/userController.js
const User = require('../models/User');
const Commission = require('../models/Commission');

const getReferralTree = async (req, res) => {
  const {referralCode}=req.query
  try {
    
    const userRefferals = await User.find({referredBy:referralCode});
    res.send(userRefferals)
  
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getCommissions = async (req, res) => {
  const { userId } = req.query
  try {
    const commissions = await Commission.find({userId:userId });
    const totalCommissions = commissions.reduce((total, commission) => total + commission.commissionAmount, 0);
    res.send({ totalCommissions });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getReferralTree,
  getCommissions,
};
