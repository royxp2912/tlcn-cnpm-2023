'use client';
import { useDispatch, useSelector } from 'react-redux';
import SingleSellShoe from '../cards/SingleSellShoe';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@/utils/store';
import { getAllProduct, getProductHotDeal } from '@/slices/productSlice';
import { Product } from '@/types/type';

const SellShoe = () => {
    const { products, productHots } = useSelector((state: any) => state.products);
    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!active) {
            dispatch(getProductHotDeal()).unwrap();
        } else {
            dispatch(getAllProduct()).unwrap();
        }
    }, [active]);
    return (
        <div className="py-5 px-10">
            <div className="flex justify-center mb-5 font-bold text-xl gap-5 text-center">
                <span
                    className={` w-40 h-10 ${!active ? 'border-b-2 text-blue' : 'text-gray'} `}
                    onClick={() => setActive(false)}
                >
                    Selling
                </span>
                <span
                    className={` w-40 h-10 ${active ? 'border-b-2 text-blue' : 'text-gray'}`}
                    onClick={() => setActive(true)}
                >
                    Newest
                </span>
            </div>
            <div>
                <SingleSellShoe products={products} productHots={productHots} active={active} />
            </div>
        </div>
    );
};

export default SellShoe;
