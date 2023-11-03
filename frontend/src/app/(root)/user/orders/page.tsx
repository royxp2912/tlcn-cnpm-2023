'use client';
import Border from '@/components/shared/Border';
import UserNav from '@/components/shared/UserNav';
import Image from 'next/image';
import React, { useState } from 'react';

const statuses = ['All', 'confirming', 'waiting', 'delivering', 'successful', 'CANCEL', 'RETURN'];

const Orders = () => {
    const [status, setStatus] = useState('All');
    return (
        <div className="flex px-20 mt-10 gap-5">
            <UserNav />

            <div className="w-max flex flex-col">
                <div className="flex gap-[18px] shadow-lg ">
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
                <div className="px-[15px] pt-[15px] pb-[10px] shadow-lg">
                    <div className="flex justify-between mb-[15px]">
                        <h1>ID: abcscs</h1>
                        <h1>SUCCESSFUL</h1>
                    </div>
                    <Border />
                    <div>
                        <div>
                            <div className="flex items-center gap-5 my-[10px]">
                                <Image
                                    src="/nike.png"
                                    alt="Ảnh"
                                    width={100}
                                    height={100}
                                    className="rounded-lg bg-deal"
                                />
                                <div className="w-full font-medium text-lg">
                                    <div className="flex justify-between">
                                        <span>Nike Air Force 1</span>
                                        <span className="text-blue opacity-60">Submit a review</span>
                                    </div>
                                    <div className="flex gap-[100px] mt-[18px] mb-[14px] text-sm opacity-70">
                                        <span>Color: #777777</span>
                                        <span>Size: 42</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm opacity-70">Quantity: 2</span>
                                        <span className="font-bold text-blue">$80000</span>
                                    </div>
                                </div>
                            </div>
                            <Border />
                        </div>
                    </div>
                    <div className="flex gap-5 mt-[10px] items-center">
                        <button className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm">
                            RECEIVED
                        </button>
                        <button className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm">
                            RETURN
                        </button>
                        <div className="flex-grow"></div>
                        <div className="flex items-center font-bold gap-2">
                            <span>Total Price:</span>
                            <span className="text-lg text-blue">$80000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
