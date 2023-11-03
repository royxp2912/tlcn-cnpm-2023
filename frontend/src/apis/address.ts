import { Address } from '@/types/type';
import axios from '../utils/axios';

const addressApi = {
    getAllAddressByUserId: (userId: string) => {
        const url = `/address/user/${userId}`;
        return axios.get(url);
    },
    getAddressByAddressId: (addressId: string) => {
        const url = `/address/${addressId}`;
        return axios.get(url);
    },
    createAddress: (address: Address) => {
        const url = '/address';
        return axios.post(url, address);
    },
    updateAddressByAddressId: (addressId: string, address: Address) => {
        const url = `/address/${addressId}`;
        return axios.put(url, address);
    },
    setDefaultAddressByAddressId: (addressId: string) => {
        const url = `/address/${addressId}/default`;
        return axios.patch(url);
    },
    unsetDefaultAddressByAddressId: (addressId: string) => {
        const url = `/address/${addressId}/unDefault`;
        return axios.patch(url);
    },
    deleteAllAddressByUserId: (userId: string) => {
        const url = `/address/user/${userId}`;
        return axios.delete(url);
    },
    deleteAddressByAddressId: (addressId: string) => {
        const url = `/address/${addressId}`;
        return axios.delete(url);
    },
};

export default addressApi;
