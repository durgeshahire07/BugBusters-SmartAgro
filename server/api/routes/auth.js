const express = require("express");
const router = express.Router();

const userFunction = require("../controllers/loginSignup")

router.post('/login', userFunction.login)

module.exports = router