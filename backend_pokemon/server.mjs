//Imports 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
import morgan from 'morgan';

//Setups
const app = express();  //Initialize express into a variable
dotenv.config();
let PORT = process.env.PORT || 3001;

//Connect database
connectDB();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

//Routes
app.get('/', (req, res) => {
    res.send(`Get Request`)
})

//Define Routes
app.use('/api/users', userRoutes);

//Listen
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})