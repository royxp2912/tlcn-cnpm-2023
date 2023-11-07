'use client';
import { Brand } from '@/types/type';
import React from 'react';
import { useSelector } from 'react-redux';

type Props = {
    hotdeals: Brand[];
};

const HotDeals = ({ hotdeals }: Props) => {
    return (
        <div className="bg-deal p-5 rounded-lg">
            <span className="font-bold text-lg">Hot Deals</span>
            <div>
                {hotdeals &&
                    hotdeals.map((brand) => (
                        <div className="flex justify-between mt-5">
                            <span>{brand.brand}</span>
                            <span>{brand.quantity}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default HotDeals;
