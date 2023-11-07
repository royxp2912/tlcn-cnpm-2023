'use client';
import CartShoe from '@/components/cards/CartShoe';
import Border from '@/components/shared/Border';
import { getCartByUserId } from '@/slices/cartSlice';
import { Cart, User } from '@/types/type';
import axios from '@/utils/axios';
import { AppDispatch } from '@/utils/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { cartItem }: { cartItem: Cart } = useSelector((state: any) => state.carts);
    const router = useRouter();
    const [checkedAll, setCheckedAll] = useState(false);
    const [quantity, setQuantity] = useState({});
    const [price, setPrice] = useState({});
    const [qty, setQty] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const userString = localStorage.getItem('user');
    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const length = cartItem.items && cartItem.items.length;
    const id = user?._id as string;
    useEffect(() => {
        dispatch(getCartByUserId(id));
    }, [length]);
    const handleCheckout = async () => {
        router.push('/order');
    };

    return (
        <div className="flex flex-col items-center px-10">
            <span className="font-bold text-3xl text-blue">Cart</span>
            <div className="w-full flex gap-5 text-cart">
                <input
                    type="checkbox"
                    checked={checkedAll}
                    onChange={() => setCheckedAll((prev) => !prev)}
                    className={`${checkedAll === true ? 'checked:accent-blue' : ''}`}
                />
                <span>Select all</span>
                <span>Delete all</span>
                <span>Delete selected Items</span>
            </div>

            <div className="flex gap-5 w-full">
                <CartShoe
                    checkedAll={checkedAll}
                    setCheckedAll={setCheckedAll}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    price={price}
                    setPrice={setPrice}
                    setQty={setQty}
                    setTotal={setTotal}
                />

                <div className="p-5 w-[310px] shadow-xl rounded-lg h-max">
                    <div className="flex justify-between font-medium text-sm mb-[25px]">
                        <div className="flex flex-col gap-5">
                            <span>Subtotal</span>
                            <span>Subquantity</span>
                            <span>Shipping fee</span>
                        </div>
                        <div className="flex flex-col items-end gap-5">
                            <span>${total}</span>
                            <span>{qty}</span>
                            <span>free</span>
                        </div>
                    </div>
                    <Border />
                    <div className="text-2xl font-semibold flex justify-between my-5">
                        <span>Total</span>
                        <span>${cartItem.total}</span>
                    </div>
                    <button
                        className="bg-bluev4 w-full h-[60px] rounded-lg font-bold text-white"
                        onClick={handleCheckout}
                    >
                        Check out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
