import { SignIn, SignUp } from '@/types/type';
import axios from '../utils/axios';

const authApi = {
    signIn: (user: SignIn) => {
        const url = '/auth/login';
        return axios.post(url, user);
    },

    signUp: (user: SignUp) => {
        const url = '/auth/register';
        return axios.post(url, user);
    },

    sendCode: (email: string) => {
        const url = '/auth/sendCode';
        return axios.post(url, email);
    },

    refreshToken: () => {
        const url = '/auth/refresh-token';
        return axios.put(url);
    },
    logout: (userId: string) => {
        const url = `/auth/logout/${userId}`;
        return axios.delete(url);
    },
};

export default authApi;
