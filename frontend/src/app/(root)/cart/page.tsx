import React from 'react';

const Cart = () => {
    return (
        <div>
            <h1>Cart</h1>
            <div>
                check box
                <span>Select all</span>
                <span>Delete all</span>
                <span>Delete selected Items</span>
            </div>
            <div>vien den</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>PRODUCT</th>
                            <th>SIZE</th>
                            <th>QTY</th>
                            <th>UNIT PRICE</th>
                            <th>PRICE</th>
                        </tr>
                    </thead>
                    <div>vien den</div>

                    <tbody>
                        <tr>
                            <td>
                                <div>ảnh</div>
                                <span>Nike Airmax 270 react</span>
                            </td>
                            <td>
                                <select name="" id="">
                                    <option value="">42</option>
                                    <option value="">43</option>
                                    <option value="">44</option>
                                    <option value="">45</option>
                                </select>
                            </td>
                            <td>
                                <span>-</span>
                                <span>2</span>
                                <span>+</span>
                            </td>
                            <td>$499</td>
                            <td>$998</td>
                            <td>X</td>
                        </tr>
                        <div>vien den</div>
                    </tbody>
                </table>
            </div>
            <div>
                <div>
                    <span>Subtotal</span>
                    <span>$998</span>
                </div>
                <div>
                    <span>Subquantity</span>
                    <span>2</span>
                </div>
                <div>
                    <span>Shipping fee</span>
                    <span>free</span>
                </div>
                <div>vien den</div>
                <div>
                    <span>Total</span>
                    <span>$998</span>
                </div>
                <button>Check out</button>
            </div>
        </div>
    );
};

export default Cart;
