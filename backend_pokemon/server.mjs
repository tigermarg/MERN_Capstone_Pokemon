import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

//Initialize express into a variable
const app = express();
const PORT = 3000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

//Routes
app.get('/', (req, res) => {
    res.send(`Get Request`)
})

//Listen
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})