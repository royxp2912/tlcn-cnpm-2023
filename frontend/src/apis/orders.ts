import { Order, orderStatus, updateOrder } from '@/types/type';
import axios from '../utils/axios';

const ordersApi = {
    getAllOrder: () => {
        const url = '/orders';
        return axios.get(url);
    },
    getAllOrderByUserId: (userId: string) => {
        const url = '/orders/user';
        return axios.get(url, {
            params: {
                user: userId,
                pageSize: 10,
            },
        });
    },
    getAllOrderByUserAndStatus: (item: orderStatus) => {
        const url = `/orders`;
        return axios.get(url, {
            params: {
                status: item.status,
                user: item.user,
            },
        });
    },
    getOrderByOrderId: (order: string) => {
        const url = '/orders/detail';
        return axios.get(url, { data: { order } });
    },
    createOrder: (item: Order) => {
        const url = '/orders';
        const data = {
            items: item.items,
            userID: item.userID,
            deliveryAddress: item.deliveryAddress,
            paymentMethod: item.paymentMethod,
            total: item.total,
        };
        console.log(data);
        return axios.post(url, data);
    },
    cancelOrderByOrderId: (order: string) => {
        const url = '/orders/cancel';
        return axios.patch(url, order);
    },
    comfirmPaymentOrderByOrderId: (order: string) => {
        const url = '/orders/paid';
        return axios.patch(url, order);
    },
    returnOrder: (order: string) => {
        const url = '/orders/return';
        return axios.patch(url, order);
    },
    receivedOrder: (order: string) => {
        const url = '/orders/received';
        return axios.patch(url, order);
    },
};

export default ordersApi;
