import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Border from '../shared/Border';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Product } from '@/types/type';
type Props = {
    listProduct: Product[];
};
const ShoesWithTag = ({ listProduct }: Props) => {
    return (
        <div>
            {listProduct && listProduct.length === 0 ? (
                <span>Sản phẩm đã hiển thị hết</span>
            ) : (
                listProduct.map((product) => (
                    <div key={product._id} className="flex gap-5 mb-5">
                        <div className="bg-deal flex items-center justify-center rounded-xl w-[300px] h-[280px] relative overflow-hidden">
                            <Image src={product.images[0]} alt="Giày" fill />
                        </div>
                        <div className="w-[700px]">
                            <span className="text-2xl font-bold truncate w-full block ">{product.name}</span>
                            <div className="flex gap-10 items-center mt-[15px] mb-[27px] flex-grow">
                                <Rating name="read-only" value={4} readOnly />
                                <span className="text-rv font-medium">0 reviews</span>
                                <span className="font-medium text-blue">Submit a review</span>

                                <div className="flex-grow" />
                                <div className="w-10 h-10 rounded-lg text-center text-3xl bg-bluev2 text-blue">
                                    <FavoriteBorderOutlinedIcon />
                                </div>
                            </div>
                            <Border />
                            <span className="text-2xl text-money my-[15px] block">${product.price}</span>
                            <p className="text-sm text-justify mb-[11px] truncate w-full">{product.desc}</p>
                            <Border />
                            <div className="flex mt-[10px]">
                                <div className="font-medium flex items-center gap-5">
                                    <span>Availability:</span>
                                    <span>300</span>
                                </div>
                                <div className="flex-grow"></div>
                                <div className="flex h-[40px] text-lg font-bold mr-2">
                                    <span className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tl-md rounded-bl-md text-blue">
                                        -
                                    </span>
                                    <span className="w-[62px] flex items-center justify-center bg-[#FAFBFB] rounded-md ">
                                        2
                                    </span>
                                    <span className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tr-md rounded-br-md text-blue">
                                        +
                                    </span>
                                </div>
                                <div className="w-40 h-[40px] flex items-center justify-center gap-4 bg-buy text-blue rounded-md">
                                    <ShoppingCartOutlinedIcon />
                                    <span className="font-bold">Add To Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ShoesWithTag;
