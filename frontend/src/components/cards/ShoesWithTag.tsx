'use client';
import { Rating } from '@mui/material';
import Image from 'next/image';
import React, { MouseEvent } from 'react';
import Border from '../shared/Border';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Product, User, itemCartRandomVari } from '@/types/type';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { addItemToCartRandomVariant } from '@/slices/cartSlice';
type Props = {
    listProduct: Product[];
};
const ShoesWithTag = ({ listProduct }: Props) => {
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

    const handleDetail = (id: string) => {
        router.push(`/shoes/${id}`);
    };

    const handleAddtoCart = async (
        e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
        { product, image, name, price }: itemCartRandomVari,
    ) => {
        e.stopPropagation();
        if (!user) {
            toast.error('Please login before add to cart', {
                onClose: () => {
                    router.push('/sign-in');
                },
            });
            return;
        }
        const cart = {
            user: idUser,
            product,
            image,
            name,
            price,
        };

        await dispatch(addItemToCartRandomVariant(cart));
        toast.success('Add to cart success');
        // if((res.payload as { status: number }).status === 201){
        //     toast.success((res.payload as { status: string }).data.message)
        // }
    };
    return (
        <div>
            {listProduct && listProduct.length === 0 ? (
                <span>Sản phẩm đã hiển thị hết</span>
            ) : (
                listProduct.map((product) => (
                    <div
                        key={product._id}
                        className="flex flex-col gap-5 mb-5"
                        onClick={() => handleDetail(product._id)}
                    >
                        <div className="flex gap-5">
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
                                    <div className="flex-grow"></div>
                                    <div
                                        className="w-40 h-[40px] flex items-center justify-center gap-4 bg-buy text-blue rounded-md"
                                        onClick={(e) =>
                                            handleAddtoCart(e, {
                                                product: product._id,
                                                image: product.images[0],
                                                name: product.name,
                                                price: product.price,
                                            })
                                        }
                                    >
                                        <ShoppingCartOutlinedIcon />
                                        <span className="font-bold">Add To Cart</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Border />
                    </div>
                ))
            )}
        </div>
    );
};

export default ShoesWithTag;
