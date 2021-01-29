const Crop = require("../models/cropDetails")

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
}