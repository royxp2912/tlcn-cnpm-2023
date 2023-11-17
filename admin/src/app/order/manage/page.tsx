'use client';
import { getAllOrderByOrderStatus, getAllOrderByUserId, getAllOrders } from '@/slices/orderSlice';
import { Order } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const statuses = ['All', 'Confirming', 'Waiting', 'Delivering', 'Successful', 'Cancel', 'Return'];
const buttons = [
    'Select All',
    'Confirm All',
    'Confirm Selected',
    'Delivery All',
    'Delivery Selected',
    'Cancel All',
    'Cancel Selected',
];

const OrderManage = () => {
    const [status, setStatus] = useState('All');
    const dispatch = useDispatch<AppDispatch>();
    const { orders }: { orders: Order[] } = useSelector((state: any) => state.orders);

    useEffect(() => {
        if (status === 'All') {
            dispatch(getAllOrders());
        } else dispatch(getAllOrderByOrderStatus(status));
    }, [dispatch, status]);

    const router = useRouter();

    return (
        <div className="flex flex-col gap-[10px]">
            <div></div>

            <div className="flex gap-[18px] shadow-order bg-white">
                {statuses &&
                    statuses.map((item, i) => {
                        const isActive = status === item;
                        return (
                            <span
                                className={`w-[140px] h-max block pt-[10px] pb-[12px] text-center uppercase ${
                                    isActive && 'text-blue border-b-2 border-b-blue'
                                }`}
                                onClick={() => setStatus(item)}
                                key={i}
                            >
                                {item}
                            </span>
                        );
                    })}
            </div>
            <div className="ml-[15px] flex items-center gap-5">
                <input type="checkbox" className="w-[26px] h-[26px]" />
                {buttons.map((item) => (
                    <button
                        key={item}
                        className="bg-blue bg-opacity-60 h-10 px-4 text-sm font-medium text-white rounded-lg"
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-5">
                {orders.length === 0 ? (
                    <span>Nothing</span>
                ) : (
                    orders &&
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className="px-[15px] pt-[15px] pb-[10px] shadow-order bg-white"
                            onClick={() => router.push(`/order/manage/${order._id}`)}
                        >
                            <div className="flex justify-between mb-[15px] font-bold">
                                <div className="flex items-center gap-[14px]">
                                    <input type="checkbox" className="w-[26px] h-[26px]" />
                                    <h1>ID: {order._id}</h1>
                                </div>
                                <span>Buyer: {order.user}</span>
                                <h1 className="uppercase">{order.status}</h1>
                            </div>
                            {/* <Border /> */}
                            <div>
                                <div>
                                    {order.items.map((item) => (
                                        <div key={item.image} className="flex items-center gap-5 my-[10px]">
                                            <Image
                                                src={item.image}
                                                alt="Ảnh"
                                                width={100}
                                                height={100}
                                                className="rounded-lg bg-deal"
                                            />

                                            <div className="w-full font-medium text-lg">
                                                <div className="flex justify-between">
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="flex gap-[100px] mt-[18px] mb-[14px] text-sm opacity-70">
                                                    <span>Color: {item.color}</span>
                                                    <span>Size: {item.size}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm opacity-70">
                                                        Quantity: {item.quantity}
                                                    </span>
                                                    <span className="font-bold text-blue">${item.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <Border /> */}
                                </div>
                            </div>
                            <div className="flex gap-5 mt-[10px] items-center">
                                <button className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm">
                                    CONFIRM
                                </button>
                                <button className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm">
                                    DELIVERY
                                </button>
                                <button className="w-[120px] h-10 bg-red bg-opacity-50 text-white rounded-md font-bold text-sm">
                                    CANCEL
                                </button>
                                <button className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm">
                                    RETURN
                                </button>
                                <div className="flex-grow"></div>
                                <div className="flex items-center font-bold gap-2">
                                    <span>Total Price:</span>
                                    <span className="text-lg text-blue">${order.total}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderManage;
