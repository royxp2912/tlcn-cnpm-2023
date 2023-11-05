import { getSizeOfColor } from '@/types/type';
import axios from '../utils/axios';

const variantsApi = {
    getAllVariantByProductId: (product: string) => {
        const url = '/variants/product';
        return axios.get(url, { data: { product } });
    },
    getVariantById: (variant: string) => {
        const url = '/variants';
        return axios.get(url, { data: { variant } });
    },
    getColorOfSize: (item: getSizeOfColor) => {
        const url = '/variants/product/size';
        return axios.get(url, { data: { item } });
    },
};

export default variantsApi;
