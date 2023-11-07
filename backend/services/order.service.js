import Order from '../models/Order.js';
import { checkedObjectId } from '../utils/checkedOthers.js';
import { checkedNull } from '../utils/handel_null.js';
import { getUserByID } from './user.service.js';
import { removeFromCart } from './cart.service.js';
import { reduceQuantity } from './variant.service.js';
import { updateSoldOfProduct } from './product.service.js';

export const {
    create,
    getAll,
    getByID,
    cancelOrder,
    updateStatus,
    findByKeyword,
    getAllByUserID,
    getAllByStatus,
    paymentConfirm,
    deliveryConfirm,
} = {

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
                })
                    .limit(pageSize)
                    .skip(pageSize * (pageNumber - 1))
                    .select('-createdAt -updatedAt -__v -user -deliveryAddress');
            } else {
                result = await Order.find({
                    $or: [
                        { 'items.name': { $regex: keyword, $options: 'i' } },
                        { total: keyword },
                        { status: { $regex: keyword, $options: 'i' } },
                        { paymentMethod: { $regex: keyword, $options: 'i' } },
                    ],
                })
                    .limit(pageSize)
                    .skip(pageSize * (pageNumber - 1))
                    .select('-createdAt -updatedAt -__v -user -deliveryAddress');
            }

            return {
                success: true,
                status: 200,
                message: 'Find Order By Keyword Successful !!!',
                data: result,
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

            const result = await Order.findByIdAndUpdate(orderID, { $set: { status: 'Cancel' } });
            checkedNull(result, "Order doesn't exist !!!");

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

    updateStatus: async (orderID, status) => {
        try {
            checkedObjectId(orderID, 'Order ID');

            if (
                status !== 'Confirmming' &&
                status !== 'Delivering' &&
                status !== 'Successful' &&
                status !== 'Cancel' &&
                status !== 'Return'
            )
                return {
                    success: false,
                    status: 400,
                    message: "Order Status doesn't exist !!!",
                };
            const existOrder = await Order.findById(orderID);
            checkedNull(existOrder, "Order doesn't exist !!!");

            if (status === 'Successful') {
                if (!existOrder.isPaid && existOrder.paymentMethod === 'VNPay') {
                    return {
                        success: false,
                        status: 402,
                        message: 'Order has not been paid yet !!!',
                    };
                } else {
                    await Order.findByIdAndUpdate(orderID, {
                        $set: {
                            status: 'Successful',
                            isDelivered: true,
                            isPaid: true,
                        },
                    });
                }
            } else {
                await Order.findByIdAndUpdate(orderID, { $set: { status: status } });
            }

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

    getAllByStatus: async (status, pageSize, pageNumber) => {
        try {
            if (
                status !== 'Confirming' &&
                status !== 'Delivering' &&
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
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .select('-updatedAt -createdAt -__v');

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

    getAllByUserID: async (userID, pageSize, pageNumber) => {
        try {
            checkedObjectId(userID, 'User ID');

            const existUser = await getUserByID(userID);
            if (!existUser.success) return existUser;

            const result = await Order.find({ user: userID })
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .select('-updatedAt -createdAt -__v -user')
                .sort({ createdAt: -1 });

            return {
                success: true,
                status: 200,
                message: 'Get All Order Of User Successful!!!',
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

    getAll: async (pageSize, pageNumber) => {
        try {
            const result = await Order.find()
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .select('-updatedAt -createdAt -__v')
                .sort({ createdAt: -1 });

            return {
                success: true,
                status: 200,
                message: 'Get All Order Successful !!!',
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

    create: async (body) => {
        try {
            checkedObjectId(body.userID, "User ID");

            const existUser = await getUserByID(body.userID);
            if (!existUser.success) return existUser;

            const newOrder = new Order({
                user: body.userID,
                items: body.items,
                paymentMethod: body.paymentMethod,
                total: body.total,
                deliveryAddress: body.deliveryAddress,
            });
            await newOrder.save();

            await Promise.all(body.items.map((item) => {
                removeFromCart(body.userID, item.product);
                reduceQuantity(item.product, item.color, item.size, item.quantity);
                updateSoldOfProduct(item.product, item.quantity);
            }));

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
