import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router()

router.get('/', (req, res) => {
    res.send(`Post Request`)
})

router.post('/', (req, res) => {
    res.send(`Post Request`)
})

router.put('/', (req, res) => {
    res.send(`Put Request`)
})

router.delete('/', (req, res) => {
    res.send(`Delete Request`)
})

export default router;