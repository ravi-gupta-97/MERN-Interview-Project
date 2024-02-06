import mongoose from 'mongoose';


const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date
    }

},
    {
        timestamps: true
    });

export default mongoose.model('User', userSchema);