//Imports
import mongoose from 'mongoose';

//Create user schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //validation
    },
    email: {
        type: String,
        required: true, //validation
        unique: true,
    },
    password: {
        type: String,
        required: true, //validation
        minLength: 6
    },
});

//Index users
UserSchema.index({email: 1});

//Export 'User' schema
export default mongoose.model('User', UserSchema);