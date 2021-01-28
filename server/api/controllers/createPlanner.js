const {spawn} = require("child_process");

const multer = require("multer");


module.exports = {
    getCrops: (req, res, next) => {
        //console.log(req.file)
        try {
            console.log(req.file.filename);
            const subProcess = spawn("python", ["model_classify.py", req.file.filename]);
            subProcess.stdout.on('data', (data) => {
                console.log("in subprocess")
                console.log(data);
            })
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
}