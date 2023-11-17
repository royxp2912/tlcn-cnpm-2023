import Image from 'next/image';
import React from 'react';

type Props = {
    path: string;
};

const Revenue = ({ path }: Props) => {
    return (
        <div className="flex gap-5 ">
            <div className="p-5 w-[400px] flex flex-col items-center shadow-revenue bg-white ">
                <div className="flex items-center justify-between w-full">
                    <span className="font-bold">{path}</span>
                    <span className="font-medium text-sm opacity-60">Today</span>
                </div>
                <div className="flex gap-[50px] mt-5">
                    <Image
                        src="/increase.png"
                        alt="increase"
                        width={54}
                        height={54}
                        className="border-4 border-[#00BE98]"
                    />
                    <div className="flex flex-col gap-[6px] items-center">
                        <span className="text-3xl text-[#00BE98]">$299,43</span>
                        <div className="text-sm flex items-center gap-1">
                            <span>Increase</span>
                            <span className="font-bold text-[#00BE98]">+17%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5 w-[400px] flex flex-col items-center shadow-revenue bg-white">
                <div className="flex items-center justify-between w-full">
                    <span className="font-bold">{path}</span>
                    <span className="font-medium text-sm opacity-60">Today</span>
                </div>
                <div className="flex gap-[50px] mt-5">
                    <Image
                        src="/increase.png"
                        alt="increase"
                        width={54}
                        height={54}
                        className="border-4 border-[#00BE98]"
                    />
                    <div className="flex flex-col gap-[6px] items-center">
                        <span className="text-3xl text-[#00BE98]">$299,43</span>
                        <div className="text-sm flex items-center gap-1">
                            <span>Increase</span>
                            <span className="font-bold text-[#00BE98]">+17%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5 w-[400px] flex flex-col items-center shadow-revenue bg-white">
                <div className="flex items-center justify-between w-full">
                    <span className="font-bold">{path}</span>
                    <span className="font-medium text-sm opacity-60">Today</span>
                </div>
                <div className="flex gap-[50px] mt-5">
                    <Image
                        src="/increase.png"
                        alt="increase"
                        width={54}
                        height={54}
                        className="border-4 border-[#00BE98]"
                    />
                    <div className="flex flex-col gap-[6px] items-center">
                        <span className="text-3xl text-[#00BE98]">$299,43</span>
                        <div className="text-sm flex items-center gap-1">
                            <span>Increase</span>
                            <span className="font-bold text-[#00BE98]">+17%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revenue;
