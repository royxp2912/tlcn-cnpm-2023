import { ItemCart } from '@/types/type';
import axios from '../utils/axios';

const cartsApi = {
    getCartByUserId: (userId: string) => {
        const url = `/carts/${userId}`;
        return axios.get(url);
    },
    createCart: (user: string) => {
        const url = '/carts';
        return axios.post(url, user);
    },
    addItemToCartByUserId: (userId: string, item: ItemCart) => {
        const url = `/carts/${userId}/addToCart`;
        return axios.post(url, item);
    },
    removeItemFromCartByUserId: (userid: string, productId: string) => {
        const url = `/carts/${userid}/remove/${productId}`;
        return axios.delete(url);
    },
};

export default cartsApi;
