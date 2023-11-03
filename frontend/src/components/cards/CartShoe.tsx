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

function createData(img: string, name: string, color: string, size: number, qty: number, price: number) {
    return { img, name, color, size, qty, price };
}

const rows = [createData('/nike.png', 'Nike Airmax 270 react', 'bg-[#40BFFF]', 42, 2, 499)];

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
                    {rows.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" className="flex items-center gap-[10px]">
                                <input type="checkbox" className="w-5 h-5 " />
                                <Image
                                    src={row.img}
                                    alt=" Ảnh"
                                    width={120}
                                    height={120}
                                    className="bg-bg_sell rounded-lg"
                                />
                                {row.name}
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
                                    <div className={`w-6 h-6 rounded-full ${row.color}`}></div>
                                </div>
                            </TableCell>
                            <TableCell align="center">{row.size}</TableCell>
                            <TableCell align="center">{row.qty}</TableCell>
                            <TableCell align="center">${row.price}</TableCell>
                            <TableCell align="center">${row.price * row.qty}</TableCell>
                            <TableCell align="center">X</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default CartShoe;
