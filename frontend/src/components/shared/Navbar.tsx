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
                    pathname === '/' ? 'text-orange border-orange border-b-2' : ' '
                }  `}
            >
                <span>Home</span>
            </Link>
            <Link
                href="/man"
                className={`w-[120px] h-10 text-center ${
                    pathname === '/man' ? 'text-blue border-blue border-b-2' : ' '
                }  `}
            >
                <span>Man</span>
            </Link>
            <Link
                href="/woman"
                className={`w-[120px] h-10 text-center ${
                    pathname === '/woman' ? 'text-blue border-blue border-b-2' : ' '
                }  `}
            >
                <span>Man</span>
            </Link>
            <Link
                href="/kids"
                className={`w-[120px] h-10 text-center ${
                    pathname === '/kids' ? 'text-blue border-blue border-b-2' : ' '
                } `}
            >
                <span>Kids</span>
            </Link>
            <Link
                href="/news"
                className={`w-[120px] h-10 text-center ${
                    pathname === '/news' ? 'text-blue border-blue border-b-2' : ''
                } `}
            >
                <span>News</span>
            </Link>
        </div>
    );
};

export default Navbar;
