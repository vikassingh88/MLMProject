// routes/user.js
const express = require('express');
const { getReferralTree, getCommissions } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/referral-tree', auth, getReferralTree);
router.get('/commissions', auth, getCommissions);

module.exports = router;
