import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
});

//Index users
UserSchema.index({user: 1});

export default mongoose.model('User', UserSchema);
