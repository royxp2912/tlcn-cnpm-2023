'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
    const pathname = usePathname();
    return (
        <div className={` flex justify-center ${pathname === '/' ? 'text-white bg-bg' : 'text-bg bg-white'} font-bold`}>
            <Link
                href="/"
                className={`w-[120px] h-10 text-center ${
                    pathname === '/' ? 'text-orange border-orange' : 'text-blue border-blue'
                } border-b-2 `}
            >
                <span>Home</span>
            </Link>
            <Link href="/man" className="w-[120px] h-10 text-center">
                <span>Man</span>
            </Link>
            <Link href="/women" className="w-[120px] h-10 text-center">
                <span>Woman</span>
            </Link>
            <Link href="/kids" className="w-[120px] h-10 text-center">
                <span>Kids</span>
            </Link>
            <Link href="/new" className="w-[120px] h-10 text-center">
                <span>New</span>
            </Link>
        </div>
    );
};

export default Navbar;
