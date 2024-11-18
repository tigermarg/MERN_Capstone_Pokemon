//Imports
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//Set connection to mongURI (env file)
const db = process.env.mongoURI;

//DB connection with error handling
const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log(`Mongo DB connected...`)
    } catch(err) {
        console.error(err);

        process.exit(1);
    }
}

//Export DB connection
export default connectDB;