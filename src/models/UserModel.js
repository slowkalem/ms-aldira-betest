const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    identityNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;