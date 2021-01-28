const nodemailer = require('nodemailer');

const sendMail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'fpersonalgrowthpyramid@gmail.com',
                pass: 'Personal-growth-request'
            }
        });

        const mailOptions = {
            from: 'fpersonalgrowthpyramid@gmail.com',
            to: email,
            subject: 'Password reset otp',
            text: 'Here is the otp: ' + otp,

        };

        const result = await transporter.sendMail(mailOptions)
        if (result) {
            return true
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = sendMail