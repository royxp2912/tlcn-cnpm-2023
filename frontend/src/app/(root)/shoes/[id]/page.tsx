'use client';
import { Rating } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import BorderBlack from '@/components/shared/Border';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoeInfo from '@/components/cards/ShoeInfo';
import Reviews from '@/components/cards/Reviews';
import SingleSellShoe from '@/components/cards/SingleSellShoe';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { useParams } from 'next/navigation';
import { getProductById, getProductHotDeal } from '@/slices/productSlice';
import { ItemCart, Product, User, Variant, getSizeOfColor, variantColor } from '@/types/type';
import { getColorOfSize } from '@/slices/variantSlice';
import { toast } from 'react-toastify';
import { addItemToCartByUserId } from '@/slices/cartSlice';
import { useRouter } from 'next/navigation';

const unProp = {
    productHots: [],
    active: false,
};

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

const ShoesSinglePage = () => {
    const {
        products,
        productHots,
        productDetail,
        variants,
    }: { products: Product[]; productHots: Product[]; productDetail: Product; variants: Variant } = useSelector(
        (state: any) => state.products,
    );
    const { variant }: { variant: variantColor[] } = useSelector((state: any) => state.variants);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

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

    const { id } = useParams() as { id: string };
    const [color, setColor] = useState<string>();
    const [number, setNumber] = useState<number>(0);
    const [sizeQty, setSizeQty] = useState<variantColor>({
        size: '',
        quantity: 0,
    });
    const [quantity, setQuantity] = useState<number>(1);

    const [isNext, setIsNext] = useState<boolean>(false);
    const [isBack, setIsBack] = useState<boolean>(false);
    const [back, setBack] = useState<number>(0);
    const [next, setNext] = useState<number>(4);

    const handleImage = (i: number) => {
        setNumber(i);
    };

    const handleInsc = () => {
        if (!color || !sizeQty.size) {
            toast.error('Choose Color And Size');
        } else {
            if (quantity === sizeQty.quantity) return;
            setQuantity((prev) => prev + 1);
        }
    };
    const handleDesc = () => {
        if (!color || !sizeQty.size) toast.error('Choose Color And Size');
        else {
            if (quantity === 1) return;
            setQuantity((prev) => prev - 1);
        }
    };

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
            quantity: quantity,
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
        setSizeQty((prev) => ({
            ...prev,
            quantity: 0,
        }));
        dispatch(getProductHotDeal()).unwrap();
        dispatch(getProductById(id));
        dispatch(getColorOfSize(item));
    }, [color]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between  gap-[100px] mt-[52px] mb-[116px] w-[1020px]">
                <div className="w-[420px]">
                    <div className="h-[328px] relative bg-bg_sell rounded-lg border-gray border-2 overflow-hidden">
                        <Image src={productDetail.images && productDetail.images[number]} alt="giày" fill />
                    </div>
                    <div className="flex gap-5 mt-5">
                        {productDetail &&
                            productDetail.images &&
                            productDetail.images.map((item, i) => (
                                <div
                                    key={i}
                                    className="w-[90px] h-[90px] relative bg-bg_sell rounded-lg border-gray border-4 overflow-hidden"
                                >
                                    <Image
                                        src={item}
                                        alt="giày"
                                        fill
                                        onClick={() => handleImage(i)}
                                        className="cursor-pointer"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{productDetail.name}</h1>
                    <div className="flex items-center gap-10 mt-[23px] mb-[25px]">
                        <Rating value={4} readOnly emptyIcon={<StarIcon className="text-star" />} />

                        <span className="text-rv">0 review</span>
                        <span className="text-blue cursor-pointer">Submit a review</span>
                    </div>
                    <BorderBlack />
                    <span className="text-3xl text-money font-bak mt-[25px] mb-[25px] block">
                        ${productDetail.price}
                    </span>
                    <span className="font-medium mb-[25px] block">free shipping</span>
                    <BorderBlack />
                    <div className="flex items-center mt-[25px] mb-5">
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
                    <div className="flex items-center mt-[25px] mb-5">
                        <span className="font-medium flex-1">Size:</span>
                        <div className="font-bold text-white flex gap-1">
                            {variant &&
                                variant.map((size: variantColor, i: number) => (
                                    <div
                                        key={i}
                                        className={`text-sm w-9 h-7  rounded-md flex items-center justify-center cursor-pointer ${
                                            size.size === sizeQty.size ? 'bg-blue' : 'bg-size2'
                                        }`}
                                        onClick={() => handleSizeQty(size)}
                                    >
                                        {size.size}
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="font-medium mb-[25px] flex ">
                        <span className="flex-1">Availability:</span>
                        <span>{sizeQty.quantity === 0 ? '' : sizeQty.quantity}</span>
                    </div>
                    <BorderBlack />
                    <div className="flex justify-between mt-5">
                        <div className="flex h-[50px] text-xl font-bold">
                            <span
                                className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tl-md rounded-bl-md text-blue cursor-pointer hover:bg-blue hover:text-white"
                                onClick={handleDesc}
                            >
                                -
                            </span>
                            <span className="w-[62px] flex items-center justify-center bg-[#FAFBFB] rounded-md ">
                                {quantity}
                            </span>
                            <span
                                className="w-11 flex items-center justify-center bg-[#F6F7F8] rounded-tr-md rounded-br-md text-blue cursor-pointer hover:bg-blue hover:text-white"
                                onClick={handleInsc}
                            >
                                +
                            </span>
                        </div>
                        <div className="flex gap-5 ">
                            <div
                                onClick={handleAddToCart}
                                className="w-40 h-[50px] flex items-center justify-center gap-4 bg-buy text-blue rounded-md cursor-pointer hover:bg-blue hover:text-white"
                            >
                                <ShoppingCartOutlinedIcon />
                                <span className="font-bold">Add To Cart</span>
                            </div>
                            <div className="w-[50px] h-[50px] bg-buy flex items-center justify-center rounded-md cursor-pointer">
                                <FavoriteBorderOutlinedIcon className="text-blue" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 pt-[25px] pb-5 bg-bg_sell rounded-lg w-[1020px]">
                <div className="text-lg font-medium flex mb-[25px]">
                    <span className="w-[180px] border-b-2 border-blue flex items-center justify-center">
                        Shoe Information
                    </span>
                    <div className="w-[160px] flex items-center justify-center gap-3">
                        <span>Review</span>
                        <span className="text-rv">0</span>
                    </div>
                </div>
                {/* view about shoes info and review*/}
                <ShoeInfo detail={productDetail.desc} />
                {/* <Reviews /> */}
            </div>
            <div className="mt-24 flex flex-col items-center">
                <span className="font-bold text-3xl text-blue">Hot Shoes</span>
                <div className="mt-5 w-full">
                    {/* Vỉew hot shoes (component singlesellshoe) */}
                    <SingleSellShoe
                        products={productHots}
                        isNext={isNext}
                        setIsNext={setIsNext}
                        isBack={isBack}
                        setIsBack={setIsBack}
                        next={next}
                        setNext={setNext}
                        back={back}
                        setBack={setBack}
                        {...unProp}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShoesSinglePage;
