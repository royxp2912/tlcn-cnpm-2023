import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import BorderBlack from '@/components/shared/BorderBlack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoeInfo from '@/components/cards/ShoeInfo';
import Reviews from '@/components/cards/Reviews';

const ShoesSinglePage = () => {
    return (
        <div>
            <div className="flex mx-[240px] gap-[100px] mt-[52px] mb-[116px]">
                <div className="w-[420px]">
                    <div className="h-[328px] relative bg-bg_sell rounded-lg border-gray border-2">
                        <Image src="/nike.png" alt="giày" fill />
                    </div>
                    <div className="flex gap-5 mt-5">
                        <div className="w-[90px] h-[90px] relative bg-bg_sell rounded-lg border-gray border-4">
                            <Image src="/nike.png" alt="giày" fill />
                        </div>
                        <div className="w-[90px] h-[90px] relative bg-bg_sell rounded-lg border-gray border-4">
                            <Image src="/nike.png" alt="giày" fill />
                        </div>
                        <div className="w-[90px] h-[90px] relative bg-bg_sell rounded-lg border-gray border-4">
                            <Image src="/nike.png" alt="giày" fill />
                        </div>
                        <div className="w-[90px] h-[90px] relative bg-bg_sell rounded-lg border-gray border-4">
                            <Image src="/nike.png" alt="giày" fill />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Nike Airmax 270 React</h1>
                    <div className="flex items-center gap-10 mt-[23px] mb-[25px]">
                        <Rating value={4} readOnly emptyIcon={<StarIcon className="text-star" />} />

                        <span className="text-rv">0 review</span>
                        <span className="text-blue">Submit a review</span>
                    </div>
                    <BorderBlack />
                    <span className="text-3xl text-money font-bold mt-[25px] mb-[25px] block">$299,43</span>
                    <span className="font-medium mb-[25px] block">free shipping</span>
                    <BorderBlack />
                    <div className="flex items-center mt-[25px] mb-5">
                        <span className="font-medium flex-1">Size:</span>
                        <div className="font-bold text-white flex gap-1">
                            <div className="text-sm w-9 h-7 bg-size2 rounded-md flex items-center justify-center">
                                38
                            </div>
                            <div className="text-sm w-9 h-7 bg-size2 rounded-md flex items-center justify-center">
                                38
                            </div>
                            <div className="text-sm w-9 h-7 bg-blue rounded-md flex items-center justify-center">
                                38
                            </div>
                            <div className="text-sm w-9 h-7 bg-size2 rounded-md flex items-center justify-center">
                                38
                            </div>
                            <div className="text-sm w-9 h-7 bg-size2 rounded-md flex items-center justify-center">
                                38
                            </div>
                        </div>
                    </div>
                    <div className="font-medium mb-[25px] flex">
                        <span className="flex-1">Availability:</span>
                        <span>300</span>
                    </div>
                    <BorderBlack />
                    <div className="flex justify-between mt-5">
                        <div className="flex h-[50px] text-xl font-bold">
                            <span className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tl-md rounded-bl-md text-blue">
                                -
                            </span>
                            <span className="w-[62px] flex items-center justify-center bg-[#FAFBFB] rounded-md ">
                                2
                            </span>
                            <span className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tr-md rounded-br-md text-blue">
                                +
                            </span>
                        </div>
                        <div className="flex gap-5">
                            <div className="w-40 h-[50px] flex items-center justify-center gap-4 bg-buy text-blue rounded-md">
                                <ShoppingCartOutlinedIcon />
                                <span className="font-bold">Add To Cart</span>
                            </div>
                            <div className="w-[50px] h-[50px] bg-buy flex items-center justify-center rounded-md">
                                <FavoriteBorderOutlinedIcon className="text-blue" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 pt-[25px] pb-5 bg-bg_sell rounded-lg mx-[240px]">
                <div className="text-lg font-medium flex mb-[25px]">
                    <span className="w-[180px] border-b-2 border-blue flex items-center justify-center">
                        Shoe Information
                    </span>
                    <div className="w-[160px]  flex items-center justify-center gap-3">
                        <span>Review</span>
                        <span className="text-rv">0</span>
                    </div>
                </div>
                {/* view about shoes info and review*/}
                {/* <ShoeInfo /> */}
                <Reviews />
            </div>
            <div>
                <span>Hot Shoes</span>
                {/* Vỉew hot shoes (component singlesellshoe) */}
            </div>
        </div>
    );
};

export default ShoesSinglePage;
