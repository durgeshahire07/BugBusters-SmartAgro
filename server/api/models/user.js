const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userEmailId: String,
    password: String,
    firstName: String,
    lastName: String,
    location: String,
});

module.exports = mongoose.model('users', userSchema)