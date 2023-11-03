import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { checkedNull } from "../utils/handel_null.js";
import { deleteAllByUserID } from "./address.service.js";
import { checkedObjectId } from "../utils/checkedOthers.js";

export const {
    lockUser,
    unlockUser,
    getAllUser,
    getUserByID,
    findByEmail,
    updateAvatar,
    findByKeyword,
    deleteUserByID,
    updateUserByID,
    getAllUserByStatus,
    updateEmailByUserID,
    updatePasswordByUserID,
} = {

    updateEmailByUserID: async (userID, newEmail) => {
        try {
            checkedObjectId(userID, "User ID");
            const result = await User.findByIdAndUpdate(
                userID,
                { $set: { email: newEmail } },
                { new: true }
            );
            checkedNull(result, "User don't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Update User Email Successful !!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    updatePasswordByUserID: async (userID, oldPass, newPass) => {
        try {
            checkedObjectId(userID, "User ID");
            const result = await User.findById(userID).select("password");
            checkedNull(result, "User don't exist !!!");

            const isCorrectPassword = bcrypt.compareSync(oldPass, result.password);
            if (!isCorrectPassword)
                return {
                    success: false,
                    status: 404,
                    message: 'Incorrect Old Password !!!',
                };

            const salt = bcrypt.genSaltSync(10);
            const newPassword = bcrypt.hashSync(newPass, salt);

            await User.findByIdAndUpdate(
                userID,
                { $set: { password: newPassword } },
                { new: true }
            );

            return {
                success: true,
                status: 200,
                message: "Update User Password Successful !!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    findByKeyword: async (keyword, pageSize, pageNumber) => {
        try {
            const result = await User.find({
                $or: [
                    { email: { $regex: keyword, $options: 'i' } },
                    { fullName: { $regex: keyword, $options: 'i' } },
                    { gender: { $regex: keyword, $options: 'i' } },
                    { phone: { $regex: keyword, $options: 'i' } },
                    { status: { $regex: keyword, $options: 'i' } },
                    { role: { $regex: keyword, $options: 'i' } },
                ]
            })
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .select("-password -createdAt -updatedAt -__v");

            if (!result) return false;
            return {
                success: true,
                status: 200,
                message: "Find Successful !!!",
                data: result,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    deleteUserByID: async (userID) => {
        try {
            checkedObjectId(userID, "User ID");
            const deletedUser = await User.findByIdAndDelete(userID);
            checkedNull(deletedUser, "User don't exist !!!");

            // delete Address of User
            await deleteAllByUserID(userID);

            return {
                success: true,
                status: 200,
                message: "Delete User Successful !!!",
                data: deletedUser,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    updateAvatar: async (userID, image) => {
        try {
            checkedObjectId(userID, "User ID");
            const updatedUser = await User.findByIdAndUpdate(
                userID,
                { $set: { avatar: image } }
            );
            checkedNull(updatedUser, "User don't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Upload User Avatar Successful !!!",
                data: updatedUser,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    unlockUser: async (userID) => {
        try {
            checkedObjectId(userID, "User ID");

            const updatedUser = await User.findById(userID);
            checkedNull(updatedUser, "User don't exist !!!");

            if (updatedUser.status === "Available") return {
                success: false,
                status: 200,
                message: "User is not locked out !!!",
            }

            updatedUser.status = "Available";
            await updatedUser.save();

            return {
                success: true,
                status: 200,
                message: "Unlock User Successful !!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    lockUser: async (userID) => {
        try {
            checkedObjectId(userID, "User ID");

            const updatedUser = await User.findById(userID);
            checkedNull(updatedUser, "User don't exist !!!");

            if (updatedUser.status === "Locked") return {
                success: false,
                status: 200,
                message: "User has been locked out before !!!",
            }

            updatedUser.status = "Locked";
            await updatedUser.save();

            return {
                success: true,
                status: 200,
                message: "Lock User Successful !!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    updateUserByID: async (userID, body) => {
        try {
            checkedObjectId(userID, "User ID");

            const updatedUser = await User.findByIdAndUpdate(
                userID,
                { $set: body },
                { new: true }
            );
            checkedNull(updatedUser, "User don't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Update User Successful !!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    getAllUserByStatus: async (status, pageSize, pageNumber) => {
        try {
            const listUser = await User.find({ status: status })
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .select("-password -createdAt -updatedAt -__v");

            return {
                success: true,
                status: 200,
                message: "Find All User By Status Successful !!!",
                data: checkedNull(listUser, "Users doesn't exist !!!"),
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    getAllUser: async (pageSize, pageNumber) => {
        try {
            const listUser = await User.find()
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .select("-password -createdAt -updatedAt -__v");

            return {
                success: true,
                status: 200,
                message: "Find All User Successful !!!",
                data: checkedNull(listUser, "Users doesn't exist !!!"),
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    getUserByID: async (userID) => {
        try {
            checkedObjectId(userID, "User ID");

            const existUser = await User.findById(userID)
                .select("-password -role -status -createdAt -updatedAt -__v");

            return {
                success: true,
                status: 200,
                message: "Find User Successful !!!",
                data: checkedNull(existUser, "User doesn't exist !!!"),
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },

    findByEmail: async (email) => {
        try {
            const existUser = await User.findOne({ email: email })
                .select("-password -role -status -createdAt -updatedAt -__v");;

            if (!existUser) return false;
            return {
                success: true,
                status: 200,
                message: "Find Successful !!!",
                data: existUser,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in User Service !!!",
            }
        }
    },
}