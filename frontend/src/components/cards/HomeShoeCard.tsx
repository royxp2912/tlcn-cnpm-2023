import { Product, Variant } from '@/types/type';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

const HomeShoeCard = () => {
    const { productDetail, variants } = useSelector((state: any) => state.products) as {
        productDetail: Product;
        variants: Variant;
    };
    // console.log(productDetail);
    const color: { [key: string]: string } = {
        Blue: 'bg-[#006CFF]',
        Red: 'bg-[#FC3E39]',
        Black: 'bg-[#171717]',
        Pink: 'bg-[#FF00B4]',
        Yellow: 'bg-[#FFF600]',
        Wheat: 'bg-[#EFDFDF]',
    };

    return (
        <div className="flex items-center pt-[60px] px-[212px] gap-14">
            <div className="w-5/12 flex flex-col">
                <h1 className="font-black text-2xl text-white mb-2 uppercase">{productDetail.name}</h1>
                <p className="text-gray text-[14px] text-justify">{productDetail.desc}</p>

                <div className="flex items-center mt-8 mb-5">
                    <span className="text-white-60 font-bold w-[60px]">Color:</span>
                    <div className="flex gap-1">
                        {variants.listColor &&
                            variants.listColor.map((item) => (
                                <div key={item} className={`w-5 h-5 rounded-full ${color[item]}`}></div>
                            ))}
                    </div>
                </div>
                <div className="flex items-center ">
                    <span className="text-white-60 font-bold w-[60px]">Size:</span>
                    <div className="text-size flex gap-1">
                        {variants.listSize &&
                            variants.listSize.map((item) => (
                                <div
                                    key={item}
                                    className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold"
                                >
                                    {item}
                                </div>
                                // {/* <div className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold">
                                //     38
                                // </div>
                                // <div className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold">
                                //     38
                                // </div>
                                // <div className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold">
                                //     38
                                // </div>
                                // <div className="w-8 h-7 bg-[#8d9096] rounded-md flex items-center justify-center font-bold">
                                //     38
                                // </div> */}
                            ))}
                    </div>
                </div>
                <span className="text-4xl font-bak text-[#FFD6AE] mt-5 mb-2">$ {productDetail.price}</span>
                <button className="w-60 h-[50px] border-2 border-orange rounded-md text-lg font-bold text-orange cursor-pointer hover:opacity-60">
                    Buy Now
                </button>
            </div>
            <div className="w-7/12 flex items-center justify-center gap-10 ">
                <div className="w-[380px] h-[380px] relative">
                    <Image
                        src={productDetail.images && productDetail.images[0]}
                        alt="Nike"
                        fill
                        className="rotate-[-16deg] rounded-full"
                    />
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
