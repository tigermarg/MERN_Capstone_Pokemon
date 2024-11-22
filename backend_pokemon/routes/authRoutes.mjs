//Imports 
import express from 'express';
import auth from '../middlware/auth.mjs';
import User from '../models/UserSchema.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// @route:   GET api/auth
// @desc:    Auth route/Get user info if signed in
// @access:  Private
router.get('/', auth, async (req, res) => {
  try {
    //Find user by id, exclude password
    const user = await User.findById(req.user.id).select('-password'); 

    res.json(user); //Return user info

  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route:   POST api/auth
// @desc:    Login Route
// @access:  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password Required').not().isEmpty(),
  ],
  async (req, res) => {
    //Run validation 'checks' on the request body
    const errors = validationResult(req);

    //If there are errors, respond with errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      //Check if user is in DB
      let user = await User.findOne({ email });

      // If user does not exist, return error message
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //Check if password entered matches the users password, returns a bool
      const isMatch = await bcrypt.compare(password, user.password);

      //If passwords don't match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //Create payload (data for the front end)
      const payload = {
        user: {
          id: user.id,
        },
      };

      //jsonwebtoken
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 }, //Log out after 3600 milliseconds
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @route:   PUT api/auth
// @desc:    Update user info
// @access:  Private
router.put('/:id', auth, [
  check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }), //Validation 
], async (req, res) => {
  const errors = validationResult(req); //Run validation checks
  
  //Return validation errors if any
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  }

  const { password } = req.body; //Destructure password from req.body
  const userId = req.user.id; //Extract userId from authenticated user

  try {
    let user = await User.findById(userId); //Find user by id

    //If no user, return error message
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }

    //Update password if provided in the req.body
    if (password) {
      const salt = await bcrypt.genSalt(10); //Salt for password hashing
      user.password = await bcrypt.hash(password, salt); //Hash and update password
    }

    await user.save(); //Save the updated user to DB

    res.json({ msg: 'User updated successfully' }); //Return success message

  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] }); 
  }
});

// @route:   DELETE api/auth
// @desc:    Delete user account
// @access:  Private
router.delete('/:id', auth, async (req, res) => {

  //Get authenticated user id
  const userId = req.user.id; 

  try {
    //Find and delete the user by id
    let user = await User.findById(userId);

    //If no user found, error message
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }

    await User.deleteOne({ _id: userId }); //Delete user from DB

    res.json({ msg: 'User deleted successfully' }); //Return success message

  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

export default router;