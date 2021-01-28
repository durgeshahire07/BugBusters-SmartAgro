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
}