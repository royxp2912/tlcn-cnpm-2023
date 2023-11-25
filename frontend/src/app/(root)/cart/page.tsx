'use client';
import CartShoe from '@/components/cards/CartShoe';
import ChangeVariant from '@/components/form/ChangeVariant';
import Border from '@/components/shared/Border';
import { getCartByUserId } from '@/slices/cartSlice';
import type { Cart, User, variantColor } from '@/types/type';
import axios from '@/utils/axios';
import { AppDispatch } from '@/utils/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { cartItem }: { cartItem: Cart } = useSelector((state: any) => state.carts);
    const router = useRouter();
    const [price, setPrice] = useState({});
    const [qty, setQty] = useState<number>(0);
    const [quantity, setQuantity] = useState({});
    const [total, setTotal] = useState<number>(0);
    const [checkedAll, setCheckedAll] = useState(false);
    const [active, setActive] = useState<boolean>(false);
    const [productId, setProductId] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [itemQty, setItemQty] = useState<number>(0);
    const [sizeQty, setSizeQty] = useState<variantColor>({
        size: '',
        quantity: 0,
    });
    const [load, setLoad] = useState<boolean>(false);

    const initialCheckedItems = (cartItem.items ?? []).reduce((acc, item) => {
        acc[item.product] = false;
        return acc;
    }, {} as { [key: string]: boolean });

    const [checkedItems, setCheckedItems] = React.useState<{ [key: string]: boolean }>(initialCheckedItems);

    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

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
        localStorage.setItem('itemOrders', '');
        localStorage.setItem('totalPrice', '');
    }, [length, load]);

    const handleCheckout = async () => {
        router.push('/order');
    };

    const handleCheckedAll = async () => {
        setCheckedAll((prev) => !prev);

        if (!checkedAll) {
            setTotal(cartItem.total);
            setQty(cartItem.items.reduce((acc, cur) => acc + cur.quantity, 0));
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of cartItem.items) {
                updatedCheckedItems[item.product] = true;
            }
            localStorage.setItem('itemOrders', JSON.stringify(cartItem.items));
            localStorage.setItem('totalPrice', JSON.stringify(cartItem.total));
            setCheckedItems(updatedCheckedItems);
        } else {
            setTotal(0);
            setQty(0);
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of cartItem.items) {
                updatedCheckedItems[item.product] = false;
            }
            localStorage.setItem('itemOrders', '');
            localStorage.setItem('totalPrice', '');
            setCheckedItems(updatedCheckedItems);
        }
    };

    return (
        <div className="flex flex-col items-center px-10">
            <span className="font-bold text-3xl text-blue">Cart</span>
            <div className="w-full flex gap-5 text-cart">
                <input
                    type="checkbox"
                    checked={checkedAll}
                    onChange={handleCheckedAll}
                    className={`${checkedAll === true ? 'checked:accent-blue cursor-pointer' : 'cursor-pointer'}`}
                />
                <span>Select all</span>
                <span>Delete all</span>
                <span>Delete selected Items</span>
            </div>

            <div className="flex gap-5 w-full">
                <CartShoe
                    cartItem={cartItem}
                    checkedItems={checkedItems}
                    setCheckedItems={setCheckedItems}
                    checkedAll={checkedAll}
                    setCheckedAll={setCheckedAll}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    price={price}
                    setPrice={setPrice}
                    setQty={setQty}
                    setTotal={setTotal}
                    setActive={setActive}
                    setProductId={setProductId}
                    setColor={setColor}
                    setItemQty={setItemQty}
                    setSizeQty={setSizeQty}
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
                        <span>${total}</span>
                    </div>
                    <button
                        className="bg-bluev4 w-full h-[60px] rounded-lg font-bold text-white"
                        onClick={handleCheckout}
                    >
                        Check out
                    </button>
                </div>
            </div>
            {active && (
                <ChangeVariant
                    color={color}
                    itemQty={itemQty}
                    productId={productId}
                    setActive={setActive}
                    setColor={setColor}
                    setItemQty={setItemQty}
                    setSizeQty={setSizeQty}
                    sizeQty={sizeQty}
                    setLoad={setLoad}
                />
            )}
        </div>
    );
};

export default Cart;
