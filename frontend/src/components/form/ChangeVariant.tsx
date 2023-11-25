'use client';

import { getProductById } from '@/slices/productSlice';
import { getColorOfSize } from '@/slices/variantSlice';
import { User, Variant, getSizeOfColor, variantColor } from '@/types/type';
import axios from '@/utils/axios';
import { AppDispatch } from '@/utils/store';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
    productId: string;
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
    sizeQty: variantColor;
    setSizeQty: Dispatch<SetStateAction<variantColor>>;
    itemQty: number;
    setItemQty: Dispatch<SetStateAction<number>>;
    setActive: Dispatch<SetStateAction<boolean>>;
    setLoad: Dispatch<SetStateAction<boolean>>;
};

const ChangeVariant = ({
    productId,
    color,
    setColor,
    itemQty,
    setItemQty,
    sizeQty,
    setSizeQty,
    setActive,
    setLoad,
}: Props) => {
    const { variants }: { variants: Variant } = useSelector((state: any) => state.products);
    const { variant }: { variant: variantColor[] } = useSelector((state: any) => state.variants);
    const dispatch = useDispatch<AppDispatch>();

    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;

    const handleInsc = () => {
        if (!color || !sizeQty.size) {
            toast.error('Choose Color And Size');
        } else {
            if (itemQty === sizeQty.quantity) return;
            setItemQty((prev) => prev + 1);
        }
    };
    const handleDesc = () => {
        if (!color || !sizeQty.size) toast.error('Choose Color And Size');
        else {
            if (itemQty === 1) return;
            setItemQty((prev) => prev - 1);
        }
    };

    const handleSizeQty = (size: variantColor) => {
        setSizeQty({
            size: size.size,
            quantity: size.quantity,
        });
    };

    const handleChange = async () => {
        const { data } = await axios.patch('/carts/update/variants', {
            user: id,
            product: productId,
            color: color,
            size: sizeQty.size,
            quantity: itemQty,
        });
        if (data.success) {
            toast.success('Update variant success');
            setActive(false);
            setLoad((prev) => !prev);
        } else {
            toast.error('Update variant fail');
        }
    };

    useEffect(() => {
        const item: getSizeOfColor = {
            id: productId,
            color: color as string,
        };
        dispatch(getProductById(productId));
        dispatch(getColorOfSize(item));
        setSizeQty((prev) => ({
            ...prev,
            quantity: 0,
        }));
    }, [color]);
    useEffect(() => {
        const foundVariant = variant.find((v: variantColor) => v.size === sizeQty.size);
        if (foundVariant) {
            const { quantity } = foundVariant;
            setSizeQty((prev: any) => ({
                ...prev,
                quantity: quantity,
            }));
        } else {
            setSizeQty((prev: any) => ({
                ...prev,
                quantity: 0,
            }));
        }
    }, [variant, sizeQty.size]);

    return (
        <div className="modal">
            <div className="flex flex-col bg-white modal-container ">
                <div className="flex flex-col items-center ">
                    <div className="flex items-center mt-[25px] mb-5 w-full">
                        <span className="font-medium flex-1">Color:</span>
                        <div className="font-bold text-white flex gap-2">
                            {variants.listColor &&
                                variants.listColor.map((c) => (
                                    <div
                                        key={c}
                                        className={`${colors[c]} relative  h-5 w-5 rounded-full cursor-pointer`}
                                        onClick={() => setColor(c)}
                                    >
                                        {color === c && (
                                            <div
                                                className={`absolute inset-[-4px] p-3 rounded-full border-2 ${borders[c]}`}
                                            ></div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex items-center mt-[25px] mb-5 w-full">
                        <span className="font-medium flex-1">Size:</span>
                        <div className="font-bold text-white flex gap-1">
                            {variant &&
                                variant.map((size: variantColor, i: number) => (
                                    <div
                                        key={i}
                                        className={`text-sm w-9 h-7 ${
                                            sizeQty.size === size.size ? 'bg-blue' : 'bg-size2 '
                                        } rounded-md flex items-center justify-center cursor-pointer`}
                                        onClick={() => handleSizeQty(size)}
                                    >
                                        {size.size}
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="font-medium mb-[25px] flex w-full ">
                        <span className="flex-1">Availability:</span>
                        <span>{sizeQty.quantity === 0 ? '' : sizeQty.quantity}</span>
                    </div>

                    <div className="flex h-[50px] text-xl font-bold">
                        <span
                            className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tl-md rounded-bl-md text-blue cursor-pointer"
                            onClick={handleDesc}
                        >
                            -
                        </span>
                        <span className="w-[62px] flex items-center justify-center bg-[#FAFBFB] rounded-md ">
                            {itemQty}
                        </span>
                        <span
                            className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tr-md rounded-br-md text-blue cursor-pointer"
                            onClick={handleInsc}
                        >
                            +
                        </span>
                    </div>
                </div>
                <button
                    className="w-[200px] h-10 rounded-full bg-blue text-white font-bold hover:bg-opacity-60 mt-5"
                    onClick={handleChange}
                >
                    Comfirm
                </button>
                <button
                    className="w-[200px] h-10 rounded-full bg-red text-white font-bold hover:bg-opacity-60 mt-5"
                    onClick={() => setActive(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ChangeVariant;
