const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    userOtp: String
});

module.exports = mongoose.model('otp', otpSchema);