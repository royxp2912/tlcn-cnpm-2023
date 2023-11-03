import React from 'react';

const colors = ['bg-[#006CFF]', 'bg-[#FC3E39]', 'bg-[#171717]', 'bg-[#FFF600]', 'bg-[#FF00B4]', 'bg-[#EFDFDF]'];

const Color = () => {
    return (
        <div className="p-5 bg-deal rounded-lg">
            <span className="font-bold text-lg">Color</span>
            <div className="flex justify-between mt-5">
                {colors &&
                    colors.map((color, index) => <div key={index} className={`${color} h-5 w-5 rounded-full `}></div>)}
            </div>
        </div>
    );
};

export default Color;
