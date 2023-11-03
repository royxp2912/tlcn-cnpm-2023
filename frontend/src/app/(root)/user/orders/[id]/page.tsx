import UserNav from '@/components/shared/UserNav';
import React from 'react';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import Image from 'next/image';
import Border from '@/components/shared/Border';

const DetailOrder = () => {
    return (
        <div className="flex px-20 mt-10 gap-5">
            <UserNav />
            <div className="w-[1100px]">
                <span className="w-full block text-center font-bold text-lg">Order Details</span>
                <div className="my-[10px] shadow-2xl rounded-lg py-5 px-10 flex gap-10">
                    <div className="flex flex-col gap-[14px] font-semibold">
                        <span>Order ID:</span>
                        <span>Buyer:</span>
                        <span>Payment Method:</span>
                    </div>
                    <div className="flex flex-col gap-[14px]">
                        <span>order1nguyenvana</span>
                        <span>Nguyễn Văn Trương Thị A</span>
                        <span>VNPAY (COD)</span>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex flex-col gap-[14px] font-semibold">
                        <span>Paid:</span>
                        <span>Delivered:</span>
                        <span>Status:</span>
                    </div>
                    <div className="flex flex-col gap-[14px]">
                        <span>NOT YET</span>
                        <span>NOT YET</span>
                        <span>CONFIRMING</span>
                    </div>
                </div>
                <div className="w-full p-5 shadow-2xl rounded-lg mb-[10px]">
                    <div className="flex justify-between">
                        <span className="font-bold text-lg">Delivery Details</span>
                    </div>
                    <div className="px-5 flex flex-col gap-[15px] mt-5">
                        <div className="flex gap-[350px]">
                            <div className="flex gap-8">
                                <span className="font-semibold">Receiver:</span>
                                <span>Nguyễn Văn A</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="font-semibold">Phone:</span>
                                <span>0901905570</span>
                            </div>
                        </div>
                        <div className="flex gap-[100px]">
                            <div className="flex gap-8">
                                <span className="font-semibold">Province/City::</span>
                                <span>0901905570</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="font-semibold">District:</span>
                                <span>0901905570</span>
                            </div>
                            <div className="flex gap-8">
                                <span className="font-semibold">Wards:</span>
                                <span>0901905570</span>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">Specific Address:</span>
                            <span>111 đường nguyễn văn abc</span>
                        </div>
                    </div>
                </div>
                <div className="px-[15px] pt-[10px] pb-[10px] shadow-2xl rounded-lg">
                    <span className="font-bold">Detail</span>
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
                    <div className="flex justify-end">
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

export default DetailOrder;
