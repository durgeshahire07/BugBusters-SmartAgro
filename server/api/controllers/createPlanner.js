const fs = require('fs');

const {
    saveCrop,
    getCrops,
    getcropDetails,
    savePlan,
    savep,
    getl,
    getp,
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
                        success: true,
                        list: op.slice(0, -2).split(','),
                        data: req.file
                    });
                } else {
                    res.status(200).json({
                        success: false,
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
                success: false
            })
        }
    },
    cropDetails: async (req, res, next) => {
        try {
            const result = await getcropDetails(req.body);
            if (result) {
                res.status(200).json({
                    success: true,
                    crop: req.body.crop,
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
                    success: true
                })
            } else {
                res.status(500).json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success: false
            })
        }
    },
    saveCropDetails: async (req, res, next) => {
        try {
            const result = await saveCrop(req.body)
            if (result) {
                res.status(200).json({
                    success: true
                })
            } else {
                res.status(500).json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success: false
            })
        }
    },
    savePlan: async (req, res, next) => {
        try {
            const result = await savep(req.body);
            if (result) {
                res.status(200).json({
                    success: true
                })
            } else {
                res.status(200).json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success: false
            })
        }
    },
    getList: async (req, res, next) => {
        try {
            const result = await getl(req.body);
            if (result) {
                res.status(200).json({
                    success: true,
                    list: result
                })
            } else {
                res.status(200).json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success: false
            })
        }
    },
    getPlan: async (req, res, next) => {
        try {
            const result = await getp(req.body);
            if (result) {
                res.status(200).json({
                    success: true,
                    cropinfo: result.cropinfo,
                    plan: result.cropPlan,
                })
            } else {
                res.status(200).json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success: false
            })
        }
    }
}