import { Product } from '@/types/type';
import axios from '../utils/axios';

const productsApi = {
    getAllProduct: () => {
        const url = '/products';
        return axios.get(url);
    },
    getProductById: (productId: string) => {
        const url = `/products/${productId}`;
        return axios.get(url);
    },
    getAllProductByCateId: (categoryId: string) => {
        const url = `/products/category/${categoryId}`;
        return axios.get(url);
    },
    createProduct: (product: Product) => {
        const url = `/products`;
        return axios.post(url, product);
    },
    updateProductByProductId: (productId: string) => {
        const url = `/products/update/${productId}`;
        return axios.patch(url);
        // TODO admin
    },
    deleteProductByProductId: (prodcutId: string) => {
        const url = `/products/${prodcutId}`;
        return axios.delete(url);
    },
    deleteAllProduct: () => {
        const url = '/products';
        return axios.delete(url);
    },
    findProductByKeyword: (keyword: string, sort: string) => {
        let url = '/products/search/keyword';
        if (sort) {
            url = `/products/search/keyword?sort=${sort}`;
        }

        return axios.get(url, { data: { keyword } });
    },
    findProductByColor: (color: string, sort: string) => {
        const url = `/products/search/color?sort=${sort}`;
        return axios.get(url, { data: { color } });
    },
};

export default productsApi;
