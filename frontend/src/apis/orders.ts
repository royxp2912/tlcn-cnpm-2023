import { Order, updateOrder } from '@/types/type';
import axios from '../utils/axios';

const ordersApi = {
    getAllOrder: () => {
        const url = '/orders';
        return axios.get(url);
    },
    getAllOrderByUserId: (userId: string) => {
        const url = `/orders/user/${userId}`;
        return axios.get(url);
    },
    getAllOrderByOrderStatus: (status: string) => {
        const url = `/orders?status=${status}`;
        return axios.get(url);
    },
    getOrderByOrderId: (order: string) => {
        const url = '/orders/detail';
        return axios.get(url, { data: { order } });
    },
    createOrder: (item: Order) => {
        const url = '/orders';
        return axios.post(url, item);
    },
    updateOrderStatusByOrderId: (order: updateOrder) => {
        const url = `/orders/${order.orderId}`;
        return axios.patch(url, order);
    },
    cancelOrderByOrderId: (order: updateOrder) => {
        const url = `/orders/cancel`;
        const id = order.orderId;
        return axios.patch(url, id);
    },
    comfirmPaymentOrderByOrderId: (order: string) => {
        const url = `/orders/paid`;
        return axios.patch(url, order);
    },
};

export default ordersApi;
