import { Product, findProduct, productByCate } from '@/types/type';
import axios from '../utils/axios';

const productsApi = {
    getAllProduct: () => {
        const url = '/products';
        return axios.get(url);
    },
    getProductById: (product: string) => {
        const url = '/products/detail';
        return axios.get(url, { params: { product: product } });
    },
    getAllProductByCateId: (category: productByCate) => {
        const url = '/products/category';
        return axios.get(url, {
            params: {
                category: category.category,
                sort: category.sort,
                brand: category.brand,
                color: category.color,
                pageSize: 6,
                pageNumber: category.pageNumber,
            },
        });
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
    findProductByKeyword: (item: findProduct) => {
        const url = '/products/search/keyword';

        return axios.get(url, {
            params: {
                keyword: item.keyword,
                brand: item.brand,
                color: item.color,
                sort: item.sort,
                pageNumber: item.pageNumber,
                pageSize: 5,
            },
        });
    },

    getProductHotDeal: () => {
        const url = '/products/search/hotDeal';
        return axios.get(url);
    },
    getQtyOfBrand: () => {
        const url = '/products/brand';
        return axios.get(url);
    },
    getQtyHotDealOfBrand: () => {
        const url = 'products/brand/hotDeal';
        return axios.get(url);
    },
    getAllProductBy: (category: productByCate) => {
        const url = '/products/category';
        return axios.get(url, {
            params: { category: category.category, pageSize: 6, pageNumber: category.pageNumber },
        });
    },
};

export default productsApi;
