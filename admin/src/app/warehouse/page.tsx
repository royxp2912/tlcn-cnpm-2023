import Revenue from '@/components/chart/Revenue';
import Top from '@/components/chart/Top';
import React from 'react';

const WareHouseStatis = () => {
    return (
        <div>
            <div>
                <Revenue path="Total Product Sold" />
            </div>
            <div>
                <Top path="product" />
            </div>
        </div>
    );
};

export default WareHouseStatis;
