'use client';
import { getAllCategory } from '@/slices/categorySlice';
import { Category } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const { categories }: { categories: Category[] } = useSelector((state: any) => state.categories);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

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
            {categories &&
                categories.map((category) => (
                    <Link
                        key={category._id}
                        href={`/${category.name.toLowerCase().replace(/\s/g, '')}`}
                        className={`w-[120px] h-10 text-center ${
                            pathname === `/${category.name.toLowerCase().replace(/\s/g, '')}`
                                ? 'text-blue border-blue border-b-2'
                                : ' '
                        }  `}
                    >
                        <span>{category.name}</span>
                    </Link>
                ))}
        </div>
    );
};

export default Navbar;
