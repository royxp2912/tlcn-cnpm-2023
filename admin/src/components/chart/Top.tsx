'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { top } from '@/types/type';
import { useSelector } from 'react-redux';
import { getTop5TotalProductSoldThisMonth, getTop5UserThisMonth } from '@/slices/revenueSlice';

type Props = {
    path: string;
};
const Top = ({ path }: Props) => {
    const dispath = useDispatch<AppDispatch>();
    const { top5 }: { top5: top[] } = useSelector((state: any) => state.revenue);

    useEffect(() => {
        if (path == 'user') {
            dispath(getTop5UserThisMonth());
        } else {
            dispath(getTop5TotalProductSoldThisMonth());
        }
    }, [dispath]);
    return (
        <div className="shadow-revenue bg-white py-20 pt-10 pb-[35px] flex gap-20 justify-center">
            <div className="flex flex-col items-center">
                <span className="font-bold text-xl">
                    {path === 'user' ? 'TOP 3 USERS OF THE MONTH' : 'TOP 3 BEST SELLING PRODUCTS'}
                </span>
                <div className="flex gap-10">
                    <div className="mt-[90px] flex flex-col items-center gap-[10px]">
                        <Image src={top5[1].image} alt="avt" width={100} height={100} />
                        <Image src="/top2.png" alt="top2" width={24} height={40} />
                    </div>
                    <div className="mt-[40px] flex flex-col items-center gap-[10px]">
                        <Image src={top5[0].image} alt="avt" width={100} height={100} />
                        <Image src="/top1.png" alt="top2" width={40} height={40} />
                    </div>
                    <div className="mt-[120px] flex flex-col items-center gap-[10px]">
                        <Image src={top5[2].image} alt="avt" width={100} height={100} />
                        <Image src="/top3.png" alt="top2" width={32} height={40} />
                    </div>
                </div>
            </div>
            <div></div>
            <div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-xl">
                        {path === 'user' ? 'TOP 5 USERS OF THE MONTH' : 'TOP 5 BEST SELLING PRODUCTS'}
                    </span>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Top</TableCell>
                                    <TableCell align="center">
                                        {path === 'user' ? 'Fullname' : 'Name Of Product'}
                                    </TableCell>
                                    <TableCell align="center">{path === 'user' ? 'Spent' : 'Sold'}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {top5.map((item, i) => (
                                    <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center" component="th" scope="row">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell align="center">{item.name}</TableCell>
                                        <TableCell align="center">${item.count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default Top;
