import nodemailer from "nodemailer";
import crypto from "crypto";
import { create } from "domain";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
    },
});

const createOTP = (OTP) => {
    return `<!doctype html>
    <html lang="en-US">

    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>

    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                              <a href="https://web-demo.online" title="logo" target="_blank">
                                <i class="fas fa-fire"></i>
                              </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                requested to reset your password</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"><h1>${OTP}</h1></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
We cannot simply send you your old password. A unique otp to reset your
                                                password has been generated for you. To reset your password, copy otp and paste in reset password page.
                                            </p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                OTP will expire after 5 minutes
                                            </p>
                                            <a href="" style="cursor:pointer; background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                                VISIT WEBSITE</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>No Copyright@2021</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>

    </html>`
}

const sendCodeEmail = async (email) => {
    const verifyCode = crypto.randomInt(100000, 999999);

    const details = {
        from: `P&P <${process.env.USER_EMAIL}>`,
        to: email,
        subject: "Email Authentication From P&P",
        html: createOTP(verifyCode),
        // html: `<p style="font-size: 34px">Verify Code: <span style="font-weight: bold; color: red; letter-spacing: 4px;">${verifyCode}</span></p>`,
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