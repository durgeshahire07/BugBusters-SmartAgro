const mongoose = require("mongoose");

const cropPlannerSchema = mongoose.Schema({
    crop: String,
    plan: Array,
});

module.exports = mongoose.model('cropPlans', cropPlannerSchema)