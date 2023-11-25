import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        trim: true

    },
    name: {
        type: String,

    },
    image: { type: String, },
    role: { type: String },
    credit: { type: Number, default: 0 },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,

        ref: 'Post'
    }],


}, { timestamps: true })





const User = mongoose.model('User', userSchema);
export default User

