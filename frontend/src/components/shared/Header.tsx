'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AppDispatch } from '@/utils/store';
import { getCartByUserId } from '@/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Cart, User } from '@/types/type';

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { cartItem }: { cartItem: Cart } = useSelector((state: any) => state.carts);
    const dispatch = useDispatch<AppDispatch>();

    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;

    const handleUser = () => {
        if (!userString) router.push('/sign-in');
        else router.push('/user');
    };

    const handelCart = () => {
        router.push('/cart');
    };

    useEffect(() => {
        dispatch(getCartByUserId(id));
    }, [dispatch]);
    console.log(userString);
    return (
        <div className={`${pathname === '/' ? 'bg-bg' : 'bg-white'} flex flex-col items-center`}>
            <div className=" flex items-center justify-between px-20 pt-6 pb-5 w-full">
                <div>
                    <Image
                        src={pathname === '/' ? '/search.png' : '/search2.png'}
                        alt="Search"
                        width={24}
                        height={24}
                    />
                </div>
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        <div className="relative">
                            <FavoriteBorderOutlinedIcon
                                className={`w-7 h-7 ${pathname === '/' ? 'text-orange' : 'text-blue'}`}
                            />
                            {userString !== null && (
                                <div
                                    className={`absolute top-[-8px] right-[-6px] border rounded-full w-4 h-4 border-white ${
                                        pathname === '/' ? 'bg-orange' : 'bg-blue'
                                    }`}
                                >
                                    <span className="text-white text-xs ml-[0.2rem] absolute">2</span>
                                </div>
                            )}
                        </div>
                        <div className="relative cursor-pointer" onClick={handelCart}>
                            <ShoppingCartOutlinedIcon
                                className={`w-7 h-7 ${pathname === '/' ? 'text-orange' : 'text-blue'}`}
                            />
                            {userString !== null && (
                                <div
                                    className={`absolute top-[-8px] right-[-6px] border rounded-full w-4 h-4 border-white ${
                                        pathname === '/' ? 'bg-orange' : 'bg-blue'
                                    }`}
                                >
                                    <span className="text-white text-xs ml-[0.2rem] absolute">
                                        {cartItem.items && cartItem.items.length}
                                    </span>
                                </div>
                            )}
                        </div>

                        <PersonOutlineOutlinedIcon
                            className={`${pathname === '/' ? 'text-orange' : 'text-blue'} cursor-pointer`}
                            fontSize="large"
                            onClick={handleUser}
                        />
                    </div>
                </div>
            </div>
            <span
                className={`border-b w-[calc(100vw-128px)] ${
                    pathname === '/' ? 'border-orange' : 'border-blue'
                } opacity-40 block mb-5`}
            ></span>
        </div>
    );
};

export default Header;
