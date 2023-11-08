import { Cart, ItemCart, RemoveItemCart, itemCartRandomVari } from '@/types/type';
import axios from '../utils/axios';

const cartsApi = {
    getCartByUserId: (userId: string) => {
        const url = `/carts`;
        return axios.get(url, { params: { user: userId } });
    },
    createCart: (user: string) => {
        const url = '/carts';
        return axios.post(url, user);
    },
    addItemToCartByUserId: (item: ItemCart) => {
        const url = `/carts/addToCart`;
        const cart = {
            user: item.user,
            product: item.product,
            image: item.image,
            name: item.name,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
        };
        return axios.post(url, cart);
    },
    removeItemFromCartByUserId: (item: RemoveItemCart) => {
        const url = '/carts/remove';

        return axios.delete(url, {
            params: {
                user: item.user,
                product: item.product,
            },
        });
    },
    addItemToCartRandomVariant: (item: itemCartRandomVari) => {
        const url = '/carts/addToCart/randomVar';
        return axios.post(url, item);
    },
};

export default cartsApi;
