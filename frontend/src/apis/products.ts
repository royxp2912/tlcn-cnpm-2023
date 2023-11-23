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
            params: { category: category.category, pageSize: 6, pageNumber: category.pageNumber },
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
        const items = {
            keywword: item.keyword,
            sort: item.sort,
            pageSize: item.pageSize,
            pageNumber: item.pageNumber,
        };
        return axios.get(url, { data: { items } });
    },
    findProductByColor: (item: findProduct) => {
        const url = `/products/search/color`;
        const items = {
            color: item.color,
            sort: item.sort,
            pageSize: item.pageSize,
            pageNumber: item.pageNumber,
        };
        return axios.get(url, { data: { items } });
    },
    getProductHotDeal: () => {
        const url = '/products/search/hotDeal';
        return axios.get(url, { params: { pageSize: 4 } });
    },
    getQtyOfBrand: () => {
        const url = '/products/brand';
        return axios.get(url);
    },
    getQtyHotDealOfBrand: () => {
        const url = 'products/brand/hotDeal';
        return axios.get(url);
    },
};

export default productsApi;
