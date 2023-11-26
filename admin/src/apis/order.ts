import { Order, deleteOrder, updateOrder } from '@/types/type';
import axios from '@/utils/axios';

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
    getAllOrderByOrderStatus: (status: string) => {
        const url = `/orders?status=${status}`;
        return axios.get(url);
    },
    getOrderByOrderId: (order: string) => {
        const url = '/orders/detail';
        return axios.get(url, { params: { order: order } });
    },
    createOrder: (item: Order) => {
        const url = '/orders';
        const data = {
            items: item.items,
            userID: item.user,
            deliveryAddress: item.deliveryAddress,
            paymentMethod: item.paymentMethod,
            total: item.total,
        };
        console.log(data);
        return axios.post(url, data);
    },
    updateOrderStatusByOrderId: (order: updateOrder) => {
        const url = '/orders';
        return axios.patch(url, order);
    },
    cancelOrderByOrderId: (order: string) => {
        const url = `/orders/cancel`;
        return axios.patch(url, order);
    },
    comfirmPaymentOrderByOrderId: (order: string) => {
        const url = `/orders/paid`;
        return axios.patch(url, order);
    },
    deleteAllOrderByUserId: (item: deleteOrder) => {
        const url = `/orders/user/${item.user}`;
        return axios.delete(url);
    },
    deleteAllOrderByOrderId: (order: string) => {
        const url = `/orders/${order}`;
        return axios.delete(url);
    },
};

export default ordersApi;
