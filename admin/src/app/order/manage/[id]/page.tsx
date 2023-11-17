'use client';
import { getOrderByOrderId } from '@/slices/orderSlice';
import { Order } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OrderDetail = () => {
    const { id }: { id: string } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { order }: { order: Order } = useSelector((state: any) => state.orders);

    useEffect(() => {
        dispatch(getOrderByOrderId(id));
    }, [dispatch]);

    console.log(order);
    return (
        <div>
            <div>
                <span>Back</span>
                <span>Order Details</span>
            </div>
            <div>
                <div className="my-[10px] shadow-revenue bg-white py-5 px-10 flex gap-10">
                    <div className="flex flex-col gap-[14px] font-semibold">
                        <span>Order ID:</span>
                        <span>Buyer:</span>
                        <span>Payment Method:</span>
                    </div>
                    <div className="flex flex-col gap-[14px]">
                        <span>{order._id}</span>
                        <span>{order.user}</span>
                        <span>{order.paymentMethod}</span>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex flex-col gap-[14px] font-semibold">
                        <span>Paid:</span>
                        <span>Delivered:</span>
                        <span>Status:</span>
                    </div>
                    <div className="flex flex-col gap-[14px]">
                        <span>{order.isPaid ? 'SUCCESS' : 'NOT YET'}</span>
                        <span>{order.isDelivered ? 'SUCCESS' : 'NOT YET'}</span>
                        <span>{order.status}</span>
                    </div>
                </div>
                <div className="w-full p-5 shadow-revenue bg-white mb-[10px]">
                    <div className="flex justify-between">
                        <span className="font-bold text-lg">Delivery Details</span>
                    </div>
                    <div className="px-5 flex flex-col gap-[15px] mt-5">
                        <div className="flex gap-[350px]">
                            <div className="flex gap-8">
                                <span className="font-semibold">Receiver:</span>
                                <span>{order.deliveryAddress.receiver}</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="font-semibold">Phone:</span>
                                <span>{order.deliveryAddress.phone}</span>
                            </div>
                        </div>
                        <div className="flex gap-[100px]">
                            <div className="flex gap-8">
                                <span className="font-semibold">Province/City::</span>
                                <span>{order.deliveryAddress.province}</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="font-semibold">District:</span>
                                <span>{order.deliveryAddress.districts}</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="font-semibold">Wards:</span>
                                <span>{order.deliveryAddress.wards}</span>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">Specific Address:</span>
                            <span>{order.deliveryAddress.specific}</span>
                        </div>
                    </div>
                </div>
                <div className="px-[15px] pt-[10px] pb-[10px] shadow-revenue bg-white">
                    <span className="font-bold">Detail</span>
                    {/* <Border /> */}
                    <div>
                        <div>
                            {order.items.map((item) => (
                                <div className="flex items-center gap-5 my-[10px]">
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
                                            <span className="text-sm opacity-70">Quantity: {item.quantity}</span>
                                            <span className="font-bold text-blue">${item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="flex items-center font-bold gap-2">
                            <span>Total Price:</span>
                            <span className="text-lg text-blue">${order.total}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[10px] flex justify-between">
                <button className="w-[200px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-sm">
                    CONFIRM
                </button>
                <button className="w-[200px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-sm">
                    DELIVERY
                </button>
                <button className="w-[200px] h-[50px] bg-red bg-opacity-60 text-white font-bold text-sm">CANCEL</button>
                <button className="w-[200px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-sm">
                    RETURN
                </button>
                <button className="w-[200px] h-[50px] bg-blue bg-opacity-60 text-white font-bold text-sm">BACK</button>
            </div>
        </div>
    );
};

export default OrderDetail;
