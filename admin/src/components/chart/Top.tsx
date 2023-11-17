import Image from 'next/image';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(top: number, name: string, quantity: number) {
    return { top, name, quantity };
}
type Props = {
    path: string;
};
const Top = ({ path }: Props) => {
    const rowsUser = [
        createData(1, 'Hi', 200),
        createData(2, 'Hi', 200),
        createData(3, 'Hi', 200),
        createData(4, 'Hi', 200),
        createData(5, 'Hi', 200),
    ];
    const rowsProduct = [
        createData(1, 'Hi', 12),
        createData(2, 'Hi', 123),
        createData(3, 'Hi', 22),
        createData(4, 'Hi', 1),
        createData(5, 'Hi', 10),
    ];
    return (
        <div className="shadow-revenue bg-white py-20 pt-10 pb-[35px] flex gap-20 justify-center">
            <div className="flex flex-col items-center">
                <span className="font-bold text-xl">
                    {path === 'user' ? 'TOP 3 USERS OF THE MONTH' : 'TOP 3 BEST SELLING PRODUCTS'}
                </span>
                <div className="flex gap-10">
                    <div className="mt-[90px] flex flex-col items-center gap-[10px]">
                        <Image src="/avt.png" alt="avt" width={100} height={100} />
                        <Image src="/top2.png" alt="top2" width={24} height={40} />
                    </div>
                    <div className="mt-[40px] flex flex-col items-center gap-[10px]">
                        <Image src="/avt.png" alt="avt" width={100} height={100} />
                        <Image src="/top1.png" alt="top2" width={40} height={40} />
                    </div>
                    <div className="mt-[120px] flex flex-col items-center gap-[10px]">
                        <Image src="/avt.png" alt="avt" width={100} height={100} />
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
                                {path === 'user'
                                    ? rowsUser.map((row) => (
                                          <TableRow
                                              key={row.top}
                                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                              <TableCell align="center" component="th" scope="row">
                                                  {row.top}
                                              </TableCell>
                                              <TableCell align="center">{row.name}</TableCell>
                                              <TableCell align="center">${row.quantity}</TableCell>
                                          </TableRow>
                                      ))
                                    : rowsProduct.map((row) => (
                                          <TableRow
                                              key={row.top}
                                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                              <TableCell align="center" component="th" scope="row">
                                                  {row.top}
                                              </TableCell>
                                              <TableCell align="center">{row.name}</TableCell>
                                              <TableCell align="center">{row.quantity}</TableCell>
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
