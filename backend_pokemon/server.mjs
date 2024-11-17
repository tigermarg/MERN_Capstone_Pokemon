import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs'

dotenv.config();

//Initialize express into a variable
const app = express();
const PORT = 3000;

//Connect database
connectDB();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

//Routes
app.get('/', (req, res) => {
    res.send(`Get Request`)
})

//Define Routes
app.use('/users', userRoutes);

//Listen
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})