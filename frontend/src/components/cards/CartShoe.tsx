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
import { useSelector } from 'react-redux';
import { Cart } from '@/types/type';

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

const CartShoe = () => {
    // const handleChange = (event: SelectChangeEvent<typeof sort>) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setSort(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };
    const { cartItem }: { cartItem: Cart } = useSelector((state: any) => state.carts);
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
                                    <input type="checkbox" className="w-5 h-5 " />
                                    <Image
                                        src="/nike.png"
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
                                <TableCell align="center">${cartItem.total}</TableCell>
                                <TableCell align="center">X</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default CartShoe;
