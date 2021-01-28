const {
    spawn
} = require("child_process");

const multer = require("multer");

const {
    saveCrop
} = require("../utils/plannerHelper")

module.exports = {
    getCrops: async (req, res, next) => {
        //console.log(req.file)
        try {
            console.log(req.file.filename);
            const subProcess = await spawn("python", ["../../models/model_classify.py", req.file.filename]);
            console.log("before subprocess")
            subProcess.stdout.on('data', (data) => {
                console.log("in subprocess")
                console.log(data);
            });
            res.status(200).json({
                sucess: true,
                data: req.file
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({
                sucess: false
            })
        }
    },
    saveCropDetails: async (req, res, next) => {
        try {
            const result = await saveCrop(req.body)
            if (result) {
                res.status(200).json({
                    sucess: true
                })
            } else {
                res.status(500).json({
                    sucess: false
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                sucess: false
            })
        }
    },
}