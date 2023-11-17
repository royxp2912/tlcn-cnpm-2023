import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Image from 'next/image';
import { Product } from '@/types/type';

function createData(
    img: string,
    name: string,
    category: string,
    brand: string,
    price: number,
    sold: number,
    status: boolean,
) {
    return { img, name, category, brand, price, sold, status };
}
type Props = {
    products: Product[];
};
const TableProduct = ({ products }: Props) => {
    const rows = [
        createData('/avt.png', 'Nike', 'Running', 'Nike', 100, 12, true),
        createData('/avt.png', 'Nike', 'Running', 'Nike', 100, 12, false),
        createData('/avt.png', 'Nike', 'Running', 'Nike', 100, 12, false),
        createData('/avt.png', 'Nike', 'Running', 'Nike', 100, 12, true),
        createData('/avt.png', 'Nike', 'Running', 'Nike', 100, 12, false),
    ];
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="mb-[10px]">
                        <TableRow>
                            <TableCell align="left">
                                <input type="checkbox" className="w-[26px] h-[26px] " />
                            </TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name of Product</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Sold</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products &&
                            products.map((product, i) => (
                                <TableRow key={i}>
                                    <TableCell align="left">
                                        <input type="checkbox" className="w-[26px] h-[26px] " />
                                    </TableCell>
                                    <TableCell align="center" className="flex justify-center">
                                        <Image
                                            src={product.images[0]}
                                            alt="Anh"
                                            width={100}
                                            height={100}
                                            className="bg-product rounded-md"
                                        />
                                    </TableCell>
                                    <TableCell align="center" className="w-[360px]">
                                        <span className="truncate block ">{product.name}</span>
                                    </TableCell>
                                    <TableCell align="center">{product.category.name}</TableCell>
                                    <TableCell align="center">{product.brand}</TableCell>
                                    <TableCell align="center" className="text-orange">
                                        ${product.price}
                                    </TableCell>
                                    <TableCell align="center">{product.sold}</TableCell>
                                    <TableCell
                                        align="center"
                                        className={`${product.status !== 'Available' ? 'text-red' : 'text-green'}`}
                                    >
                                        {product.status !== 'Available' ? 'Hidden' : 'On Sale'}
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className="flex flex-col items-center gap-[10px]">
                                            <EditRoundedIcon className="text-blue" />
                                            {product.status !== 'Available' ? (
                                                <VisibilityOffOutlinedIcon className="text-blue" />
                                            ) : (
                                                <RemoveRedEyeOutlinedIcon className="text-red" />
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableProduct;
