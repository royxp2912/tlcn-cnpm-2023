'use client';
import React, { useEffect, useState } from 'react';
import UserNav from '@/components/shared/UserNav';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import type { Address, District, Province, User, Ward } from '@/types/type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getAddressByAddressId, getAllAddressByUserId } from '@/slices/addressSlice';
import AddAddress from '@/components/form/AddAddress';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';

const Address = () => {
    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
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
    const [load, setLoad] = useState(false);
    const [update, setUpdate] = useState(false);
    const [fake, setFake] = useState(false);
    const [addressId, setAddressId] = useState('');
    const [province, setProvince] = useState<Province[]>();
    const [district, setDistrict] = useState<District[]>();
    const [ward, setWard] = useState<Ward[]>();
    const [provinceID, setProvinceID] = useState<string>('');
    const [districtID, setDistrictID] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const { address, addressDetail }: { address: Address[]; addressDetail: Address } = useSelector(
        (state: any) => state.address,
    );
    useEffect(() => {
        dispatch(getAllAddressByUserId(id));
    }, [id, load]);

    const handleDefault = async (adsId: string) => {
        const { data } = await axios.patch(`/deliveryAddress/default/${adsId}`);
        if (data.success) {
            toast.success('Set default address success');
            setLoad((prev) => !prev);
        } else {
            toast.error('Set default address fail');
        }
    };

    const handleDelete = async (adsId: string) => {
        const { data } = await axios.delete(`/deliveryAddress/${adsId}`);
        if (data.success) {
            toast.success('Delete address success');
            setLoad((prev) => !prev);
        } else {
            toast.error('Delete address fail');
        }
    };

    const handleUpdate = (adsId: string) => {
        setAddressId(adsId);
        setUpdate(true);
    };
    useEffect(() => {
        if (addressId !== '') {
            const fetchData = async () => {
                const res: any = await dispatch(getAddressByAddressId(addressId));
                if (res.payload.status === 200) {
                    const selectedProvince = province?.find(
                        (item) => item.province_name === res.payload.data.data.province,
                    );
                    if (selectedProvince) {
                        setProvinceID(selectedProvince.province_id);
                        const data = await axios.get(
                            `https://vapi.vnappmob.com/api/province/district/${selectedProvince.province_id}`,
                        );
                        if (data.status === 200) {
                            setDistrict(data.data.results);

                            const selectedDistrict: District = data.data.results?.find(
                                (item: District) => item.district_name === res.payload.data.data.districts,
                            );
                            console.log(selectedDistrict);
                            if (selectedDistrict) {
                                setDistrictID(selectedDistrict.district_id);
                                const data = await axios.get(
                                    `https://vapi.vnappmob.com/api/province/ward/${selectedDistrict.district_id}`,
                                );
                                if (data.status === 200) {
                                    setWard(data.data.results);
                                    setOpen(true);
                                }
                            }
                        }
                    }
                }
            };
            fetchData();
        }
    }, [addressId]);
    useEffect(() => {
        const fetchProvince = async () => {
            const data = await axios.get('https://vapi.vnappmob.com/api/province');
            setProvince(data.data.results);
            // console.log(data);
        };
        fetchProvince();
    }, []);

    // useEffect(() => {
    //     if (update) {
    //         const fetchDistrict = async () => {
    //             const { data } = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceID}`);
    //             setDistrict(data.results);
    //         };
    //         fetchDistrict();
    //     }
    // }, [addressId]);
    return (
        <div className="flex justify-center px-20 mt-10 gap-5">
            <UserNav />

            <div className="flex flex-col w-[1100px] shadow-lg rounded-lg gap-[10px] py-10 px-[50px]">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex flex-col">
                        <span className="font-bold text-base">Delivery Address</span>
                        <span className="font-bold">Where you can receive your orders!!!</span>
                    </div>
                    <div
                        onClick={() => setOpen(true)}
                        className="w-[186px] h-10 cursor-pointer bg-blue bg-opacity-20 text-blue flex gap-1 items-center justify-center rounded-full font-medium hover:bg-opacity-100 hover:text-white"
                    >
                        <AddLocationAltOutlinedIcon />
                        <span>New Address</span>
                    </div>
                </div>
                <div className="flex flex-col gap-10">
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
                                    className="text-blue px-1 bg-white cursor-pointer hover:opacity-60"
                                    onClick={() => handleUpdate(item._id as string)}
                                >
                                    <LoopOutlinedIcon />
                                </div>
                                <div
                                    className="text-red px-1 bg-white cursor-pointer hover:opacity-60"
                                    onClick={() => handleDelete(item._id as string)}
                                >
                                    <CloseOutlinedIcon />
                                </div>
                                <div
                                    className="text-[#FF00B4] px-1 bg-white cursor-pointer hover:opacity-60"
                                    onClick={() => handleDefault(item._id as string)}
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
            {open && (
                <AddAddress
                    setOpen={setOpen}
                    update={update}
                    setUpdate={setUpdate}
                    addressDetail={addressDetail}
                    addressId={addressId}
                    setLoad={setLoad}
                    province={province}
                    setProvince={setProvince}
                    provinceID={provinceID}
                    setProvinceID={setProvinceID}
                    districtID={districtID}
                    setDistrictID={setDistrictID}
                    district={district}
                    setDistrict={setDistrict}
                    setAddressId={setAddressId}
                    ward={ward}
                    setWard={setWard}
                />
            )}
        </div>
    );
};

export default Address;
