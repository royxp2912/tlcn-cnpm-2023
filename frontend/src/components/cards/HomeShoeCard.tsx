import { addItemToCartByUserId } from '@/slices/cartSlice';
import { getColorOfSize } from '@/slices/variantSlice';
import { ItemCart, Product, User, Variant, getSizeOfColor, variantColor } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type Props = {
    id: string;
};

const HomeShoeCard = ({ id }: Props) => {
    const { productDetail, variants } = useSelector((state: any) => state.products) as {
        productDetail: Product;
        variants: Variant;
    };
    const { variant }: { variant: variantColor[] } = useSelector((state: any) => state.variants);

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
    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const idUser = user?._id as string;

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [color, setColor] = useState<string>();
    const [sizeQty, setSizeQty] = useState<variantColor>({
        size: '',
        quantity: 0,
    });

    const handleSizeQty = (size: variantColor) => {
        setSizeQty({
            size: size.size,
            quantity: size.quantity,
        });
    };

    const handleAddToCart = async () => {
        if (!user) {
            toast.error('Please login before add to cart', {
                onClose: () => {
                    setTimeout(() => {
                        router.push('/sign-in');
                    }, 3000);
                },
            });
            return;
        }

        if (!color || !sizeQty.size) {
            toast.error('Choose Color And Size');
            return;
        }
        if (sizeQty.quantity === 0) {
            toast.error('Out of stock');
            return;
        }

        const item: ItemCart = {
            user: idUser,
            product: id,
            image: productDetail.images[0],
            name: productDetail.name,
            color: color as string,
            size: sizeQty.size,
            quantity: 1,
            price: productDetail.price,
        };

        const res = await dispatch(addItemToCartByUserId(item));
        if ((res.payload as { status: number }).status === 201) {
            toast.success('Add item to cart success');
        }
    };
    useEffect(() => {
        const item: getSizeOfColor = {
            id: id,
            color: color as string,
        };
        dispatch(getColorOfSize(item));
    }, [color]);

    return (
        <div className="flex items-center pt-[60px] px-[212px] gap-14">
            <div className="w-5/12 flex flex-col">
                <h1 className="font-black text-base text-white mb-2 uppercase">{productDetail.name}</h1>
                <p className="text-gray text-[14px] text-justify">{productDetail.desc}</p>

                <div className="flex items-center mt-8 mb-5">
                    <span className="text-white-60 font-bold w-[60px]">Color:</span>
                    <div className="flex gap-2">
                        {variants.listColor &&
                            variants.listColor.map((item) => (
                                <div
                                    key={item}
                                    className={`w-5 h-5 relative rounded-full cursor-pointer ${colors[item]}`}
                                    onClick={() => {
                                        setSizeQty((prev) => ({
                                            ...prev,
                                            quantity: 0,
                                        }));
                                        setColor(item);
                                    }}
                                >
                                    {color === item && (
                                        <div
                                            className={`absolute inset-[-4px] p-3 rounded-full border-2 ${borders[item]}`}
                                        ></div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex items-center ">
                    <span className="text-white-60 font-bold w-[60px]">Size:</span>
                    <div className="text-size flex gap-1">
                        {variant &&
                            variant.map((item: variantColor, i: number) => (
                                <div
                                    key={i}
                                    className={`w-8 h-7 cursor-pointer ${
                                        item.size === sizeQty.size ? 'bg-blue' : 'bg-[#8d9096] '
                                    } rounded-md flex items-center justify-center font-bold`}
                                    onClick={() => handleSizeQty(item)}
                                >
                                    {item.size}
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
                <span className="font-bak text-[#FFD6AE] text-base mt-5 mb-2">$ {productDetail.price}</span>
                <button
                    onClick={handleAddToCart}
                    className="w-60 h-[50px] border-2 border-orange rounded-md text-base font-bold text-orange cursor-pointer hover:opacity-60"
                >
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
