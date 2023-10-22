import User from "../models/User.js";
import { checkedNull } from "../utils/handel_null.js";
import { deleteAllByUserID } from "./address.service.js";

export const {
    lockUser,
    unlockUser,
    getAllUser,
    getUserByID,
    findByEmail,
    updateAvatar,
    deleteUserByID,
    updateUserByID,
    getAllUserByStatus,
} = {

    deleteUserByID: async (userID) => {
        try {
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

    getAllUserByStatus: async (status) => {
        try {
            const listUser = await User.find({ status: status }).select("-password -createdAt -updatedAt -__v");

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

    getAllUser: async () => {
        try {
            const listUser = await User.find().select("-password -createdAt -updatedAt -__v");

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
            const existUser = await User.findById(userID).select("-password -role -status -createdAt -updatedAt -__v");

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
            const existUser = await User.findOne({ email: email });

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