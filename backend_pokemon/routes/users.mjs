import express from 'express';
import dotenv from 'dotenv';
import User from '../models/UserSchema.mjs';

dotenv.config();

const router = express.Router()

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

router.put('/', (req, res) => {
    res.send(`Put Request`)
})

router.delete('/', (req, res) => {
    res.send(`Delete Request`)
})

export default router;