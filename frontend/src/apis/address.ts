import { Address } from '@/types/type';
import axios from '../utils/axios';

const addressApi = {
    getAllAddressByUserId: (user: string) => {
        const url = '/address/user';
        return axios.get(url, { params: { user: user } });
    },
    getAddressByAddressId: (address: string) => {
        const url = '/address/detail';
        return axios.get(url, { data: { address } });
    },
    createAddress: (address: Address) => {
        const url = '/address';
        return axios.post(url, address);
    },
    updateAddressByAddressId: (address: Address) => {
        const url = '/address';
        return axios.put(url, address);
    },
    setDefaultAddressByAddressId: (address: Address) => {
        const url = `/address/default`;
        const id = address.id;
        return axios.patch(url, id);
    },
    unsetDefaultAddressByAddressId: (address: Address) => {
        const url = `/address/unDefault`;
        const id = address.id;
        return axios.patch(url, id);
    },
    deleteAllAddressByUserId: (user: string) => {
        const url = '/address/user';
        return axios.delete(url, { data: { user } });
    },
    deleteAddressByAddressId: (address: Address) => {
        const url = '/address';
        const id = address.id;
        return axios.delete(url, { data: { id } });
    },
};

export default addressApi;
