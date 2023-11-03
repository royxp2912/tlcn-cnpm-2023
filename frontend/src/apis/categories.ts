import { Category } from '@/types/type';
import axios from '../utils/axios';

const categoriesApi = {
    getAllCategory: () => {
        const url = '/categories';
        return axios.get(url);
    },
    getCategoryById: (categoryId: string) => {
        const url = `/categories/${categoryId}`;
        return axios.get(url);
    },
    createCategory: (category: Category) => {
        const url = '/categories';
        return axios.post(url, category);
    },
    updateCateName: (categoryId: string, name: string) => {
        const url = `/categories/updateName/${categoryId}`;
        return axios.patch(url, name);
    },
    updateCateImg: (categoryId: string, img: string) => {
        const url = `/categories/updateImg/${categoryId}`;
        return axios.patch(url, img);
    },
    deleteCateById: (categoryId: string) => {
        const url = `/categories/${categoryId}`;
        return axios.delete(url);
    },
};

export default categoriesApi;
