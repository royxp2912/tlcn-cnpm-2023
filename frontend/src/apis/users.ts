import { User, updateEmail, updatePassword, upAvatar, upUser } from '@/types/type';
import axios from '../utils/axios';

const usersApi = {
    getUser: (user: string) => {
        const url = '/users/detail';
        return axios.get(url, { params: { user: user } });
    },
    getAllUser: () => {
        const url = '/users';
        return axios.get(url);
    },
    updateUser: (user: upUser) => {
        const url = '/users';
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
    uploadAvatar: (item: upAvatar) => {
        const url = '/users/upload-avatar';
        return axios.patch(url, item);
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
    updateUserPasswordByUserId: (item: updatePassword) => {
        const url = '/users/password';
        return axios.patch(url, item);
    },
    updateUserEmailByUserId: (email: updateEmail) => {
        const url = '/users/email';
        return axios.patch(url, email);
    },
};

export default usersApi;
