'use client';
import TableProduct from '@/components/shared/TableProduct';
import { getAllProduct } from '@/slices/productSlice';
import { Product } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const nav = ['All', 'on sale', 'hidden', 'out of stock'];

const buttons = ['Select All', 'Hide All', 'Hide Selected', 'On Sale All', 'On Sale Selected'];

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const WareHouseManage = () => {
    const [active, setActive] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const { products, pages }: { products: Product[]; pages: number } = useSelector((state: any) => state.products);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const [page, setPage] = useState<string>('Management');

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        router.push('/warehouse');
    };
    const handleChangePage = (i: number) => {
        setPageNumber(i);
    };
    useEffect(() => {
        dispatch(getAllProduct(pageNumber));
    }, [dispatch, pageNumber]);

    return (
        <div className="flex flex-col gap-[10px]">
            <FormControl className="w-[150px]">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={page}
                    label="Page"
                    onChange={handleChange}
                    variant="standard"
                    className="font-bold text-lg"
                >
                    <MenuItem value="Statistical">Statistical</MenuItem>
                    <MenuItem value="Management">Management</MenuItem>
                </Select>
            </FormControl>
            <div className="flex shadow-order w-max">
                {nav.map((item, i) => (
                    <div
                        key={i}
                        className={`w-[300px] h-[50px] flex items-center justify-center uppercase font-bold ${
                            active === i ? 'border-b-4 border-blue text-blue' : ''
                        }`}
                        onClick={() => setActive(i)}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="ml-[15px] flex items-center gap-5">
                    <input type="checkbox" className="w-[26px] h-[26px]" />
                    {buttons.map((item) => (
                        <button
                            key={item}
                            className="bg-blue bg-opacity-60 h-10 px-4 text-sm font-medium text-white rounded-lg"
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <button
                    className="bg-blue bg-opacity-60 h-10 px-4 text-sm font-medium text-white rounded-lg hover:bg-opacity-100"
                    onClick={() => router.push('/warehouse/addnew')}
                >
                    Add Product
                </button>
            </div>
            <TableProduct products={products} />
            <div className="flex justify-center shadow-product2 bg-white">
                <ThemeProvider theme={theme}>
                    <Pagination
                        count={pages}
                        shape="rounded"
                        onChange={(_, page: number) => handleChangePage(page)}
                        color="primary"
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default WareHouseManage;
