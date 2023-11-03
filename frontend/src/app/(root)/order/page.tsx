import Border from '@/components/shared/Border';
import Image from 'next/image';
import React from 'react';

const Order = () => {
    return (
        <div className="flex flex-col items-center mt-[26px] px-[100px] gap-[10px]">
            <span className="font-bold text-3xl text-blue">Order Comfirmation</span>
            <div className="w-full mt-10 p-5 shadow-2xl rounded-lg">
                <div className="flex justify-between">
                    <span className="font-bold text-lg">Delivery Details</span>
                    <button className="w-[120px] h-10 bg-blue opacity-50 font-bold text-sm text-white">Change</button>
                </div>
                <div className="px-5 flex flex-col gap-[15px]">
                    <div className="flex gap-[320px]">
                        <div className="flex gap-8">
                            <span className="font-semibold">Receiver:</span>
                            <span>Nguyễn Văn A</span>
                        </div>
                        <div className="flex gap-8">
                            <span className="font-semibold">Phone:</span>
                            <span>0901905570</span>
                        </div>
                    </div>
                    <div className="flex gap-[75px]">
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
            <div className="w-full p-5 shadow-2xl rounded-lg">
                <span className="font-bold mb-[15px] block">Detail</span>
                <Border />
                <div className="flex items-center gap-5 my-[10px]">
                    <Image src="/nike.png" alt="Ảnh" width={100} height={100} className="bg-deal rounded-lg" />
                    <div className="flex flex-col gap-[14px] w-full">
                        <span className="mb-1 font-medium text-lg">Nike Air Force 1</span>
                        <div className="flex items-center gap-[100px]">
                            <span className="text-sm opacity-70"> Color: #777777</span>
                            <span className="text-sm opacity-70">Size: 42</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm opacity-70"> Quantity: 2</span>

                            <span className="text-blue font-bold">$80000</span>
                        </div>
                    </div>
                </div>
                <Border />
                <div className="flex items-center justify-end mt-5 gap-5 font-bold">
                    <span>Total Price:</span>
                    <span className="text-lg text-blue">$80000</span>
                </div>
            </div>
            <div className="w-full p-5 shadow-2xl rounded-lg flex gap-[50px] items-center font-bold">
                <span className="text-lg">Payment Method</span>
                <button className="w-[200px] h-10 text-white text-sm bg-blue opacity-50 ">VNPAY</button>
                <button className="w-[200px] h-10 text-white text-sm bg-blue opacity-50 ">COD</button>
                <div className="flex-grow"></div>
                <span className="opacity-50">Shipping fee: Free</span>
            </div>
            <div className="flex items-center justify-end w-full font-bold gap-5 text-white">
                <button className="w-[270px] h-[60px] bg-[#FF4747] opacity-60">Cancel</button>
                <button className="w-[270px] h-[60px] bg-blue opacity-70">Confirm</button>
            </div>
        </div>
    );
};

export default Order;
