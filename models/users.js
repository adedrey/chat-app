/**
 * 
 *-------- USER SCHEMA -----------
 * 
 * Defines the user name, email, username, and passport
 * name: defines user's names
 * email: defines user's email
 * username: defines user's usernmae
 * hash and salt: used by passport
 * otp: otp for auth
 * otpExpiration: for auth
 * timestamp: defines created and updated time
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    },
    otp: String,
    otpExpirationTime: Date
}, { timestamps: true})

module.exports = mongoose.model('User', userSchema);