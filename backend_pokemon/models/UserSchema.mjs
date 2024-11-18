//Imports
import mongoose from 'mongoose';

//Create user schema
const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true, //validation
        unique: true,
        minLength: 5
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
UserSchema.index({user: 1});

//Export 'User' schema
export default mongoose.model('User', UserSchema);
