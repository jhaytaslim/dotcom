import mongoose from "mongoose";

const User = mongoose.model('Users', userSchema)

const userSchema = new mongoose.Schema({
  
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    referrerID: {
        type: String,
        required: true
    },
    // firstName: {
    //     type: String,
    //     required: true
    // },
})