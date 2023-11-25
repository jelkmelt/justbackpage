import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const adminSchema = new Schema({
    email: {
        type: String,
        trim: true

    },
    password: {
        type: String,

    },
    role: { type: String, default: "Admin" },

    



}, { timestamps: true })





const Admin = mongoose.model('Admin', adminSchema);
export default Admin

