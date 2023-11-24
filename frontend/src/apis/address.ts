import { Address, AddressLess, UpdateAddress } from '@/types/type';
import axios from '../utils/axios';

const addressApi = {
    getAllAddressByUserId: (user: string) => {
        const url = '/address/user';
        const pageSize = 5;
        const pageNumber = 1;
        return axios.get(url, { params: { user: user, pageSize: pageSize, pageNumber: pageNumber } });
    },
    getAddressByAddressId: (address: string) => {
        const url = '/address/detail';
        const pageSize = 5;
        const pageNumber = 5;
        return axios.get(url, { params: { address } });
    },
    createAddress: (address: AddressLess) => {
        const url = '/address';
        return axios.post(url, address);
    },
    updateAddressByAddressId: (address: UpdateAddress) => {
        const url = '/address';
        return axios.put(url, address);
    },
    setDefaultAddressByAddressId: (address: Address) => {
        const url = `/address/default`;
        const id = address._id;
        return axios.patch(url, id);
    },
    unsetDefaultAddressByAddressId: (address: Address) => {
        const url = `/address/unDefault`;
        const id = address._id;
        return axios.patch(url, id);
    },
    deleteAllAddressByUserId: (user: string) => {
        const url = '/address/user';
        return axios.delete(url, { params: { user } });
    },
    deleteAddressByAddressId: (address: Address) => {
        const url = '/address';
        const id = address._id;
        return axios.delete(url, { params: { id } });
    },
};

export default addressApi;
