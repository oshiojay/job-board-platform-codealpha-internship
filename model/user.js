const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["employer", "candidate", "admin"],
        default: "candidate"
    },
    password: {
        type: String,
        required: true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
        trim:true
    },
    otpExpire:{
        type: Date,
        default: ()=>{
            return Date.now() + (1000*60*5)
        }
    }
}, {timestamps: true})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;