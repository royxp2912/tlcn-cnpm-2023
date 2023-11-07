import { Brand } from '@/types/type';
import React from 'react';

type Props = {
    brands: Brand[];
};

const Brand = ({ brands }: Props) => {
    return (
        <div className="bg-deal p-5 rounded-lg">
            <span className="font-bold text-lg">Hot Deals</span>
            <div>
                {brands &&
                    brands.map((brand) => (
                        <div className="flex justify-between mt-5">
                            <span>{brand.brand}</span>
                            <span>{brand.quantity}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Brand;
