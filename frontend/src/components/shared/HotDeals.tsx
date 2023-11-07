'use client';
import React from 'react';
import { useSelector } from 'react-redux';

const HotDeals = () => {
    const { categories } = useSelector((state: any) => state.categories);
    return (
        <div className="bg-deal p-5 rounded-lg">
            <span className="font-bold text-lg">Hot Deals</span>
            <div>
                <div className="flex justify-between mt-5 hover:text-blue">
                    <span>nike</span>
                    <span>2</span>
                </div>
            </div>
        </div>
    );
};

export default HotDeals;
