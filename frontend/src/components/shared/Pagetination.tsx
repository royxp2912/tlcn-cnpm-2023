'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

type Props = {
    setPageNum: Dispatch<SetStateAction<number>>;
};

const Pagetination = ({ setPageNum }: Props) => {
    const handleChangePage = (i: number) => {
        setPageNum(i);
    };
    return (
        <div className="flex justify-center shadow-product2 bg-white">
            <ThemeProvider theme={theme}>
                <Pagination
                    count={5}
                    shape="rounded"
                    onChange={(_, page: number) => handleChangePage(page)}
                    color="primary"
                />
            </ThemeProvider>
        </div>
    );
};

export default Pagetination;
