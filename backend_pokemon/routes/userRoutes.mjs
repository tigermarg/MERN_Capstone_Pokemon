//Imports
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import User from '../models/UserSchema.mjs';

dotenv.config();

const router = express.Router()

// @route:   POST api/users
// @desc:    Registering A User
// @access:  Public
router.post( '/',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
      //Run validation 'checks' on the request body
      const errors = validationResult(req);
  
      //If there are errors, respond with errors
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
  
      const { name, email, password } = req.body;
  
      try {
        //Check if user is in DB
        let user = await User.findOne({ email });
  
        //If user exists return with error message
        if (user) {
          return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
        }
  
        //Create a new User
        user = new User({
          name,
          email,
          password,
        });

        //Encrpyt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        //Save user
        await user.save();

        //Create payload (data for frontend)
        const payload = {
          user: {
            id: user.id,
          }
        };

        //jsonwebtoken
        jwt.sign(
          payload,
          process.env.jwtSecret,
          {expiresIn: 3600}, //Expires after 3600 miliseconds
          (err, token) => {//Handle errors or if successful completion, token
            if(err) throw err;

            res.json({token})
          }
        )
  
      } catch (err) {
        console.error(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
      }
    }
  );


//Export router
export default router;