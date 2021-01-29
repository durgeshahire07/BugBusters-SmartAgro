const Crop = require("../models/cropDetails")
const Planner = require("../models/plannerSchema")
const userPlan = require("../models/plan")

module.exports = {
    saveCrop: async (data) => {
        const result = await Crop.create({
            crop: data.crop,
            seeds: data.seeds,
            fertilizers: data.fertilizers,
            pesticides: data.pesticides,
        })
        return result
    },
    savePlan: async (data) => {
        const result = await Planner.create({
            crop: data.crop,
            plan: data.plan
        })
        return result
    },
    getcropDetails: async (data) => {
        const result = await Crop.findOne(data);
        return result
    },
    getCrops: (imgName) => {
        const spawn = require("child_process").spawn;
        const subProcess = spawn("python", ["model_classify.py", imgName.toString()]);
        subProcess.stdout.on('data', function(data) {
            console.log(data.toString());
            return data.toString();
        });
        subProcess.stderr.on('data', function(data) {
            console.log(data.toString());
            return data.toString();
        })
    },
    savep: async (data) => {
        const result = await userPlan.create({
            userID: data.userID,
            crop: data.crop
        });
        return result;
    },
    getl: async (data) => {
        const result = await userPlan.find(data);
        return result;
    },
    getp: async (data) => {
        const result = {
            cropinfo: await Crop.findOne({
                crop: data.crop
            }),
            cropPlan: await Planner.findOne({
                crop: data.crop
            })
        }
        return result
    }
}