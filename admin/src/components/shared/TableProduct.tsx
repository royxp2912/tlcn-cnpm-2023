import React, { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
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
import { useRouter } from 'next/navigation';

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
    setOpen: Dispatch<SetStateAction<boolean>>;
    setAction: Dispatch<SetStateAction<string>>;
    setId: Dispatch<SetStateAction<string>>;
    checkedItems: { [key: string]: boolean };
    setCheckedItems: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    checkedAll: boolean;
    setCheckedAll: Dispatch<SetStateAction<boolean>>;
};
const TableProduct = ({
    products,
    setOpen,
    setAction,
    setId,
    checkedItems,
    setCheckedItems,
    checkedAll,
    setCheckedAll,
}: Props) => {
    const router = useRouter();

    const handleUpdate = (id: string) => {
        router.push(`/warehouse/${id}`);
    };

    const handleOnSale = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();

        setOpen(true);
        setAction('On Sale');
        setId(id);
    };
    const handleHidden = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();

        setOpen(true);
        setAction('Hidden');
        setId(id);
    };

    //Checked

    const handleCheckedAll = () => {
        setCheckedAll((prev) => !prev);

        if (!checkedAll) {
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of products) {
                updatedCheckedItems[item._id] = true;
            }
            localStorage.setItem('tickProduct', JSON.stringify(products));
            setCheckedItems(updatedCheckedItems);
        } else {
            const updatedCheckedItems: { [key: string]: boolean } = {};
            for (const item of products) {
                updatedCheckedItems[item._id] = false;
            }
            localStorage.setItem('tickProduct', '');
            setCheckedItems(updatedCheckedItems);
        }
    };

    const handleChecked = (productId: string) => {
        setCheckedItems((prevState) => {
            const newState = {
                ...prevState,
                [productId]: !prevState[productId],
            };

            if (newState[productId]) {
                const storedItems = localStorage.getItem('tickProduct');
                let storedItemsArray: Product[] = [];

                if (storedItems) {
                    storedItemsArray = JSON.parse(storedItems);
                }

                const selectedItem = products.find((item) => item._id === productId);

                if (selectedItem) {
                    storedItemsArray = storedItemsArray.filter((item) => item._id !== productId);
                    storedItemsArray.push(selectedItem);
                    localStorage.setItem('tickProduct', JSON.stringify(storedItemsArray));
                }
            } else {
                const storedItems = localStorage.getItem('tickProduct');
                let storedItemsArray: Product[] = [];

                if (storedItems) {
                    storedItemsArray = JSON.parse(storedItems);
                    storedItemsArray = storedItemsArray.filter((item) => item._id !== productId);
                    localStorage.setItem('tickProduct', JSON.stringify(storedItemsArray));
                }
            }
            return newState;
        });
    };

    useEffect(() => {
        let allChecked = false;
        if (Object.keys(checkedItems).length !== 0) {
            allChecked = Object.values(checkedItems).every((value) => value === true);
        }
        setCheckedAll(allChecked);
    }, [checkedItems]);
    return (
        <div>
            {products.length === 0 ? (
                <div className="font-semibold text-2xl">No Shoes</div>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="mb-[10px]">
                            <TableRow>
                                <TableCell align="left">
                                    {/* <input
                                        type="checkbox"
                                        className="w-[26px] h-[26px]"
                                        checked={checkedAll}
                                        onChange={handleCheckedAll}
                                    /> */}
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
                                    <TableRow
                                        key={i}
                                        onClick={() => {
                                            handleUpdate(product._id);
                                        }}
                                        className="cursor-pointer hover:opacity-60"
                                    >
                                        <TableCell align="left">
                                            <input
                                                type="checkbox"
                                                className="w-[26px] h-[26px]"
                                                checked={checkedAll ? checkedAll : checkedItems[product._id]}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleChecked(product._id);
                                                }}
                                            />
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
                                                {product.status !== 'Available' ? (
                                                    <VisibilityOffOutlinedIcon
                                                        onClick={(e) => handleOnSale(e, product._id)}
                                                        className="text-blue cursor-pointer"
                                                    />
                                                ) : (
                                                    <RemoveRedEyeOutlinedIcon
                                                        onClick={(e) => handleHidden(e, product._id)}
                                                        className="text-red cursor-pointer"
                                                    />
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default TableProduct;
