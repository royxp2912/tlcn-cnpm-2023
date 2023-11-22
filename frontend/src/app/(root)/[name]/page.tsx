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
import { Category, Product } from '@/types/type';
import { usePathname } from 'next/navigation';

const unProp = {
    productHots: [],
    active: false,
    isBack: false,
    isNext: false,
    next: 0,
    back: 0,
    setBack: () => {},
    setNext: () => {},
    setIsBack: () => {},
    setIsNext: () => {},
};

const ManShoes = () => {
    const { categories }: { categories: Category[] } = useSelector((state: any) => state.categories);
    const { products, brands, hotdeals }: { products: Product[]; brands: Brand[]; hotdeals: Brand[] } = useSelector(
        (state: any) => state.products,
    );
    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState(false);
    const [listProduct, setListProduct] = useState<Product[]>([]);
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
        // if (active === false) {
        //     const sorded = products.sort((a, b) => a.price - b.price);
        //     setListProduct(sorded);
        // } else if (active === true) {
        //     const sorded = products.sort((a, b) => b.price - a.price);
        //     setListProduct(sorded);
        // }
    }, [dispatch, pathname, products, active, categories]);
    // console.log(products);
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
                    <ShoesWithTag listProduct={listProduct} />
                ) : (
                    <SingleSellShoe products={products} {...unProp} />
                )}
                <Pagetination />
            </div>
        </div>
    );
};

export default ManShoes;
