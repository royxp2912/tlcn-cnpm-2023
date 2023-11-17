'use client';
import Revenue from '@/components/chart/Revenue';
import Top from '@/components/chart/Top';
import { getTopTotalProductSoldThisMonth } from '@/slices/revenueSlice';
import { top } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const WareHouseStatis = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { top }: { top: top[] } = useSelector((state: any) => state.revenue);

    useEffect(() => {
        dispatch(getTopTotalProductSoldThisMonth());
    }, [dispatch]);
    console.log(top);
    return (
        <div>
            <div>
                <Revenue path="Total Product Sold" />
            </div>
            <div>{top.length != 0 && <Top path="product" top={top} />}</div>
        </div>
    );
};

export default WareHouseStatis;
