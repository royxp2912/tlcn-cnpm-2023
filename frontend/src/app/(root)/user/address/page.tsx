'use client';
import React, { useEffect, useState } from 'react';
import UserNav from '@/components/shared/UserNav';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Address, User } from '@/types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getAllAddressByUserId } from '@/slices/addressSlice';
import AddAddress from '@/components/form/AddAddress';

const Address = () => {
    const userString = localStorage.getItem('user');
    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { address }: { address: Address[] } = useSelector((state: any) => state.address);
    useEffect(() => {
        dispatch(getAllAddressByUserId(id));
    }, [id]);
    console.log(address);
    return (
        <div className="flex justify-center px-20 mt-10 gap-5">
            <UserNav />

            <div className="flex flex-col w-[1100px] shadow-lg rounded-lg gap-[10px] py-10 px-[50px]">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex flex-col">
                        <span className="font-bold text-xl">Delivery Address</span>
                        <span className="font-bold">Where you can receive your orders!!!</span>
                    </div>
                    <div
                        onClick={() => setOpen(true)}
                        className="w-[186px] h-10 bg-blue bg-opacity-20 text-blue flex gap-1 items-center justify-center rounded-full font-medium"
                    >
                        <AddLocationAltOutlinedIcon />
                        <span>New Address</span>
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    {address.map((item: Address, index: number) => (
                        <div
                            key={item._id}
                            className="border border-black border-opacity-20 px-10 pt-10 pb-5 rounded-full relative"
                        >
                            <span className="opacity-60 top-[-14px] left-[100px] absolute block w-[100px] h-5 bg-white text-center">
                                Address {index + 1}
                            </span>
                            <div className="flex gap-[10px] absolute top-[-14px] right-20">
                                <div className="text-blue px-1 bg-white">
                                    <LoopOutlinedIcon />
                                </div>
                                <div className="text-red px-1 bg-white">
                                    <CloseOutlinedIcon />
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
            {open && <AddAddress setOpen={setOpen} />}
        </div>
    );
};

export default Address;
