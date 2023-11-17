'use client';
import Revenue from '@/components/chart/Revenue';
import Top from '@/components/chart/Top';
import { getTopUserThisMonth } from '@/slices/revenueSlice';
import { top } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserStatis = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { top }: { top: top[] } = useSelector((state: any) => state.revenue);

    useEffect(() => {
        dispatch(getTopUserThisMonth());
    }, [dispatch]);
    return (
        <div className="flex flex-col gap-[10px]">
            <div>{/* Option của mui */}</div>
            <div>
                <Revenue path="New Users" />
            </div>
            <div>{top.length != 0 && <Top path="user" top={top} />}</div>
        </div>
    );
};

export default UserStatis;
