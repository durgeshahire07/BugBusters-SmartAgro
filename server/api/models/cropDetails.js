const mongoose = require("mongoose");

const cropSchema = mongoose.Schema({
    crop: String,
    seeds: Array,
    fertilizers: Array,
    pesticides: Array,
});

module.exports = mongoose.model('crop details', cropSchema)