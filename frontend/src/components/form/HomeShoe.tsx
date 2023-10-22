import React from 'react';
import HomeShoeCard from '../cards/HomeShoeCard';
import Image from 'next/image';
import { Rating } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const HomeShoe = () => {
    return (
        <div className="bg-bg">
            <HomeShoeCard />

            <div className="flex items-center justify-between py-10 px-14 gap-16">
                <div>
                    <Image src="/left.png" alt="Arrow" width={25} height={41} />
                </div>
                <div className="flex gap-20">
                    <div className="flex items-center rounded-xl h-40 ">
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
                            <h1 className="font-bold mb-[10px]">Air Max Pegasus</h1>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <Rating size="small" name="read-only" value={5} readOnly />
                                    <span className="text-money font-semibold">$ 189</span>
                                </div>
                                <FavoriteBorderOutlinedIcon className="w-5 h-5 text-orange" />
                            </div>
                            <button className="mt-3 px-2 py-2 border-2 border-orange font-bold text-orange rounded-lg">
                                ADD TO CART!
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <Image src="/right.png" alt="Arrow" width={25} height={41} />
                </div>
            </div>
        </div>
    );
};

export default HomeShoe;
