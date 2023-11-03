import { Password, User } from '@/types/type';
import axios from '../utils/axios';

const usersApi = {
    getUser: (userId: string) => {
        const url = `/users/${userId}`;
        return axios.get(url);
    },
    getAllUser: () => {
        const url = '/users/get/all';
        return axios.get(url);
    },
    updateUser: (userId: string, user: User) => {
        const url = `/users/update/${userId}`;
        return axios.put(url, user);
    },
    lockUser: (userId: string) => {
        const url = `/users/lock/${userId}`;
        return axios.patch(url);
    },
    unlockUser: (userId: string) => {
        const url = `/users/unlock/${userId}`;
        return axios.patch(url);
    },
    uploadAvatar: (userId: string, img: string) => {
        const url = `/users/upload-avatar/${userId}`;
        return axios.patch(url, img);
    },
    deleteUser: (userId: string) => {
        const url = `/users/delete/${userId}`;
        return axios.delete(url);
    },
    getAllUserByStatus: (status: string) => {
        const url = `/users?status=${status}`;
        return axios.get(url);
    },
    findUserByKeyword: (keyword: string, pageNum: Number) => {
        const url = `/users/search/keyword?pageNumber=${pageNum}`;
        return axios.get(url, { data: { keyword } });
    },
    updateUserPasswordByUserId: (userId: string, password: Password) => {
        const url = `/users/email/${userId}`;
        return axios.patch(url, password);
    },
};

export default usersApi;
