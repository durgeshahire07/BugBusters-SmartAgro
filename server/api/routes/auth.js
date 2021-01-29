const express = require("express");
const router = express.Router();

const updateFunctions = require("../controllers/updatePass")
const userFunction = require("../controllers/loginSignup")
const planner = require("../controllers/createPlanner")
const weather = require("../controllers/weather")

const multer = require("multer");
const { saveCropDetails } = require("../controllers/createPlanner");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const uplaod = multer({storage: storage});
// const uplaod = multer({dest: "uploads/"});

router.post('/login', userFunction.login)
router.post('/register', userFunction.register)
router.get('/otp', updateFunctions.sendOtp)
router.post('/otp', updateFunctions.checkOtp)
router.patch('/password', updateFunctions.newPassword)
// router.post('/resetPasswordEmail', userFunction.resetPasswordEmail)
// router.post('/passwordUpdateConfirmation', userFunction.passwordUpdateConfirmation)
router.post("/getCrops", uplaod.single('landImage'), planner.getCrops)
router.post("/saveCropDetails", planner.saveCropDetails)
router.post("/cropDetails", planner.cropDetails)
router.post("/saveCropPlanDetails", planner.saveCropPlanDetails)
router.post("/weather", weather.weather)

module.exports = router