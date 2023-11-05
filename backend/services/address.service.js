import Address from "../models/Address.js";
import { getUserByID } from "./user.service.js";
import { checkedNull } from "../utils/handel_null.js";

export const {
    create,
    update,
    getAll,
    getByID,
    unDefault,
    deleteAll,
    deleteByID,
    setDefault,
    deleteAllByUserID,
    getAllByUserID,
} = {

    deleteAllByUserID: async (userID) => {
        try {
            const result = await Address.deleteMany({ user: userID });

            return {
                success: true,
                status: 200,
                message: "Delete All Address Of User Successful!!!",
                total: result.deletedCount,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },

    deleteByID: async (addID) => {
        try {
            const deletedAddress = await Address.findOneAndDelete(addID)
            checkedNull(deletedAddress, "Address don't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Delete Address Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },

    unDefault: async (addID) => {
        try {
            const updatedAddress = await Address.findByIdAndUpdate(
                addID,
                { $set: { default: false } }
            );
            checkedNull(updatedAddress, "Address don't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Un Default Address Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },

    setDefault: async (addID) => {
        try {
            const updatedAddress = await Address.findByIdAndUpdate(
                addID,
                { $set: { default: true } }
            );
            checkedNull(updatedAddress, "Address don't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Set Default Address Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },

    update: async (body) => {
        try {
            const { address, ...others } = body;
            const updatedAddress = await Address.findByIdAndUpdate(
                address,
                { $set: others }
            );
            checkedNull(updatedAddress, "Address don't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Update Address Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },

    getAllByUserID: async (userID, pageSize, pageNumber) => {
        try {
            const existUser = await getUserByID(userID);
            if (!existUser) return existUser;

            const listAddress = await Address.find({ user: userID })
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .sort({ createdAt: -1 })
                .select("-createdAt -updatedAt -__v");

            return {
                success: true,
                status: 200,
                message: "Get All Address Of User Successful!!!",
                data: listAddress,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },

    getByID: async (addID) => {
        try {
            const existAddress = await Address.findById(addID).select("-createdAt -updatedAt -__v");
            checkedNull(existAddress, "Address don't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Get Address Successful!!!",
                data: existAddress,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },

    create: async (body) => {
        try {
            const existUser = await getUserByID(body.user);
            if (!existUser.success) return existUser;

            const newAddress = new Address(body);
            await newAddress.save();

            return {
                success: true,
                status: 201,
                message: "Create New Address Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },

    getAll: async () => {
        try {
            const listAddress = await Address.find()
                .sort({ createAt: -1 })
                .select("-createdAt -updatedAt -__v");

            return {
                success: true,
                status: 200,
                message: "Get All Address Successful!!!",
                data: listAddress,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },

    deleteAll: async () => {
        try {
            const result = await Address.deleteMany();

            return {
                success: true,
                status: 200,
                message: "Delete All Address Successful!!!",
                total: result.deletedCount,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Address !!!",
            }
        }
    },
}