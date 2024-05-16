// controllers/authController.js
const User = require('../models/User');
const Commission = require('../models/Commission');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password,referredBy, amount} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    var user;
    var commissionUser;
    var commissionFirstUser;
    if(referredBy){
          const referrer = await User.findOne({ referralCode: referredBy });
          if(!referrer){
            res.json({
              status:404,
              message:"invalid refferal code!"
            })
          }

          user = new User({
            name,
            email,
            password: hashedPassword,
            referralCode: generateReferralCode(),
            referredBy: referredBy,
            referredLevel: referrer.referredLevel + 1,
            amount: amount  
          });

          commissionUser = new Commission({
            userId: referrer._id,
            percentage: 5,
            commissionAmount : amount * 5 / 100
          })
          if(referrer.referredLevel > 1){
            const referrerFirstLevel = await User.findOne({ referralCode: referrer.referredBy });
            commissionFirstUser = new Commission({
              userId: referrerFirstLevel._id,
              percentage: 2,
              commissionAmount : amount * 2 / 100
            })
          }
          // referrer.amount += commission.commissionAmount;

    }
    else{
     user = new User({
        name,
        email,
        password: hashedPassword,
        referralCode: generateReferralCode(),
        referredLevel: 1,
        amount: amount
      });
    }

    await user.save();
    if(commissionUser)
      await commissionUser.save();
    if(commissionFirstUser)
      await commissionFirstUser.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8);
};


module.exports = {
  register,
  login,
};
