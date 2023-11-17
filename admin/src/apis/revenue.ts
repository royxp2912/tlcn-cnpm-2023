import { day } from '@/types/type';
import axios from '@/utils/axios';

const revenueApi = {
    getRevenueToday: () => {
        const url = '/revenue/today';
        return axios.get(url);
    },
    getRevenueThisMonth: () => {
        const url = '/revenue/thisMonth';
        return axios.get(url);
    },
    getDetailRevenueOfMonth: (item: day) => {
        const url = '/revenue/detailOfMonth';
        const month = item.month;
        const year = item.year;
        return axios.get(url, {
            params: {
                month: month,
                year: year,
            },
        });
    },
    getRevenueThisWeek: () => {
        const url = '/revenue/thisWeek';
        return axios.get(url);
    },
    getDetailRevenueThisWeek: () => {
        const url = '/revenue/detailThisWeek';
        return axios.get(url);
    },
    getToTalUser: () => {
        const url = '/revenue/users/today';
        return axios.get(url);
    },
    getToTalUserThisMonth: () => {
        const url = '/revenue/users/thisMonth';
        return axios.get(url);
    },
    getTotalUserThisWeek: () => {
        const url = '/revenue/users/thisWeek';
        return axios.get(url);
    },
    getDetailTotalNewUserOfMonth: (item: day) => {
        const url = '/revenue/users/detailOfMonth';
        const month = item.month;
        const year = item.year;
        return axios.get(url, {
            params: {
                month: month,
                year: year,
            },
        });
    },
    getTop5UserThisMonth: () => {
        const url = '/revenue/users/topThisMonth';
        return axios.get(url);
    },
    getTotalOrderToday: () => {
        const url = '/revenue/orders/today';
        return axios.get(url);
    },
    getTotalOrderThisWeek: () => {
        const url = '/revenue/orders/thisWeek';
        return axios.get(url);
    },
    getTotalOrderThisMonth: () => {
        const url = '/revenue/orders/thisMonth';
        return axios.get(url);
    },
    getDetailTotalOrderThisWeek: () => {
        const url = '/revenue/orders/detailThisWeek';
        return axios.get(url);
    },
    getDetailTotalOrderOfMonth: (item: day) => {
        const url = '/revenue/orders/detailOfMonth';
        const month = item.month;
        const year = item.year;
        return axios.get(url, {
            params: {
                month: month,
                year: year,
            },
        });
    },
    getTotalProductSoldToday: () => {
        const url = '/revenue/products/today';
        return axios.get(url);
    },
    getTotalProductSoldThisWeek: () => {
        const url = '/revenue/products/thisWeek';
        return axios.get(url);
    },
    getTotalProductSoldThisMonth: () => {
        const url = '/revenue/products/thisMonth';
        return axios.get(url);
    },
    getTop5TotalProductSoldThisMonth: () => {
        const url = '/revenue/products/topThisMonth';
        return axios.get(url);
    },
    getDetailTotalProductSoldOfMonth: (item: day) => {
        const url = '/revenue/products/detailOfMonth';
        const month = item.month;
        const year = item.year;
        return axios.get(url, {
            params: {
                month: month,
                year: year,
            },
        });
    },
};

export default revenueApi;
