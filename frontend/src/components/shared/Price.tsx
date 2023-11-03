import React from 'react';

const Price = () => {
    return (
        <div className="p-5 bg-deal rounded-lg">
            <span className="font-bold text-lg">Prices</span>
            <div className="flex gap-[52px] mt-5">
                <span>Ranger:</span>
                <div>
                    <span>$13.99</span>
                    <span>-</span>
                    <span>$13.99</span>
                </div>
            </div>
            <input type="range" name="" id="" />
        </div>
    );
};

export default Price;
