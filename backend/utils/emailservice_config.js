import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
    },
});

const sendCodeEmail = async (email) => {
    const verifyCode = crypto.randomInt(100000, 999999);
    const details = {
        from: `P&P <${process.env.USER_EMAIL}>`,
        to: email,
        subject: "Email Authentication From P&P",
        html: `<p style="font-size: 34px">Verify Code: <span style="font-weight: bold; color: red; letter-spacing: 4px;">${verifyCode}</span></p>`,
    };
    await transporter.sendMail(details, (err) => {
        if (err) return {
            success: false,
            status: err.status,
            message: err.message,
        }
    });

    return {
        success: true,
        status: 200,
        message: "Send Code To Email Successful !!!",
        code: verifyCode,
    }
}

export default sendCodeEmail