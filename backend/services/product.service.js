import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { checkedNull } from '../utils/handel_null.js';
import { deleteAllByProID } from './comment.service.js';
import { createList, getListVarByProID, deleteListVarByProID, findProIDByColor, isColorInProduct } from './variant.service.js';

export const {
    create,
    getAll,
    update,
    getById,
    getHotDeal,
    deleteById,
    getByStatus,
    findByColor,
    countByCateID,
    findByKeyword,
    getAllByCateID,
    findByColorAndSort,
    updateSoldOfProduct,
    findByKeywordAndSort,
    getQuantityByEachBrand,
    getQuantityByBrandName,
    getQuantityHotDealByBrandName,
    getQuantityHotDealByEachBrand,
} = {

    countByCateID: async (cateID) => {
        try {
            const totalProduct = await Product.find({ category: cateID });
            const detail = await Category.findById(cateID)
                .select("-createdAt -updatedAt -__v");
            const result = {
                ...detail._doc,
                total: totalProduct.length
            }

            return result;
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    getQuantityHotDealByEachBrand: async () => {
        try {
            const listBrand = ['Adidas', 'Nike', 'Vans', 'Balenciaga', 'Converse', 'Puma'];
            const infoListBrand = await Promise.all(listBrand.map((item) => getQuantityHotDealByBrandName(item)));

            return {
                success: true,
                status: 200,
                message: 'Get All Product Of Category Successful!!!',
                data: infoListBrand,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    getQuantityHotDealByBrandName: async (brand) => {
        try {
            const result = await Product.find({
                brand: brand,
                sold: { $gte: 10 },
            });

            return {
                brand: brand,
                quantity: result.length,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    getQuantityByEachBrand: async () => {
        try {
            const listBrand = ['Adidas', 'Nike', 'Vans', 'Balenciaga', 'Converse', 'Puma'];
            const infoListBrand = await Promise.all(listBrand.map((item) => getQuantityByBrandName(item)));

            return {
                success: true,
                status: 200,
                message: 'Get All Infomation Of Brand Successful!!!',
                data: infoListBrand,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    getQuantityByBrandName: async (brand) => {
        try {
            const result = await Product.find({ brand: brand });

            return {
                brand: brand,
                quantity: result.length,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    updateSoldOfProduct: async (proID, quantity) => {
        try {
            const savedProduct = await Product.findByIdAndUpdate(proID, { $inc: { sold: quantity } }, { new: true });
            checkedNull(savedProduct, "Product doen't exist !!!");

            return {
                success: true,
                status: 200,
                message: 'Update Sold Of Product Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Product Service !!!',
            };
        }
    },

    findByColorAndSort: async (color, pageSize, pageNumber, sort) => {
        try {
            const listProduct = await findProIDByColor(color);
            let limitResult = [];
            if (sort === 'pDESC') {
                const result = await Promise.all(
                    listProduct.map((pro) =>
                        Product.findById(pro.product)
                            .populate({ path: 'category', select: 'name' })
                            .select('-status -createdAt -updatedAt -__v'),
                    ),
                );

                limitResult = result
                    .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                    .sort((a, b) => b.price - a.price);
            }

            if (sort === 'pASC') {
                const result = await Promise.all(
                    listProduct.map((pro) =>
                        Product.findById(pro.product)
                            .populate({ path: 'category', select: 'name' })
                            .select('-status -createdAt -updatedAt -__v'),
                    ),
                );

                limitResult = result
                    .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                    .sort((a, b) => a.price - b.price);
            }

            if (sort === 'rDESC') {
                const result = await Promise.all(
                    listProduct.map((pro) =>
                        Product.findById(pro.product)
                            .populate({ path: 'category', select: 'name' })
                            .select('-status -createdAt -updatedAt -__v'),
                    ),
                );

                limitResult = result
                    .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                    .sort((a, b) => b.rating - a.rating);
            }

            if (sort === 'rASC') {
                const result = await Promise.all(
                    listProduct.map((pro) =>
                        Product.findById(pro.product)
                            .populate({ path: 'category', select: 'name' })
                            .select('-status -createdAt -updatedAt -__v'),
                    ),
                );

                limitResult = result
                    .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                    .sort((a, b) => a.rating - b.rating);
            }

            if (sort === 'HOT') {
                const result = await Promise.all(
                    listProduct.map((pro) =>
                        Product.findById(pro.product)
                            .populate({ path: 'category', select: 'name' })
                            .select('-status -createdAt -updatedAt -__v'),
                    ),
                );

                limitResult = result
                    .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                    .sort((a, b) => b.sold - a.sold);
            }

            if (!limitResult) return false;
            return {
                success: true,
                status: 200,
                message: 'Find Successful !!!',
                data: limitResult,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in User Service !!!',
            };
        }
    },

    findByColor: async (color, pageSize, pageNumber) => {
        try {
            const listProduct = await findProIDByColor(color);

            const result = await Promise.all(
                listProduct.map((pro) =>
                    Product.findById(pro.product)
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v'),
                ),
            );

            const limitResult = result.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

            if (!result) return false;
            return {
                success: true,
                status: 200,
                message: 'Find Product By Color Successful !!!',
                data: limitResult,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in User Service !!!',
            };
        }
    },

    findByKeywordAndSort: async (keyword, pageSize, pageNumber, sort) => {
        try {
            let result = [];
            if (isNaN(keyword)) {
                if (sort === 'pDESC') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ price: -1 });
                }

                if (sort === 'pASC') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ price: 1 });
                }

                if (sort === 'rDESC') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ rating: -1 });
                }

                if (sort === 'rASC') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ rating: 1 });
                }

                if (sort === 'HOT') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ sold: -1 });
                }
            } else {
                if (sort === 'pDESC') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { sold: keyword },
                            { price: keyword },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ price: -1 });
                }

                if (sort === 'pASC') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { sold: keyword },
                            { price: keyword },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ price: 1 });
                }

                if (sort === 'rDESC') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { sold: keyword },
                            { price: keyword },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ rating: -1 });
                }

                if (sort === 'rASC') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { sold: keyword },
                            { price: keyword },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ rating: 1 });
                }

                if (sort === 'HOT') {
                    result = await Product.find({
                        $or: [
                            { name: { $regex: keyword, $options: 'i' } },
                            { desc: { $regex: keyword, $options: 'i' } },
                            { brand: { $regex: keyword, $options: 'i' } },
                            { sold: keyword },
                            { price: keyword },
                            { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                        ],
                    })
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))
                        .populate({ path: 'category', select: 'name' })
                        .select('-status -createdAt -updatedAt -__v')
                        .sort({ sold: -1 });
                }
            }

            if (!result) return false;
            return {
                success: true,
                status: 200,
                message: 'Find Product By Keyword Successful !!!',
                data: result,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in User Service !!!',
            };
        }
    },

    findByKeyword: async (keyword, pageSize, pageNumber) => {
        try {
            let result = [];
            if (isNaN(keyword)) {
                result = await Product.find({
                    $or: [
                        { name: { $regex: keyword, $options: 'i' } },
                        { desc: { $regex: keyword, $options: 'i' } },
                        { brand: { $regex: keyword, $options: 'i' } },
                        { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                    ],
                })
                    .limit(pageSize)
                    .skip(pageSize * (pageNumber - 1))
                    .populate({ path: 'category', select: 'name' })
                    .select('-status -createdAt -updatedAt -__v');
            } else {
                result = await Product.find({
                    $or: [
                        { name: { $regex: keyword, $options: 'i' } },
                        { desc: { $regex: keyword, $options: 'i' } },
                        { brand: { $regex: keyword, $options: 'i' } },
                        { sold: keyword },
                        { price: keyword },
                        { category: { $in: await Category.find({ name: { $regex: keyword, $options: 'i' } }) } },
                    ],
                })
                    .limit(pageSize)
                    .skip(pageSize * (pageNumber - 1))
                    .populate({ path: 'category', select: 'name' })
                    .select('-status -createdAt -updatedAt -__v');
            }

            if (!result) return false;
            return {
                success: true,
                status: 200,
                message: 'Find Product By Keyword Successful !!!',
                data: result,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in User Service !!!',
            };
        }
    },

    update: async (body) => {
        try {
            const { product, ...others } = body;
            const savedProduct = await Product.findByIdAndUpdate(product, { $set: others }, { new: true });
            checkedNull(savedProduct, "Product doen't exist !!!");
            return {
                success: true,
                status: 200,
                message: 'Update Product Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Product Service !!!',
            };
        }
    },

    deleteById: async (proID) => {
        try {
            const result = await Product.findByIdAndDelete(proID);
            checkedNull(result, "Product doesn't exist !!!");

            const deletedVariants = await deleteListVarByProID(proID);
            if (!deletedVariants.success) return deletedVariants;

            const deletedComments = await deleteAllByProID(proID);
            if (!deletedComments.success) return deletedComments;

            return {
                success: true,
                status: 200,
                message: 'Delete Product Successful!!!',
                data: result,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    create: async (body, images) => {
        try {
            const { variants, ...others } = body;
            const listVariant = JSON.parse(variants);

            const newProduct = new Product({ ...others, images });
            const savedProduct = await newProduct.save();
            // create variant of Product
            const { success, status, message } = await createList(savedProduct._id, listVariant);
            if (!success) {
                // nếu create variants faild thì callback lại create product
                await Product.findByIdAndDelete(savedProduct._id);

                return {
                    success: false,
                    status: status,
                    message: message,
                };
            }

            return {
                success: true,
                status: 200,
                message: 'Create New Product Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    getById: async (proID) => {
        try {
            const result = await Product.findById(proID)
                .populate({ path: 'category', select: 'name' })
                .select('-createdAt -updatedAt -__v');

            // Lấy variants thuộc product
            const { success, status, message, data } = await getListVarByProID(proID);
            if (!success) return { success, status, message };

            checkedNull(result, "Product doesn't exist !!!");

            return {
                success: true,
                status: 200,
                message: 'Get Product By Id Successful!!!',
                data: {
                    product: result,
                    variants: data,
                },
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    getHotDeal: async (pageSize, pageNumber) => {
        try {
            const listProduct = await Product.find()
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .populate({ path: 'category', select: 'name' })
                .select('-createdAt -updatedAt -__v')
                .sort({ sold: -1 });

            return {
                success: true,
                status: 200,
                message: 'Get All Product Hot Deal Successful!!!',
                data: checkedNull(listProduct, "Resource doesn't exist !!!"),
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    getAll: async (pageSize, pageNumber) => {
        try {
            const listProduct = await Product.find()
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .populate({ path: 'category', select: 'name' })
                .select('-createdAt -updatedAt -__v');

            return {
                success: true,
                status: 200,
                message: 'Get All Product Successful!!!',
                data: checkedNull(listProduct, "Resource doesn't exist !!!"),
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    getByStatus: async (status, pageSize, pageNumber) => {
        try {
            const listProduct = await Product.find({ status: status })
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .populate({ path: 'category', select: 'name' })
                .select('-createdAt -updatedAt -__v');

            return {
                success: true,
                status: 200,
                message: 'Get All Product By Status Successful!!!',
                data: checkedNull(listProduct, "Resource doesn't exist !!!"),
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },

    getAllByCateID: async (cateID, color, brand, sort, pageSize, pageNumber) => {
        try {
            if (sort === "hot") {
                const listProduct = await Product.find({ category: cateID })
                    .populate({ path: 'category', select: 'name' })
                    .select("-createdAt -updatedAt -__v -status")
                    .sort({ sold: -1 });

                let result = listProduct;
                if (brand) {
                    result = listProduct.filter((product) => product.brand === brand);
                }
                let semiFinal = result;
                if (color) {
                    const maped = await Promise.all(result.map((product) => isColorInProduct(product._id, color)));
                    semiFinal = maped.filter((item) => item._id);
                }

                const final = semiFinal.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

                return {
                    success: true,
                    status: 200,
                    message: 'Get All Product Of Category Successful!!!',
                    data: final,
                };
            }

            const listProduct = await Product.find({ category: cateID })
                .populate({ path: 'category', select: 'name' })
                .select("-createdAt -updatedAt -__v -status")
                .sort({ createdAt: -1 });

            let result = listProduct;
            if (brand) {
                result = listProduct.filter((product) => product.brand === brand);
            }
            let semiFinal = result;
            if (color) {
                const maped = await Promise.all(result.map((product) => isColorInProduct(product._id, color)));
                semiFinal = maped.filter((item) => item._id);
            }

            const final = semiFinal.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

            return {
                success: true,
                status: 200,
                message: 'Get All Product Of Category Successful!!!',
                data: final,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            };
        }
    },
};
