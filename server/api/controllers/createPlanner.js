// const multer = require("multer");

const {
    saveCrop,
    getCrops
} = require("../utils/plannerHelper")

module.exports = {
    getCrops: (req, res, next) => {
        console.log(req.file)
        try {
            var op = '';
            console.log(req.file.filename);
            const spawn = require("child_process").spawn;
            const subProcess = spawn("python", ["./models/model_classify.py", req.file.filename.toString()]);
            console.log("before subprocess")
            subProcess.stdout.on('data', (data) => {
                console.log("in subprocess")
                console.log(`stdout: ${data}`);
                op = data.toString();
                res.status(200).json({
                    sucess: true,
                    output: op,
                    data: req.file
                });
            });
            subProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
            subProcess.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
            // const op = getCrops(req.file.filename);
            console.log(op);
            // res.status(200).json({
            //     sucess: true,
            //     output: op,
            //     data: req.file
            // });
            // while (op != '') {
            //     console.log(op);
            //     res.status(200).json({
            //         sucess: true,
            //         output: op,
            //         data: req.file
            //     });
            // }
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