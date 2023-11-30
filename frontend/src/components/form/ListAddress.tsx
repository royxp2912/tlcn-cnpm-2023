'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';

import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import { Address } from '@/types/type';
import AddAddress from './AddAddress';

type Props = {
    setLoad: Dispatch<SetStateAction<boolean>>;
    address: Address[];
    setChange: Dispatch<SetStateAction<boolean>>;
};

const unProps = {
    update: false,
    setUpdate: () => {},
    addressDetail: {
        _id: '',
        user: '',
        receiver: '',
        phone: '',
        province: '',
        districts: '',
        wards: '',
        specific: '',
        default: false,
    },
    addressId: '',
};

const ListAddress = ({ setLoad, address, setChange }: Props) => {
    const [open, setOpen] = useState(false);

    const handleDefault = async (id: string) => {
        const { data } = await axios.patch('/address/default', {
            address: id,
        });
        if (data.success) {
            toast.success('Set default address success');
            setLoad((prev) => !prev);
            setChange(false);
        } else {
            toast.error('Set default address fail');
        }
    };

    return (
        <div className="modal">
            <div className="flex flex-col w-[1100px] shadow-lg rounded-lg gap-[10px] py-10 px-[50px] bg-white">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex flex-col">
                        <span className="font-bold text-xl">Delivery Address</span>
                        <span className="font-bold">Where you can receive your orders!!!</span>
                    </div>
                    <div className="flex gap-2">
                        <div
                            onClick={() => setOpen(true)}
                            className="w-[186px] h-10 cursor-pointer bg-blue bg-opacity-20 text-blue flex gap-1 items-center justify-center rounded-full font-medium hover:bg-opacity-100 hover:text-white"
                        >
                            <AddLocationAltOutlinedIcon />
                            <span>New Address</span>
                        </div>
                        <button
                            className="w-[186px] h-10 bg-red bg-opacity-50 text-white rounded-full hover:bg-opacity-100"
                            onClick={() => setChange(false)}
                        >
                            Back
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-10 h-[300px] pt-5 overflow-y-scroll">
                    {address.map((item, index: number) => (
                        <div
                            key={item._id}
                            className={`border ${
                                item.default ? 'border-[#FF00B4]' : 'border-black'
                            } border-opacity-20 px-10 pt-8 pb-6 rounded-full relative`}
                        >
                            <span
                                className={`opacity-60 top-[-14px] left-[100px] absolute block w-[100px] h-5 bg-white text-center ${
                                    item.default ? 'text-[#FF00B4]' : ''
                                }`}
                            >
                                Address {index + 1}
                            </span>
                            <div className="flex gap-[10px] absolute top-[-14px] right-20">
                                <div
                                    className="text-[#FF00B4] px-1 bg-white cursor-pointer hover:opacity-60"
                                    onClick={() => handleDefault(item._id)}
                                >
                                    <DoneRoundedIcon />
                                </div>
                            </div>
                            <div className="ml-5 flex items-center gap-[180px] font-bold text-lg">
                                <div className="flex gap-3">
                                    <span>Receiver:</span>
                                    <span>{item.receiver}</span>
                                </div>
                                <div className="flex gap-3">
                                    <span>Phone:</span>
                                    <span>{item.phone}</span>
                                </div>
                            </div>
                            <div className="ml-5 mt-[30px] mb-5 font-medium flex gap-[60px]">
                                <div className="flex gap-3">
                                    <span>Province / City:</span>
                                    <span>{item.province}</span>
                                </div>
                                <div className="flex gap-3">
                                    <span>District:</span>
                                    <span>{item.districts}</span>
                                </div>
                                <div className="flex gap-3">
                                    <span>Wards:</span>
                                    <span>{item.wards}</span>
                                </div>
                            </div>
                            <span className="ml-5 font-medium">Specific Address: {item.specific}</span>
                        </div>
                    ))}
                </div>
            </div>
            {open && <AddAddress setOpen={setOpen} {...unProps} setLoad={setLoad} />}
        </div>
    );
};

export default ListAddress;
