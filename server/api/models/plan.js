const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
    userID: mongoose.Types.ObjectId,
    crop: String,
});

module.exports = mongoose.model('user plans', planSchema)