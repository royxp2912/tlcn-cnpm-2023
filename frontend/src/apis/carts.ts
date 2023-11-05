import { ItemCart, RemoveItemCart } from '@/types/type';
import axios from '../utils/axios';

const cartsApi = {
    getCartByUserId: (userId: string) => {
        const url = `/carts`;
        return axios.get(url);
    },
    createCart: (user: string) => {
        const url = '/carts';
        return axios.post(url, user);
    },
    addItemToCartByUserId: (item: ItemCart) => {
        const url = `/carts/addToCart`;
        return axios.post(url, item);
    },
    removeItemFromCartByUserId: (item: RemoveItemCart) => {
        const url = '/carts/remove';
        return axios.delete(url, { data: { item } });
    },
};

export default cartsApi;
