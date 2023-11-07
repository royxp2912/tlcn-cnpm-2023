'use client';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Cart, RemoveItemCart, User } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import { removeItemFromCartByUserId } from '@/slices/cartSlice';
import { toast } from 'react-toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 132,
        },
    },
};

type QuantityMap = {
    [product: string]: number;
};

type PriceMap = {
    [product: string]: number;
};

type Props = {
    cartItem: Cart;
    checkedItems: { [key: string]: boolean; };
    setCheckedItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean; }>>;
    checkedAll: boolean;
    setCheckedAll: React.Dispatch<React.SetStateAction<boolean>>;
    quantity: { [product: string]: number };
    setQuantity: React.Dispatch<React.SetStateAction<{ [product: string]: number }>>;
    price: { [product: string]: number };
    setPrice: React.Dispatch<React.SetStateAction<{ [product: string]: number }>>;
    setQty: React.Dispatch<React.SetStateAction<number>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
};
const CartShoe = ({ cartItem, checkedItems, setCheckedItems, checkedAll, setCheckedAll, quantity, setQuantity, price, setPrice, setQty, setTotal }: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const userString = localStorage.getItem('user');
    let user: User | null = null;
    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;
    const handleDelete = async (product: string) => {
        {
            console.log(product);
            try {
                const item: RemoveItemCart = {
                    user: id,
                    product: product,
                };

                console.log(item);
                const res = await dispatch(removeItemFromCartByUserId(item));
                // if ((res.payload as { status: number }).status === 200) {
                //     toast.success('Success');
                // } else {
                //     toast.error('Error');
                // }
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleChecked = (product: string) => {
        setCheckedItems((prevState) => {
            const newState = {
                ...prevState,
                [product]: !prevState[product],
            };

            const updatedQuantity: QuantityMap = {};
            const updatedPrice: PriceMap = {};
            for (const [key, value] of Object.entries(newState)) {
                if (value) {
                    updatedQuantity[key] = cartItem.items.find((item) => item.product === key)?.quantity!;
                    updatedPrice[key] = cartItem.items.find((item) => item.product === key)?.price!;
                }
            }
            setQuantity(updatedQuantity);
            setPrice(updatedPrice);

            return newState;
        });
    };

    React.useEffect(() => {
        let allChecked = false;
        if (Object.keys(checkedItems).length !== 0) {
            allChecked = Object.values(checkedItems).every((value) => value === true);
        }
        console.log("checkedItems in effect: ", checkedItems);

        setCheckedAll(allChecked);
    }, [checkedItems]);

    React.useEffect(() => {
        const totalQuantity = Object.values(quantity).reduce((acc, curr) => acc + curr, 0) as number;

        const totalPrice = Object.entries(price).reduce((acc, [product, productPrice]) => {
            const productQuantity = quantity[product] || 0;
            return acc + productPrice * productQuantity;
        }, 0) as number;
        setTotal(totalPrice);
        setQty(totalQuantity);
    }, [quantity, price]);

    // console.log(totalQuantity);
    // console.log(totalPrice);

    return (
        <TableContainer component={Paper} className="shadow-xl h-max">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Color</TableCell>
                        <TableCell align="center">Size</TableCell>
                        <TableCell align="center">QTY</TableCell>
                        <TableCell align="center">UNIT PRICE</TableCell>
                        <TableCell align="center">TOTAL</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItem.items &&
                        cartItem.items.map((item) => (
                            <TableRow key={item.product} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" className="flex items-center gap-[10px]">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 "
                                        checked={checkedAll ? checkedAll : checkedItems[item.product]}
                                        onChange={() => handleChecked(item.product)}
                                    />
                                    <Image
                                        src={item.image}
                                        alt=" Ảnh"
                                        width={120}
                                        height={120}
                                        className="bg-bg_sell rounded-lg"
                                    />
                                    {item.name}
                                </TableCell>
                                <TableCell align="center">
                                    {/* <Select
                                    className="ml-[10px] h-9"
                                    value={row.color}
                                    // onChange={handleChange}
                                    MenuProps={MenuProps}
                                >
                                    {sorts.map((sort: string) => (
                                        <MenuItem key={sort} value={sort}>
                                            {sort}
                                        </MenuItem>
                                    ))}
                                </Select> */}
                                    <div className="flex justify-center items-center">
                                        <div className={`w-6 h-6 rounded-full ${item.color}`}></div>
                                    </div>
                                </TableCell>
                                <TableCell align="center">{item.size}</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="center">${item.price}</TableCell>
                                <TableCell align="center">${item.quantity * item.price}</TableCell>
                                <TableCell
                                    align="center"
                                    className="text-orange text-2xl cursor-pointer"
                                    onClick={() => handleDelete(item.product)}
                                >
                                    X
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default CartShoe;
