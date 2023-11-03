import axios from '../utils/axios';

const variantsApi = {
    getAllVariantByProductId: (productId: string) => {
        const url = `/variants/product/${productId}`;
        return axios.get(url);
    },
    getVariantById: (variantId: string) => {
        const url = `/variants/${variantId}`;
        return axios.get(url);
    },
};

export default variantsApi;
