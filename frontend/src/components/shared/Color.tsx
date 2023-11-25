'use client';
import React, { Dispatch, SetStateAction } from 'react';

const colors: { [key: string]: string } = {
    Blue: 'bg-[#006CFF]',
    Red: 'bg-[#FC3E39]',
    Black: 'bg-[#171717]',
    Pink: 'bg-[#FF00B4]',
    Yellow: 'bg-[#FFF600]',
    Wheat: 'bg-[#EFDFDF]',
};
const borders: { [key: string]: string } = {
    Blue: 'border-[#006CFF]',
    Red: 'border-[#FC3E39]',
    Black: 'border-[#171717]',
    Pink: 'border-[#FF00B4]',
    Yellow: 'border-[#FFF600]',
    Wheat: 'border-[#EFDFDF]',
};
type Props = {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
};
const Color = ({ color, setColor }: Props) => {
    return (
        <div className="p-5 bg-deal rounded-lg">
            <span className="font-bold text-lg">Color</span>
            <div className="flex justify-between mt-5">
                {Object.keys(colors).map((c, index) => (
                    <div
                        key={index}
                        className={`${colors[c]} relative  h-5 w-5 rounded-full cursor-pointer`}
                        onClick={() => setColor(c)}
                    >
                        {color === c && (
                            <div className={`absolute inset-[-4px] p-3 rounded-full border-2 ${borders[c]}`}></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Color;
