'use client';
import Brand from '@/components/shared/Brand';
import HotDeals from '@/components/shared/HotDeals';
import Price from '@/components/shared/Price';
import Color from '@/components/shared/Color';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Sort from '@/components/shared/Sort';
import ShoesWithTag from '@/components/cards/ShoesWithTag';
import Pagetination from '@/components/shared/Pagetination';
import SingleSellShoe from '@/components/cards/SingleSellShoe';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getAllProductByCateId, getProductHotDeal, getQtyHotDealOfBrand, getQtyOfBrand } from '@/slices/productSlice';
import { getAllCategory } from '@/slices/categorySlice';
import { Category } from '@/types/type';
import { usePathname } from 'next/navigation';

const ManShoes = () => {
    const { categories }: { categories: Category[] } = useSelector((state: any) => state.categories);
    const { products, productHots, brands, hotdeals } = useSelector((state: any) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState(false);
    const pathname = usePathname();
    // console.log(pathname);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getProductHotDeal());
            await dispatch(getAllCategory());
            await dispatch(getQtyOfBrand());
            await dispatch(getQtyHotDealOfBrand());

            const found =
                categories &&
                categories.find((category) => category.name.toLowerCase() === String(pathname.split('/')[1]));

            if (found) {
                dispatch(getAllProductByCateId(found._id as string)).unwrap();
            }
        };

        fetchData();
    }, [dispatch, categories, pathname]);

    return (
        <div className="flex px-[100px] gap-10 mt-5">
            <div className="flex flex-col gap-5">
                <HotDeals hotdeals={hotdeals} />
                <Price />
                <Color />
                <Brand brands={brands} />
            </div>
            <div className="w-[1010px]">
                <div className="w-full h-[280px] relative ">
                    <Image src="/layout.png" alt="Ảnh" fill />
                </div>
                <Sort setActive={setActive} active={active} />
                {!active ? (
                    <ShoesWithTag products={products} />
                ) : (
                    <SingleSellShoe products={products} productHots={productHots} active />
                )}
                <Pagetination />
            </div>
        </div>
    );
};

export default ManShoes;
