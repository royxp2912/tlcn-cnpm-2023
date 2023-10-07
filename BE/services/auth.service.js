import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Auth from "../models/Authentication.js";
import { findByEmail } from "./user.service.js";
import decrypt from "../helpers/crypto/decrypt.js";
import generateToken from "../helpers/jwt/generateTokens.js";

export const { registerService, loginService, getTokenLastest,
    lockAllToken, createListToken, addNewToken, refreshAccessTokenService, logoutService } = {

    registerService: async (body) => {
        try {
            if (await findByEmail(body.email)) return {
                success: false,
                status: 409,
                message: "The Email has been registered by another user !!!",
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(body.password, salt);

            const newUser = new User({
                email: body.email,
                fullName: body.fullName,
                password: hash,
                gender: body.gender,
                birthDay: body.birthDay,
            });

            await newUser.save();
            return {
                success: true,
                status: 201,
                message: "Register Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    logoutService: async (userID) => {
        try {
            const deletedAuth = await Auth.findOneAndDelete({ user: userID });
            if (!deletedAuth) return {
                success: false,
                status: 401,
                message: "Unauthenticated User !!!",
            }

            return {
                success: true,
                status: 200,
                message: "Logout Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    loginService: async (body) => {
        try {
            const { success, data } = await findByEmail(body.email);
            if (!success) return {
                success: false,
                status: 404,
                message: "Email is not registered !!!"
            }

            const isCorrectPassword = bcrypt.compareSync(body.password, data.password);
            if (!isCorrectPassword) return {
                success: false,
                status: 404,
                message: "Incorrect password !!!"
            }

            if (data.status === "Locked") return {
                success: false,
                status: 403,
                message: "Your account has been locked !!! Please try again later !!!"
            }

            const { accessToken, refreshToken } = generateToken(data._id);
            // Loại bỏ các thông tin "quan trọng" ra khỏi dữ liệu trả về client
            const { password, status, role, createdAt, updatedAt, __v, ...otherDetails } = data._doc;

            return {
                success: true,
                status: 403,
                message: "Login Successful !!!",
                data: otherDetails,
                accessToken,
                refreshToken
            }

        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong !!!"
            }
        }
    },

    refreshAccessTokenService: async (userID) => {
        try {
            // genarate new token
            const { accessToken, refreshToken } = generateToken(userID);

            return {
                success: true,
                status: 201,
                message: "Add New Token Successfull !!!",
                accessToken,
                refreshToken
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong !!!"
            }
        }
    },

    addNewToken: async (userID, token) => {
        try {
            // vô hiệu hóa các refresh cũ trước khi thêm refresh mới
            await lockAllToken(userID);

            // start add
            await Auth.findOneAndUpdate(
                { user: userID },
                { $push: { listTokens: { value: token } } },
            );

            return {
                success: true,
                status: 201,
                message: "Add New Token Successfull !!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong !!!"
            }
        }
    },

    createListToken: async (userID, token) => {
        try {
            const newAuth = new Auth({
                user: userID,
                listTokens: [
                    {
                        value: token
                    }
                ]
            });
            await newAuth.save();

            return {
                success: true,
                status: 201,
                message: "Create List Token Successfull !!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong !!!"
            }
        }
    },

    lockAllToken: async (userID) => {
        try {
            await Auth.findOneAndUpdate(
                { user: userID },
                { $set: { "listTokens.$[].status": "Locked" } },
            );

            return {
                success: true,
                status: 200,
                message: "Lock All Token Successfull !!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong !!!"
            }
        }
    },

    getTokenLastest: async (userID) => {
        try {
            // login done sẽ tự động tạo 1 list để chứa refreshToken - Nếu kh có => user chưa được authen
            const listToken = await Auth.findOne({ user: userID });
            if (!listToken) return {
                success: false,
                status: 401,
                message: "Unauthenticated User !!!"
            }

            const length = listToken.listTokens.length;

            const lastedToken = listToken.listTokens[length - 1];
            if (lastedToken.status === "Locked") return {
                success: false,
                status: 403,
                message: "Refresh Token has been Locked !!! Please login again !!!"
            }

            return {
                success: true,
                status: 200,
                message: "Find Successfull !!!",
                lastedToken,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong !!!"
            }
        }
    },
}