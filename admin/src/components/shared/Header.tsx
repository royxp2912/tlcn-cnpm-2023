import Image from 'next/image';
import React from 'react';

const Header = () => {
    return (
        <div className="flex px-5 py-4 items-center justify-between shadow-header ml-[2px] bg-white">
            <div className="text-5xl flex items-center gap-1">
                <span className="font-birsmark">P</span>
                <span className="font-fb">&</span>
                <span className="font-birsmark">P</span>
            </div>
            <div className="flex items-center gap-[10px]">
                <span className="font-bold">Han So Hee</span>
                <Image src="/avt.png" alt="avt" width={40} height={40} />
            </div>
        </div>
    );
};

export default Header;
