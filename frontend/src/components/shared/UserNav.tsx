import React from 'react';
import { userNav } from '@/constants';
import Image from 'next/image';

const UserNav = () => {
    return (
        <div className="py-5 px-[25px] bg-deal drop-shadow-lg w-max h-max rounded-md">
            <div className="flex items-center gap-[10px] mb-5">
                <Image src="/avt.png" alt="AVT" width={60} height={60} className="rounded-full" />
                <span className="font-bold text-sm">Han Soo Hee</span>
            </div>
            {userNav.map((item) => (
                <div className="mt-5 flex items-center gap-5 font-semibold">
                    <item.icon />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default UserNav;
