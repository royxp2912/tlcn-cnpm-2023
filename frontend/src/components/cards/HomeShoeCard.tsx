import Image from 'next/image';
import React from 'react';

const HomeShoeCard = () => {
    return (
        <div className="flex items-center pt-[60px] px-[212px] gap-14">
            <div className="w-5/12 flex flex-col">
                <h1 className="font-black text-2xl text-white mb-2 font-outline-2">NIKE NIKE DUNK</h1>
                <p className="text-gray text-justify">
                    Thiết kế Nike Dunk đầu tiên được giới thiệu lần đầu vào năm 1985 và được thiết kế bởi Peter Moore,
                    một trong những nhà thiết kế có ảnh hưởng nhất trong lịch sử của thương hiệu. Mang những điểm tương
                    đồng với Jordan 1 và Terminator – hai thiết kế đều được giới thiệu cùng năm và được thiết kế bởi
                    cùng một đội nhóm – Nike Dunk tự hào về công nghệ và cấu trúc tương tự như những người anh em của
                    nó.
                </p>

                <div className="flex items-center mt-8 mb-5">
                    <span className="text-white-60 font-bold w-[60px]">Color:</span>
                    <div>
                        <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                    </div>
                </div>
                <div className="flex items-center ">
                    <span className="text-white-60 font-bold w-[60px]">Size:</span>
                    <div className="text-size flex gap-1">
                        <div className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold">
                            38
                        </div>
                        <div className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold">
                            38
                        </div>
                        <div className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold">
                            38
                        </div>
                        <div className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold">
                            38
                        </div>
                        <div className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold">
                            38
                        </div>
                    </div>
                </div>
                <span className="text-4xl font-bold text-[#FFD6AE] mt-5 mb-2">$ 189</span>
                <button className="w-60 h-[50px] border-2 border-orange rounded-md text-lg font-bold text-orange">
                    Buy Now
                </button>
            </div>
            <div className="w-7/12 flex items-center justify-center gap-10 ">
                <div>
                    <Image src="/nike.png" alt="Nike" width={380} height={380} className="rotate-[-16deg]" />
                </div>
                <div className="relative w-10 h-52 flex flex-col">
                    <Image
                        src="/rating.png"
                        alt="Rating"
                        width={32}
                        height={32}
                        className="absolute top-0 left-[-2px]"
                    />
                    <Image
                        src="/rating.png"
                        alt="Rating"
                        width={32}
                        height={32}
                        className="absolute top-[40px] left-[18px]"
                    />
                    <Image
                        src="/rating.png"
                        alt="Rating"
                        width={32}
                        height={32}
                        className="absolute top-[90px] left-[22px]"
                    />
                    <Image
                        src="/rating.png"
                        alt="Rating"
                        width={32}
                        height={32}
                        className="absolute bottom-[40px] left-[18px]"
                    />
                    <Image
                        src="/rating.png"
                        alt="Rating"
                        width={32}
                        height={32}
                        className="absolute bottom-0 left-[-2px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeShoeCard;
