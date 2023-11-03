import CartShoe from '@/components/cards/CartShoe';
import Border from '@/components/shared/Border';
import React from 'react';

const Cart = () => {
    return (
        <div className="flex flex-col items-center px-10">
            <span className="font-bold text-3xl text-blue">Cart</span>
            <div className="w-full flex gap-5 text-cart">
                <input type="checkbox" />
                <span>Select all</span>
                <span>Delete all</span>
                <span>Delete selected Items</span>
            </div>
            <div>vien den</div>

            <div className="flex gap-5 w-full">
                <CartShoe />

                <div className="p-5 w-[310px] shadow-xl rounded-lg h-max">
                    <div className="flex justify-between font-medium text-sm mb-[25px]">
                        <div className="flex flex-col gap-5">
                            <span>Subtotal</span>
                            <span>Subquantity</span>
                            <span>Shipping fee</span>
                        </div>
                        <div className="flex flex-col items-end gap-5">
                            <span>$998</span>
                            <span>2</span>
                            <span>free</span>
                        </div>
                    </div>
                    <Border />
                    <div className="text-2xl font-semibold flex justify-between my-5">
                        <span>Total</span>
                        <span>$998</span>
                    </div>
                    <button className="bg-bluev4 w-full h-[60px] rounded-lg font-bold text-white">Check out</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
