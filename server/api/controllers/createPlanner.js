const fs = require('fs');

const {
    saveCrop,
    getCrops,
    getcropDetails,
    savePlan,
} = require("../utils/plannerHelper")

module.exports = {
    getCrops: (req, res, next) => {
        console.log(req.file)
        try {
            var op = '';
            const filePath = "./uploads/" + req.file.filename;
            console.log(req.file.filename);
            const spawn = require("child_process").spawn;
            const subProcess = spawn("python", ["./models/model_classify.py", req.file.filename.toString()]);
            console.log("before subprocess")
            subProcess.stdout.on('data', (data) => {
                console.log("in subprocess")
                console.log(`stdout: ${data}`);
                op = data.toString();

            });

            subProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);

            });
            subProcess.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                if (op != null) {
                    res.status(200).json({
                        sucess: true,
                        list: op,
                        data: req.file
                    });
                } else {
                    res.status(200).json({
                        sucess: false,
                        list: op,
                        data: req.file
                    });
                }
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log("error deleting image file!");
                    } else {
                        console.log("deleted image file!");
                    }
                });
            });
            console.log(op);
        } catch (error) {
            console.log(error)
            res.status(404).json({
                sucess: false
            })
        }
    },
    cropDetails: async (req, res, next) => {
        try {
            const result = await getcropDetails(req.body);
            if (result) {
                res.status(200).json({
                    success: true,
                    data: result,
                })
            } else {
                res.status(200).json({
                    success: false,
                    data: result,
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success: false,
                data: null,
            })
        }
    },
    saveCropPlanDetails: async (req, res, next) => {
        try {
            const result = await savePlan(req.body)
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