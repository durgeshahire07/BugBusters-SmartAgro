const User = require("../models/user");
const Otp = require("../models/otpSchema");
var mongoose = require('mongoose');
const {
    findByIdAndUpdate
} = require("../models/user");


module.exports = {
    generateOtp: () => {
        const otp = Math.floor(1000 + Math.random() * 9000);
        return otp
    },
    checkUserExist: async (email) => {
        const user = await User.findOne({
            userEmailId: email
        })
        return user
    },
    saveOtp: async (id, otp) => {
        const userId = mongoose.Types.ObjectId(id);
        const result = await Otp.create({
            userId,
            userOtp: otp
        })
        return result
    },
    checkOtp: async (id, otp) => {
        const userId = mongoose.Types.ObjectId(id);
        const result = await Otp.findOne({
            userId,
            userOtp: otp
        })
        return result
    },
}