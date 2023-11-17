import Revenue from '@/components/chart/Revenue';
import React from 'react';

const OrderStatis = () => {
    return (
        <div className="flex flex-col gap-[10px]">
            <div>{/* Option của mui */}</div>
            <div>
                <Revenue path="Total Orders" />
            </div>
            <div></div>
        </div>
    );
};

export default OrderStatis;
