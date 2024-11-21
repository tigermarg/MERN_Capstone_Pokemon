//Imports
import express from 'express';
import dotenv from 'dotenv';
import User from '../models/UserSchema.mjs';
import { check, validationResult } from 'express-validator';

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
          return res
            .status(400)
            .json({ errors: [{ msg: 'User Already Exists' }] });
        }
  
        //Create a new User
        user = new User({
          name,
          email,
          password,
        });

        await user.save();
  
      } catch (err) {
        console.error(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
      }
    }
  );



// //Create new user
// router.post('/', async (req, res) => {
//     try{

//     let newUser = new User(req.body);

//     await newUser.save();
    
//     res.json(newUser)

//     } catch(err){
//         console.error(err)
//         res.status(500).json({msg: `Server Error`})
//     }
// })

// //Get all users
// router.get('/', async (req, res) => {
//     try {

//         let allUsers = await User.find({})

//         res.json(allUsers)

//     }catch(err){
//         console.error(err)
//         res.status(500).json({msg: `Server Error`})
//     }
// })

// //Get one user
// router.get('/:id', async (req, res) => {
//     try {

//         let user = await User.findById(req.params.id)

//         res.json(user)

//     }catch(err){
//         console.error(err)
//         res.status(500).json({msg: `Server Error`})
//     }
// })

// //Edit user by id
// router.put('/:id', async (req, res) => {
//     try{

//         let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        
//         res.json(updatedUser)

//     }catch(err){
//         console.error(err)
//         res.status(500).json({msg: `Server Error`})
//     }
// })

// //Delete user by id
// router.delete('/:id', async (req, res) => {
//     try{
//         let deletedUser = await User.findByIdAndDelete(req.params.id)

//         res.json(deletedUser)

//     } catch(err) {
//         console.error(err)
//         res.status(500).json({msg: `Server Error`})
//     }
// })

//Export router
export default router;