const sendMail = require('../utils/mail')
const {
    generateOtp,
    checkUserExist,
    saveOtp,
    checkOtp,
} = require('../utils/helper')

module.exports = {
    sendOtp: async (req, res, next) => {
        try {
            console.log("send otp", req.query)
            const userExist = await checkUserExist(req.query.email)
            if (userExist) {
                const otp = generateOtp()
                const mailResponse = await sendMail(req.query.email, otp)
                if (mailResponse) {
                    const result = await saveOtp(userExist._id, otp)
                    if (result) {
                        return res.status(201).json({
                            success: true,
                            data: {
                                id: userExist._id
                            }
                        })
                    } else {
                        return res.status(500).json({
                            success: false,
                            err: "Something went wrong"
                        })
                    }
                }
            } else {
                return res.status(404).json({
                    success: false,
                    err: "User not found"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                err: "Server error"
            })
        }
    },
    checkOtp: async (req, res, next) => {
        try {
            console.log("check otp", req.body)
            const {
                id,
                otp
            } = req.body
            const result = await checkOtp(id, otp)
            console.log(result)
            if (result) {
                return res.status(201).json({
                    success: true
                })
            } else {
                return res.status(400).json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                err: "Server error"
            })
        }
    },
    newPassword: async (req, res, next) => {
        try {
            console.log("reset password", req.body)
            const {
                id,
                password
            } = req.body
            const result = await updatePassword(id, password)
            if (result) {
                return res.status(201).json({
                    success: true
                })
            } else {
                return res.status(400).json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                err: "Server error"
            })
        }
    }
}