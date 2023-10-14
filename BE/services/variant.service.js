import Product from "../models/Product.js";
import Variant from "../models/Variant.js";
import { checkedNull, checkedNullAndFormatData } from "../utils/handel_null.js";
import { getById } from "./product.service.js";

export const {
    createOne,
    createList,
    getVarByID,
    updateVarByID,
    deleteVarByID,
    getListVarByProID,
    deleteListVarByProID,
} = {

    createOne: async (proID, variant) => {
        try {
            const existProduct = await Product.findById(proID);
            if (!existProduct) return {
                success: false,
                status: 404,
                message: "Product don't exist !!!",
            };

            const newVariant = new Variant({
                product: proID,
                color: variant.color,
                size: variant.size,
                quantity: variant.quantity
            });

            const savedVariant = await newVariant.save();

            return {
                success: true,
                status: 200,
                message: "Create Variant Successful!!!",
                data: savedVariant,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    createList: async (proID, listVariant) => {
        try {
            const existProduct = await Product.findById(proID);
            if (!existProduct) return {
                success: false,
                status: 404,
                message: "Product don't exist !!!",
            };

            const result = await Promise.all(listVariant.map((variant) => {
                let newVariant = new Variant({
                    product: proID,
                    color: variant.color,
                    size: variant.size,
                    quantity: variant.quantity
                });
                return newVariant.save();
            }));

            return {
                success: true,
                status: 200,
                message: "Create List Variant Successful!!!",
                data: result,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    getVarByID: async (varID) => {
        try {
            const getedVariant = await Variant.findById(varID);

            return {
                success: true,
                status: 200,
                message: "Get Variant Successful !!!",
                data: checkedNullAndFormatData(getedVariant, "Variant doesn't exist !!!"),
            }

        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    getListVarByProID: async (proID) => {
        try {
            const listVariant = await Variant.find({ product: proID }).select("-product -createdAt -updatedAt -__v");
            if (listVariant.length === 0) return {
                success: false,
                status: 404,
                message: "Product doesn't exist !!!"
            }
            return {
                success: true,
                status: 200,
                message: "Get List Variant Successful !!!",
                data: listVariant,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    deleteListVarByProID: async (proID) => {
        try {
            const deletedVariant = await Variant.deleteMany({ product: proID });

            return {
                success: true,
                status: 200,
                message: "Delete List Variant Successful !!!",
                data: checkedNull(deletedVariant, "Product doesn't exist !!!"),
            }

        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    deleteVarByID: async (varID) => {
        try {
            const savedVariant = await Variant.findByIdAndDelete(varID);

            return {
                success: true,
                status: 200,
                message: "Delete Variant Successful !!!",
                data: checkedNull(savedVariant, "Variant doesn't exist !!!"),
            }

        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong !!!",
            }
        }
    },

    updateVarByID: async (varID, size, quantity) => {
        try {
            const savedVariant = await Variant.findByIdAndUpdate(
                varID,
                {
                    $set: {
                        szie: size,
                        quantity: quantity
                    }
                },
                { new: true }
            )

            return {
                success: true,
                status: 200,
                message: "Update Variant Successful !!!",
                data: checkedNull(savedVariant, "Variant doesn't exist !!!"),
            }

        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong !!!",
            }
        }
    },
}