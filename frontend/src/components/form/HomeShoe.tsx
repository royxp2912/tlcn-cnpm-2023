'use client';
import React, { useEffect, useState } from 'react';
import HomeShoeCard from '../cards/HomeShoeCard';
import Image from 'next/image';
import { Rating } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import { getProductById } from '@/slices/productSlice';

const HomeShoe = () => {
    const { productHots, productDetail }: { productHots: Product[]; productDetail: Product } = useSelector(
        (state: any) => state.products,
    );
    const dispatch = useDispatch<AppDispatch>();
    const [id, setId] = useState<string>('');
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (productHots.length > 0) {
            setId(productHots[0]._id);
        }
        dispatch(getProductById(id));
        const timeout = setTimeout(() => {
            const currentIndex = productHots.findIndex((productHot) => productHot._id === id);
            let nextIndex = currentIndex + 1;

            if (nextIndex >= productHots.length) {
                nextIndex = 0;

                setCount((prevCount) => prevCount + 1);
            }

            if (count === productHots.length) {
                nextIndex = 0;
                setCount(0);
            }

            const nextId = productHots[nextIndex]._id;
            setId(nextId);
        }, 100000);

        return () => clearTimeout(timeout);
    }, [id, productHots, count]);

    return (
        <div className="bg-bg">
            <HomeShoeCard />

            <div className="flex items-center justify-between py-10 px-14 gap-16">
                <div>
                    <Image src="/left.png" alt="Arrow" width={25} height={41} />
                </div>
                <div className="flex gap-20">
                    {productHots &&
                        productHots.map((productHot) => (
                            <div key={productHot._id} className="flex items-center rounded-xl h-40 ">
                                <div className="w-[100px] bg-pink h-full flex items-center relative rounded-tl-lg rounded-bl-lg">
                                    <Image
                                        src="/nike.png"
                                        alt="Nike"
                                        height={120}
                                        width={120}
                                        style={{ width: '120px', height: '120px' }}
                                        className="absolute left-[-42px] rotate-[-16deg] "
                                    />
                                </div>
                                <div className="x-4 p-4 pb-2 bg-white rounded-tr-lg rounded-br-lg h-40">
                                    <h1 className="font-bold mb-[10px]">{productHot.name}</h1>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <Rating size="small" name="read-only" value={productHot.rating} readOnly />
                                            <span className="text-money font-semibold">$ {productHot.price}</span>
                                        </div>
                                        <FavoriteBorderOutlinedIcon className="w-5 h-5 text-orange" />
                                    </div>
                                    <button className="mt-3 px-2 py-2 border-2 border-orange font-bold text-orange rounded-lg">
                                        ADD TO CART!
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <div>
                    <Image src="/right.png" alt="Arrow" width={25} height={41} />
                </div>
            </div>
        </div>
    );
};

export default HomeShoe;
