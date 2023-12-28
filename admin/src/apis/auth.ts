import { SignIn } from '@/types/type';
import axios from '@/utils/axios';

const authApi = {
    signIn: (user: SignIn) => {
        const url = '/auth/login';
        return axios.post(url, user);
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
