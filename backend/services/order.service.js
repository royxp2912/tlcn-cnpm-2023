import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { checkedObjectId } from '../utils/checkedOthers.js';
import { checkedNull } from '../utils/handel_null.js';
import { getUserByID, updateSpentByUserID } from './user.service.js';
import { removeFromCart } from './cart.service.js';
import { reduceQuantity, checkedQuantity } from './variant.service.js';
import { updateSoldOfProduct } from './product.service.js';

export const {
    create,
    getAll,
    getByID,
    cancelOrder,
    returnOrder,
    updateStatus,
    receivedOrder,
    findByKeyword,
    getAllByUserID,
    getAllByStatus,
    paymentConfirm,
    deliveryConfirm,
    listUserThisMonth,
    getAllByStatusAndUser,
    listProductSoldThisMonth,
    totalSpentByUserIDThisMonth,
    soldProductByProIDThisMonth,
} = {
    soldProductByProIDThisMonth: async (proID, firstOfMonth, firstOfNextMonth) => {
        try {
            const listOrder = await Order.find({
                'items.product': proID,
                createdAt: {
                    $gte: firstOfMonth,
                    $lte: firstOfNextMonth,
                },
            }).select('items');

            const newList = listOrder.flatMap((cur) =>
                cur.items.map((item) => {
                    return {
                        product: item.product,
                        quantity: item.quantity,
                    };
                }),
            );

            const result = newList.reduce((arc, item) => {
                if (item.product.equals(proID)) {
                    return arc + item.quantity;
                }
                return arc;
            }, 0);

            const info = await Product.findById(proID).select('images name');

            return {
                id: proID,
                name: info.name,
                image: info.images[0],
                count: result,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order Service !!!',
            };
        }
    },

    listProductSoldThisMonth: async (firstOfMonth, firstOfNextMonth) => {
        try {
            const listProduct = await Order.find({
                createdAt: {
                    $gte: firstOfMonth,
                    $lte: firstOfNextMonth,
                },
            }).select('items.product');

            const newList = listProduct.flatMap((cur) => cur.items.map((item) => item.product));
            const result = [...new Set(newList.map(String))];

            return result;
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order Service !!!',
            };
        }
    },

    listUserThisMonth: async (firstOfMonth, firstOfNextMonth) => {
        try {
            const listUser = await Order.find({
                createdAt: {
                    $gte: firstOfMonth,
                    $lte: firstOfNextMonth,
                },
            }).select('user');

            const newList = listUser.map((item) => item.user);
            const result = [...new Set(newList.map(String))];

            let i;
            for (i = 0; i < result.length; i++) {
                const a = await User.findById(result[i]);
                if (!a) result.splice(i, 1);
            }

            return result;
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order Service !!!',
            };
        }
    },

    totalSpentByUserIDThisMonth: async (userID, firstOfMonth, firstOfNextMonth) => {
        try {
            const listOrder = await Order.find({
                user: userID,
                createdAt: {
                    $gte: firstOfMonth,
                    $lte: firstOfNextMonth,
                },
            }).select('total');

            const result = listOrder.reduce((arc, item) => arc + item.total, 0);
            const info = await User.findById(userID).select('avatar fullName');

            return {
                id: userID,
                name: info.fullName,
                image: info.avatar,
                count: result,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order Service !!!',
            };
        }
    },

    findByKeyword: async (keyword, pageSize, pageNumber) => {
        try {
            let result = [];
            if (isNaN(keyword)) {
                result = await Order.find({
                    $or: [
                        { 'items.name': { $regex: keyword, $options: 'i' } },
                        { status: { $regex: keyword, $options: 'i' } },
                        { paymentMethod: { $regex: keyword, $options: 'i' } },
                    ],
                }).select('-createdAt -updatedAt -__v -user -deliveryAddress');
            } else {
                result = await Order.find({
                    $or: [
                        { 'items.name': { $regex: keyword, $options: 'i' } },
                        { total: keyword },
                        { status: { $regex: keyword, $options: 'i' } },
                        { paymentMethod: { $regex: keyword, $options: 'i' } },
                    ],
                }).select('-createdAt -updatedAt -__v -user -deliveryAddress');
            }

            const final = result.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

            return {
                success: true,
                status: 200,
                message: 'Find Order By Keyword Successful !!!',
                pages: Math.ceil(result.length / pageSize),
                data: final,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order Service !!!',
            };
        }
    },

    deliveryConfirm: async (orderID) => {
        try {
            checkedObjectId(orderID, 'Order ID');

            const result = await Order.findByIdAndUpdate(orderID, { $set: { isDelivered: true } });
            checkedNull(result, "Order doesn't exist !!!");

            return {
                success: true,
                status: 200,
                message: 'Delivery Order Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    paymentConfirm: async (orderID) => {
        try {
            checkedObjectId(orderID, 'Order ID');

            const result = await Order.findByIdAndUpdate(orderID, { $set: { isPaid: true } });
            checkedNull(result, "Order doesn't exist !!!");

            return {
                success: true,
                status: 200,
                message: 'Payment Order Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    cancelOrder: async (orderID) => {
        try {
            checkedObjectId(orderID, 'Order ID');
            const result = await Order.findById(orderID);
            checkedNull(result, "Order doesn't exist !!!");
            if (result.status !== 'Confirming')
                return {
                    success: false,
                    status: 400,
                    message: 'The order is in a non-cancellable status!!!',
                };

            result.status = 'Cancel';
            await result.save();

            return {
                success: true,
                status: 200,
                message: 'Cancel Order Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    returnOrder: async (orderID) => {
        try {
            checkedObjectId(orderID, 'Order ID');
            const result = await Order.findById(orderID);
            checkedNull(result, "Order doesn't exist !!!");
            if (result.status !== 'Successful')
                return {
                    success: false,
                    status: 400,
                    message: 'The order is not in returnable status!!!',
                };

            result.status = 'Return';
            await result.save();

            return {
                success: true,
                status: 200,
                message: 'Return Order Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    receivedOrder: async (orderID) => {
        try {
            checkedObjectId(orderID, 'Order ID');
            const result = await Order.findById(orderID);
            checkedNull(result, "Order doesn't exist !!!");
            if (result.status !== 'Delivering' && result.status !== 'Successful')
                return {
                    success: false,
                    status: 400,
                    message: 'The order is not in a state for pickup!!!',
                };

            result.status = 'Successful';
            await result.save();

            return {
                success: true,
                status: 200,
                message: 'Received Order Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    updateStatus: async (orderID, status) => {
        try {
            checkedObjectId(orderID, 'Order ID');

            if (status !== 'Accepted' && status !== 'Delivering' && status !== 'Successful' && status !== 'Cancel')
                return {
                    success: false,
                    status: 400,
                    message: "Order Status doesn't exist !!!",
                };
            const existOrder = await Order.findById(orderID);
            checkedNull(existOrder, "Order doesn't exist !!!");

            if (status === 'Successful') {
                // if (!existOrder.isPaid && existOrder.paymentMethod === 'VNPay') {
                //     return {
                //         success: false,
                //         status: 402,
                //         message: 'Order has not been paid yet !!!',
                //     };
                // }
                await Order.findByIdAndUpdate(orderID, {
                    $set: {
                        status: 'Successful',
                        isDelivered: true,
                        isPaid: true,
                    },
                });
            }
            if (status === 'Accepted' || status === 'Cancel') {
                if (existOrder.status !== 'Confirming') {
                    return {
                        success: false,
                        status: 400,
                        message: 'The order is in a non-cancellable status!!!',
                    };
                }
            }

            if (status === 'Delivering') {
                if (existOrder.status !== 'Accepted') {
                    return {
                        success: false,
                        status: 400,
                        message: 'The order is not in a shippable state!!!',
                    };
                }
            }

            if (status === 'Successful') {
                if (existOrder.status !== 'Delivering') {
                    return {
                        success: false,
                        status: 400,
                        message: 'The order is not in a fulfillable state!!!',
                    };
                }
            }
            await Order.findByIdAndUpdate(orderID, { $set: { status: status } });

            return {
                success: true,
                status: 200,
                message: 'Update Status Order Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    getByID: async (orderID) => {
        try {
            checkedObjectId(orderID, 'Order ID');

            const result = await Order.findById(orderID)
                .populate({ path: 'deliveryAddress', select: '-createdAt -updatedAt -__v -user' })
                .select('-updatedAt -createdAt -__v');
            checkedNull(result, "Order doesn't exist !!!");

            return {
                success: true,
                status: 200,
                message: 'Get All Order Of Status Successful!!!',
                data: result,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    getAllByStatusAndUser: async (userID, status, pageSize, pageNumber) => {
        try {
            checkedObjectId(userID, 'User ID');
            if (
                status !== 'Confirming' &&
                status !== 'Delivering' &&
                status !== 'Accepted' &&
                status !== 'Successful' &&
                status !== 'Cancel' &&
                status !== 'Return'
            )
                return {
                    success: false,
                    status: 400,
                    message: "Order Status doesn't exist !!!",
                };

            const result = await Order.find({
                user: userID,
                status: status,
            })
                .select('-updatedAt -createdAt -__v')
                .sort({ createdAt: -1 });

            const final = result.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

            return {
                success: true,
                status: 200,
                message: 'Get All Order Of User By Status Successful!!!',
                pages: Math.ceil(result.length / pageSize),
                data: final,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    getAllByStatus: async (status, pageSize, pageNumber) => {
        try {
            if (
                status !== 'Confirming' &&
                status !== 'Delivering' &&
                status !== 'Accepted' &&
                status !== 'Successful' &&
                status !== 'Cancel' &&
                status !== 'Return'
            )
                return {
                    success: false,
                    status: 400,
                    message: "Order Status doesn't exist !!!",
                };

            const result = await Order.find({ status: status })
                .select('-updatedAt -createdAt -__v')
                .sort({ createdAt: -1 });

            const final = result.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

            return {
                success: true,
                status: 200,
                message: 'Get All Order Of Status Successful!!!',
                pages: Math.ceil(result.length / pageSize),
                data: final,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    getAllByUserID: async (userID, pageSize, pageNumber) => {
        try {
            checkedObjectId(userID, 'User ID');

            const existUser = await getUserByID(userID);
            if (!existUser.success) return existUser;

            const result = await Order.find({ user: userID })
                .select('-updatedAt -createdAt -__v -user')
                .sort({ createdAt: -1 });

            const final = result.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
            return {
                success: true,
                status: 200,
                message: 'Get All Order Of User Successful!!!',
                pages: Math.ceil(result.length / pageSize),
                data: final,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    getAll: async (pageSize, pageNumber) => {
        try {
            const result = await Order.find().select('-updatedAt -createdAt -__v').sort({ createdAt: -1 });
            const final = result.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

            return {
                success: true,
                status: 200,
                message: 'Get All Order Successful !!!',
                pages: Math.ceil(result.length / pageSize),
                data: final,
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order !!!',
            };
        }
    },

    create: async (body) => {
        try {
            checkedObjectId(body.userID, 'User ID');

            const existUser = await getUserByID(body.userID);
            if (!existUser.success) return existUser;

            const listCheck = await Promise.all(
                body.items.map((item) => {
                    let result = checkedQuantity(item.product, item.color, item.size, item.quantity);
                    return result;
                }),
            );

            const isStocking = listCheck.reduce((arc, cur) => {
                return {
                    success: arc && cur.success,
                    status: cur.status,
                    message: cur.message,
                };
            }, true);
            if (!isStocking.success) return isStocking;

            const newOrder = new Order({
                user: body.userID,
                items: body.items,
                paymentMethod: body.paymentMethod,
                total: body.total,
                deliveryAddress: body.deliveryAddress,
            });
            await newOrder.save();

            await Promise.all(
                body.items.map((item) => {
                    removeFromCart(body.userID, item.product);
                    reduceQuantity(item.product, item.color, item.size, item.quantity);
                    updateSoldOfProduct(item.product, item.quantity);
                }),
            );

            await updateSpentByUserID(body.userID, body.total);

            return {
                success: true,
                status: 201,
                message: 'Create New Order Successful!!!',
            };
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || 'Something went wrong in Order Service !!!',
            };
        }
    },
};
