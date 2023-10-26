import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const SingleSellShoe = () => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <Image src="/left1.png" alt="Left Arrow" width={25} height={41} />
            </div>
            <div className="flex gap-2">
                <div className="border-2 border-gray2 w-max rounded-md p-1">
                    {/* Single Product */}
                    <div className="bg-bg_sell rounded-md">
                        <Image src="/nike.png" alt="Nike" width={292} height={236} />
                    </div>
                    <div className="px-5 py-1 flex flex-col items-center gap-2">
                        <div className="flex items-center justify-between mt-3 mb-3 w-full">
                            <span className="text-gray text-lg font-bold">Nike</span>
                            <FavoriteBorderOutlinedIcon className="w-5 h-5 text-orange" />
                        </div>
                        <h1 className="font-bold text-lg">Nike Air Max 270 React</h1>
                        <Rating name="read-only" value={5} readOnly />
                        <span className="font-bold text-money">$299,43</span>
                        <div className="w-full flex items-center justify-between text-gray font-bold">
                            <span>Sold</span>
                            <span>100</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Image src="/right1.png" alt="Right Arrow" width={25} height={41} />
            </div>
        </div>
    );
};

export default SingleSellShoe;
