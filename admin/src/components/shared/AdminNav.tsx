'use client';
import Image from 'next/image';
import React from 'react';
import { adminNav } from '../../constants/index';
import { useRouter } from 'next/navigation';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const AdminNav = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-[355px] items-center shadow-nav w-[260px]">
            <div className="p-5">
                <div className="flex items-center gap-[10px] mb-5">
                    <Image src="/avt.png" alt="AVT" width={90} height={90} />
                    <div className="flex flex-col items-center">
                        <span className="font-bold">Han Soo Hee</span>
                        <span className="text-sm">Admin</span>
                    </div>
                </div>
                <div className="mt-[10px] flex flex-col gap-5">
                    {adminNav.map((item) => (
                        <div
                            key={item.label}
                            onClick={() => router.push(item.route)}
                            className="font-bold text-sm flex items-center gap-[12px] text-black"
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="font-bold flex items-center gap-[14px] px-[60px] pb-[214px]">
                <LogoutRoundedIcon />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default AdminNav;
