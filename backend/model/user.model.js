import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['host', 'admin'],
        default: 'host'
    }
},
{
    timestamps: true
});

export const SUser = model('User', userSchema);


