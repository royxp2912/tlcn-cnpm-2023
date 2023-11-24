'use client';
import Brand from '@/components/shared/Brand';
import HotDeals from '@/components/shared/HotDeals';
import Price from '@/components/shared/Price';
import Color from '@/components/shared/Color';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Sort from '@/components/shared/Sort';
import ShoesWithTag from '@/components/cards/ShoesWithTag';
import Pagetination from '@/components/shared/Pagetination';
import SingleSellShoe from '@/components/cards/SingleSellShoe';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getAllProductByCateId, getProductHotDeal, getQtyHotDealOfBrand, getQtyOfBrand } from '@/slices/productSlice';
import { getAllCategory } from '@/slices/categorySlice';
import { Category, Product, productByCate } from '@/types/type';
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
    const [sort, setSort] = useState<boolean>(false);
    const [view, setView] = useState<string>('new');
    const [listProduct, setListProduct] = useState<Product[]>([]);
    const [color, setColor] = useState<string>('Blue');
    const [brand, setBrand] = useState<string>('Nike');
    const [pageNum, setPageNum] = useState<number>(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const pathname = usePathname();

    const found = useMemo(
        () =>
            categories.find(
                (category) => category.name.toLowerCase().replace(/\s/g, '') === String(pathname.split('/')[1]),
            ),
        [categories, pathname],
    );

    const idCate = found?._id as string;

    useEffect(() => {
        const fetchData = async () => {
            const item: productByCate = {
                category: idCate,
                brand: brand,
                color: color,
                sort: view,

                pageNumber: pageNum,
            };
            await dispatch(getAllProductByCateId(item)).unwrap();
        };
        fetchData();
    }, [dispatch, idCate, pageNum, view, brand, color]);

    useEffect(() => {
        const filtered = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
        const sorted = filtered.sort((a, b) => (sort ? b.price - a.price : a.price - b.price));
        setListProduct(sorted);
    }, [products, sort, minPrice, maxPrice]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getProductHotDeal());
            await dispatch(getQtyOfBrand());
            await dispatch(getQtyHotDealOfBrand());
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="flex px-[100px] gap-10 mt-5">
            <div className="flex flex-col gap-5 w-[260px]">
                <HotDeals hotdeals={hotdeals} brand={brand} setBrand={setBrand} />
                <Price minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                <Color color={color} setColor={setColor} />
                <Brand brands={brands} brand={brand} setBrand={setBrand} />
            </div>
            <div className="w-[1010px]">
                <div className="w-full h-[280px] relative ">
                    <Image src="/layout.png" alt="Ảnh" fill />
                </div>
                <Sort
                    setActive={setActive}
                    active={active}
                    sort={sort}
                    setSort={setSort}
                    view={view}
                    setView={setView}
                />
                {!active ? (
                    <ShoesWithTag listProduct={products.length !== 0 ? listProduct : products} />
                ) : (
                    <SingleSellShoe products={products.length !== 0 ? listProduct : products} {...unProp} />
                )}
                <Pagetination setPageNum={setPageNum} />
            </div>
        </div>
    );
};

export default ManShoes;
