import { Order } from '@/types/type';
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
    getOrderByOrderId: (orderId: string) => {
        const url = `/orders/${orderId}`;
        return axios.get(url);
    },
    createOrder: (item: Order) => {
        const url = '/orders';
        return axios.post(url, item);
    },
    updateOrderStatusByOrderId: (orderId: string, status: string) => {
        const url = `/orders/${orderId}`;
        return axios.patch(url, status);
    },
    cancelOrderByOrderId: (orderId: string) => {
        const url = `/orders/${orderId}/cancel`;
        return axios.patch(url);
    },
    comfirmPaymentOrderByOrderId: (orderId: string) => {
        const url = `/orders/${orderId}/paid`;
        return axios.patch(url);
    },
};

export default ordersApi;
