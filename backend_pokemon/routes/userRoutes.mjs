//Imports
import express from 'express';
import dotenv from 'dotenv';
import User from '../models/UserSchema.mjs';

dotenv.config();

const router = express.Router()

//Create new user
router.post('/', async (req, res) => {
    try{

    let newUser = new User(req.body);

    await newUser.save();
    
    res.json(newUser)

    } catch(err){
        console.error(err)
        res.status(500).json({msg: `Server Error`})
    }
})

//Get all users
router.get('/', async (req, res) => {
    try {

        let allUsers = await User.find({})

        res.json(allUsers)

    }catch(err){
        console.error(err)
        res.status(500).json({msg: `Server Error`})
    }
})

//Edit user by id
router.put('/:id', async (req, res) => {
    try{

        let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        
        res.json(updatedUser)

    }catch(err){
        console.error(err)
        res.status(500).json({msg: `Server Error`})
    }
})

//Delete user by id
router.delete('/:id', async (req, res) => {
    try{
        let deletedUser = await User.findByIdAndDelete(req.params.id)

        res.json(deletedUser)

    } catch(err) {
        console.error(err)
        res.status(500).json({msg: `Server Error`})
    }
})

//Export router
export default router;