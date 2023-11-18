'use client';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { getAllUser } from '@/slices/userSlice';
import { useSelector } from 'react-redux';
import { User } from '@/types/type';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';

const UserManage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users }: { users: User[] } = useSelector((state: any) => state.users);
    const [page, setPage] = useState<string>('Management');

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        router.push('/users');
    };
    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);
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
            <div className="flex gap-5 items-center ml-[15px]">
                <input type="checkbox" className="w-[26px] h-[26px] border-[#D9D9D9]" />
                <button className="h-[40px] w-[100px] font-medium text-sm bg-blue bg-opacity-60 text-white rounded-lg">
                    Select All
                </button>
                <button className="h-[40px] w-[110px] font-medium text-sm bg-blue bg-opacity-60 text-white  rounded-lg">
                    Delete All
                </button>
                <button className="h-[40px] w-[150px] font-medium text-sm bg-blue bg-opacity-60 text-white  rounded-lg">
                    Delete Selected
                </button>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="mb-[10px]">
                            <TableRow>
                                <TableCell align="left">
                                    <input type="checkbox" className="w-[26px] h-[26px] " />
                                </TableCell>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Spent</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell align="left">
                                        <input type="checkbox" className="w-[26px] h-[26px] " />
                                    </TableCell>
                                    <TableCell align="center">{i + 1}</TableCell>
                                    <TableCell align="center">{item.fullName}</TableCell>
                                    <TableCell align="center">{item.email}</TableCell>
                                    <TableCell
                                        align="center"
                                        className={`${item.gender === 'male' ? 'text-blue' : 'text-pink'}`}
                                    >
                                        {item.gender === 'male' ? <MaleRoundedIcon /> : <FemaleRoundedIcon />}
                                    </TableCell>
                                    <TableCell align="center">${}</TableCell>
                                    <TableCell align="center">{item.role}</TableCell>
                                    <TableCell
                                        align="center"
                                        className={`${item.status !== 'Available' ? 'text-red' : 'text-green'}`}
                                    >
                                        {item.status !== 'Available' ? <LockRoundedIcon /> : <LockOpenRoundedIcon />}
                                    </TableCell>
                                    <TableCell align="center">
                                        <CloseRoundedIcon className="text-red hover:opacity-60" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default UserManage;
