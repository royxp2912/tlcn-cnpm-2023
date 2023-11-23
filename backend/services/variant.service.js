import Product from "../models/Product.js";
import Variant from "../models/Variant.js";
import { checkedObjectId } from "../utils/checkedOthers.js";
import { checkedNull, checkedNullAndFormatData } from "../utils/handel_null.js";
import { getById } from "./product.service.js";

export const {
    createOne,
    createList,
    getVarByID,
    incQuantity,
    deleteVarByID,
    getOneByProID,
    updateVarByID,
    reduceQuantity,
    checkedQuantity,
    findProIDByColor,
    getListVarByProID,
    deleteListVarByProID,
    getVarByColorAndSize,
    getSizeByColorAndProID,
    getColorBySizeAndProID,
    isColorInProduct,
} = {

    isColorInProduct: async (proID, color) => {
        try {
            const result = await Variant.findOne({
                product: proID,
                color: color,
            });
            if (!result) return {
                failed: true,
            };

            const geted = await Product.findById(proID)
                .populate({ path: 'category', select: 'name' })
                .select("-createdAt -updatedAt -__v -status");

            return geted;
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    checkedQuantity: async (proID, color, size, quantity) => {
        try {
            const resultVariant = await getVarByColorAndSize(proID, color, size);
            if (!resultVariant.success) return resultVariant;

            if (resultVariant.data.quantity < quantity) return {
                success: false,
                status: 404,
                message: "The quantity of products in stock is not enough !!!"
            }

            return {
                success: true,
                status: 200,
                message: "Quantity Stocking!!!",
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    incQuantity: async (proID, color, size, quantity) => {
        try {
            await Variant.findOneAndUpdate(
                {
                    product: proID,
                    color: color,
                    color: size,
                },
                {
                    quantity: { $inc: quantity }
                },
            );

            return {
                success: true,
                status: 200,
                message: "Reduce Quantity Of Variant Successfull !!!",
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    reduceQuantity: async (proID, color, size, quantity) => {
        try {
            const result = await Variant.findOneAndUpdate(
                {
                    product: proID,
                    color: color,
                    size: size,
                },
                {
                    $inc: { quantity: -quantity }
                },
            );

            return {
                success: true,
                status: 200,
                message: "Reduce Quantity Of Variant Successfull !!!",
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    getVarByColorAndSize: async (proID, color, size) => {
        try {
            const getedVariant = await Variant.findOne({
                product: proID,
                color: color,
                size: size,
            }).select("color size quantity");
            checkedNull(getedVariant, "Variant doesn't exist !!!")

            return {
                success: true,
                status: 200,
                message: "Get Variant By Color And Size Successful !!!",
                data: getedVariant,
            }

        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    getOneByProID: async (proID) => {
        try {
            const oneVariant = await Variant.findOne(
                {
                    product: proID,
                    quantity: { $gte: 1 },
                },
            )
                .select("color size quantity -_id");

            return {
                success: true,
                status: 200,
                message: "Get One Variant Of Product Successfull !!!",
                data: oneVariant,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    getColorBySizeAndProID: async (proID, size) => {
        try {
            const listProduct = await Variant.find(
                {
                    product: proID,
                    size: size,
                },
            )
                .select("color quantity -_id");

            return {
                success: true,
                status: 200,
                message: "Get Size Of Product By Color !!!",
                data: listProduct,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    getSizeByColorAndProID: async (proID, color) => {
        try {
            const listProduct = await Variant.find(
                {
                    product: proID,
                    color: color,
                },
            )
                .select("size quantity -_id");

            return {
                success: true,
                status: 200,
                message: "Get Size Of Product By Color !!!",
                data: listProduct,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    findProIDByColor: async (color) => {
        try {
            const listProduct = await Variant.find({ color: color })
                .select("product -_id");

            const uniqueListProduct = Array.from(new Set(listProduct.map(JSON.stringify)), JSON.parse);

            return uniqueListProduct;
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

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
            const listVariant = await Variant.find({ product: proID }).select("color size -_id");
            if (listVariant.length === 0) return {
                success: false,
                status: 404,
                message: "Product doesn't exist !!!"
            }

            const listColor = listVariant.map((item) => item.color);
            const listSize = listVariant.map((item) => item.size);

            return {
                success: true,
                status: 200,
                message: "Get List Variant Successful !!!",
                data: {
                    listColor: [...new Set(listColor)],
                    listSize: [...new Set(listSize)],
                },
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

    updateVarByID: async (varID, color, size, quantity) => {
        try {
            const savedVariant = await Variant.findByIdAndUpdate(
                varID,
                {
                    $set: {
                        color: color,
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