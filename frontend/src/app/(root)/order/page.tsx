'use client';
import Border from '@/components/shared/Border';
import { getAllAddressByUserId } from '@/slices/addressSlice';
import { getCartByUserId } from '@/slices/cartSlice';
import { createOrder } from '@/slices/orderSlice';
import { Address, Cart, Order, User } from '@/types/type';
import axios from '@/utils/axios';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Order = () => {
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
    const dispatch = useDispatch<AppDispatch>();
    const { address }: { address: Address[] } = useSelector((state: any) => state.address);
    const { cartItem }: { cartItem: Cart } = useSelector((state: any) => state.carts);
    const [datas, setDatas] = useState<Address>();
    const router = useRouter();

    const [pay, setPay] = useState<string>('');
    useEffect(() => {
        try {
            const fetchData = async () => {
                const { data } = await axios.get(`/address/user/default?user=${id}`);
                setDatas(data.data);
            };
            fetchData();
            dispatch(getCartByUserId(id));
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    const idAddress = datas?._id as string;

    const handleOrder = async () => {
        if (pay === 'VNPAY') {
            const item: Order = {
                items: cartItem.items,
                userID: id,
                deliveryAddress: idAddress,
                paymentMethod: pay,
                total: cartItem.total,
            };
            await dispatch(createOrder(item));
            const { data } = await axios.post('/orders/create_payment_url', {
                amount: 50000,
                bankCode: 'VNBANK',
            });
            window.open(data.vnpUrl);
        } else {
            const item: Order = {
                items: cartItem.items,
                userID: id,
                deliveryAddress: idAddress,
                paymentMethod: 'COD',
                total: cartItem.total,
            };
            dispatch(createOrder(item));
            router.push('/user/orders');
        }
    };
    console.log(cartItem.items);

    return (
        <div className="flex flex-col items-center mt-[26px] px-[100px] gap-[10px]">
            <span className="font-bold text-3xl text-blue">Order Comfirmation</span>
            <div className="w-full mt-10 p-5 shadow-xl rounded-lg">
                <div className="flex justify-between">
                    <span className="font-bold text-lg">Delivery Details</span>
                    <button className="w-[120px] h-10 bg-blue opacity-50 font-bold text-sm text-white">Change</button>
                </div>
                <div className="px-5 flex flex-col gap-[15px]">
                    <div className="flex gap-[320px]">
                        <div className="flex gap-8">
                            <span className="font-semibold">Receiver:</span>
                            <span>{datas?.receiver}</span>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">Phone:</span>
                            <span>{datas?.phone}</span>
                        </div>
                    </div>
                    <div className="flex gap-[75px]">
                        <div className="flex gap-8">
                            <span className="font-semibold">Province/City::</span>
                            <span>{datas?.province}</span>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">District:</span>
                            <span>{datas?.districts}</span>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">Wards:</span>
                            <span>{datas?.wards}</span>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <span className="font-semibold">Specific Address:</span>
                        <span>{datas?.specific}</span>
                    </div>
                </div>
            </div>
            <div className="w-full p-5 shadow-xl rounded-lg">
                <span className="font-bold mb-[15px] block">Detail</span>
                <Border />
                <div>
                    {cartItem.items &&
                        cartItem.items.map((item) => (
                            <div key={item.product} className="flex items-center gap-5 my-[10px]">
                                <Image
                                    src={item.image}
                                    alt="Ảnh"
                                    width={100}
                                    height={100}
                                    className="bg-deal rounded-lg"
                                />
                                <div className="flex flex-col gap-[14px] w-full">
                                    <span className="mb-1 font-medium text-lg">{item.name}</span>
                                    <div className="flex items-center gap-[100px]">
                                        <span className="text-sm opacity-70"> Color: {item.color}</span>
                                        <span className="text-sm opacity-70">Size: 42</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm opacity-70"> Quantity: {item.quantity}</span>

                                        <span className="text-blue font-bold">${item.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <Border />
                <div className="flex items-center justify-end mt-5 gap-5 font-bold">
                    <span>Total Price:</span>
                    <span className="text-lg text-blue">${cartItem.total}</span>
                </div>
            </div>
            <div className="w-full p-5 shadow-xl rounded-lg flex gap-[50px] items-center font-bold">
                <span className="text-lg">Payment Method</span>
                <button
                    onClick={() => setPay('VNPAY')}
                    className={`w-[200px] h-10 text-white text-sm bg-blue ${
                        pay === 'VNPAY' ? 'opacity-100' : 'opacity-50'
                    }  hover:opacity-100`}
                >
                    VNPAY
                </button>
                <button
                    onClick={() => setPay('COD')}
                    className={`w-[200px] h-10 text-white text-sm bg-blue ${
                        pay === 'COD' ? 'opacity-100' : 'opacity-50'
                    } hover:opacity-100`}
                >
                    COD
                </button>
                <div className="flex-grow"></div>
                <span className="opacity-50">Shipping fee: Free</span>
            </div>
            <div className="flex items-center justify-end w-full font-bold gap-5 text-white">
                <button className="w-[270px] h-[60px] bg-[#FF4747] opacity-60 hover:opacity-100">Cancel</button>
                <button className="w-[270px] h-[60px] bg-blue opacity-70 hover:opacity-100" onClick={handleOrder}>
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default Order;
