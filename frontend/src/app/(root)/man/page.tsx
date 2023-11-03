import Brand from '@/components/shared/Brand';
import HotDeals from '@/components/shared/HotDeals';
import Price from '@/components/shared/Price';
import Color from '@/components/shared/Color';
import React from 'react';
import Image from 'next/image';
import Sort from '@/components/shared/Sort';
import ShoesWithTag from '@/components/cards/ShoesWithTag';
import Pagetination from '@/components/shared/Pagetination';
import SingleSellShoe from '@/components/cards/SingleSellShoe';

const ManShoes = () => {
    return (
        <div className="flex px-[100px] gap-10 mt-5">
            <div className="flex flex-col gap-5">
                <HotDeals />
                <Price />
                <Color />
                <Brand />
            </div>
            <div className="min-w-[1000px]">
                <div className="w-full h-[280px] relative ">
                    <Image src="/layout.png" alt="Ảnh" fill />
                </div>
                <Sort />
                {/* <ShoesWithTag /> */}
                <SingleSellShoe />
                <Pagetination />
            </div>
        </div>
    );
};

export default ManShoes;
