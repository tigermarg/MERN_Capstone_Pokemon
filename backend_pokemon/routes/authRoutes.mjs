import express from 'express';
import auth from '../middlware/auth.mjs';
import User from '../models/UserSchema.mjs';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// @route:   GET api/auth
// @desc:    Auth route/Get user info if signed in
// @access:  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});


export default router;