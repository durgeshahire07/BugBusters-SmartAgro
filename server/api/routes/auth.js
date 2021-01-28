const express = require("express");
const router = express.Router();

const updateFunctions = require("../controllers/updatePass")
const userFunction = require("../controllers/loginSignup")

router.post('/login', userFunction.login)
router.post('/register', userFunction.register)
router.get('/otp', updateFunctions.sendOtp)
router.post('/otp', updateFunctions.checkOtp)
router.patch('/password', updateFunctions.newPassword)
// router.post('/resetPasswordEmail', userFunction.resetPasswordEmail)
// router.post('/passwordUpdateConfirmation', userFunction.passwordUpdateConfirmation)

module.exports = router