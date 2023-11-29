'use client';
import { getAllOrderByOrderStatus, getAllOrderByUserId, getAllOrders } from '@/slices/orderSlice';
import { Order } from '@/types/type';
import { AppDispatch } from '@/utils/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const statuses = ['All', 'Confirming', 'Accepted', 'Delivering', 'Successful', 'Cancel', 'Return'];
const buttons = [
    'Select All',
    'Confirm All',
    'Confirm Selected',
    'Delivery All',
    'Delivery Selected',
    'Cancel All',
    'Cancel Selected',
];

const theme = createTheme({
    palette: {
        primary: {
            main: '#40BFFF',
        },
    },
});

const OrderManage = () => {
    const [status, setStatus] = useState('All');
    const dispatch = useDispatch<AppDispatch>();
    const { orders }: { orders: Order[] } = useSelector((state: any) => state.orders);
    const [load, setLoad] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const [page, setPage] = useState<string>('Management');

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setPage(event.target.value as string);
        router.push('/order');
    };

    const handleChangePage = (i: number) => {
        setPageNumber(i);
    };

    const handleStatus = (item: string) => {
        setStatus(item);
        setPageNumber(1);
    };

    const handleComfirm = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();

        const { data } = await axios.patch('/orders', {
            order: id,
            status: 'Accepted',
        });
        if (data.success) {
            toast.success('Comfirm Success');
            setLoad((prev) => !prev);
        }
    };
    const handleDelivery = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();

        const { data } = await axios.patch('/orders', {
            order: id,
            status: 'Delivering',
        });
        if (data.success) {
            toast.success('Delivery Success');
            setLoad((prev) => !prev);
        }
    };
    const handleCancel = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();

        const { data } = await axios.patch('/orders', {
            order: id,
            status: 'Cancel',
        });
        if (data.success) {
            toast.success('Cancel Success');
            setLoad((prev) => !prev);
        }
    };
    const handleSuccess = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
        e.stopPropagation();

        const { data } = await axios.patch('/orders', {
            order: id,
            status: 'Successful',
        });
        if (data.success) {
            toast.success('Success Success');
            setLoad((prev) => !prev);
        }
    };

    useEffect(() => {
        const item = {
            status: status,
            pageNumber: pageNumber,
        };
        if (status === 'All') {
            dispatch(getAllOrders(pageNumber));
        } else dispatch(getAllOrderByOrderStatus(item));
    }, [dispatch, status, load, pageNumber]);

    console.log(pageNumber);

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

            <div className="flex gap-[18px] shadow-order bg-white">
                {statuses &&
                    statuses.map((item, i) => {
                        const isActive = status === item;
                        return (
                            <span
                                className={`w-[140px] h-max block pt-[10px] pb-[12px] text-center uppercase cursor-pointer hover:text-blue ${
                                    isActive && 'text-blue border-b-2 border-b-blue'
                                }`}
                                onClick={() => handleStatus(item)}
                                key={i}
                            >
                                {item}
                            </span>
                        );
                    })}
            </div>
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
            <div className="flex flex-col gap-5">
                {orders.length === 0 ? (
                    <span>Nothing</span>
                ) : (
                    orders &&
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className="px-[15px] pt-[15px] pb-[10px] shadow-order bg-white"
                            onClick={() => router.push(`/order/manage/${order._id}`)}
                        >
                            <div className="flex justify-between mb-[15px] font-bold">
                                <div className="flex items-center gap-[14px]">
                                    <input type="checkbox" className="w-[26px] h-[26px]" />
                                    <h1>ID: {order._id}</h1>
                                </div>
                                <span>Buyer: {order.user}</span>
                                <h1 className="uppercase">{order.status}</h1>
                            </div>
                            {/* <Border /> */}
                            <div>
                                <div>
                                    {order.items.map((item) => (
                                        <div key={item.image} className="flex items-center gap-5 my-[10px]">
                                            <Image
                                                src={item.image}
                                                alt="Ảnh"
                                                width={100}
                                                height={100}
                                                className="rounded-lg bg-deal"
                                            />

                                            <div className="w-full font-medium text-lg">
                                                <div className="flex justify-between">
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="flex gap-[100px] mt-[18px] mb-[14px] text-sm opacity-70">
                                                    <span>Color: {item.color}</span>
                                                    <span>Size: {item.size}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm opacity-70">
                                                        Quantity: {item.quantity}
                                                    </span>
                                                    <span className="font-bold text-blue">${item.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <Border /> */}
                                </div>
                            </div>
                            <div className="flex gap-5 mt-[10px] items-center">
                                {order.status === 'Confirming' ? (
                                    <button
                                        className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                        onClick={(e) => handleComfirm(e, order._id)}
                                    >
                                        CONFIRM
                                    </button>
                                ) : (
                                    ''
                                )}
                                {order.status === 'Accepted' ? (
                                    <button
                                        className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                        onClick={(e) => handleDelivery(e, order._id)}
                                    >
                                        DELIVERY
                                    </button>
                                ) : (
                                    ''
                                )}
                                {order.status === 'Confirming' ? (
                                    <button
                                        className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                        onClick={(e) => handleCancel(e, order._id)}
                                    >
                                        CANCEL
                                    </button>
                                ) : (
                                    ''
                                )}
                                {order.status === 'Delivering' ? (
                                    <button
                                        className="w-[120px] h-10 bg-blue bg-opacity-50 text-white rounded-md font-bold text-sm hover:bg-opacity-100"
                                        onClick={(e) => handleSuccess(e, order._id)}
                                    >
                                        SUCCESS
                                    </button>
                                ) : (
                                    ''
                                )}
                                <div className="flex-grow"></div>
                                <div className="flex items-center font-bold gap-2">
                                    <span>Total Price:</span>
                                    <span className="text-lg text-blue">${order.total}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-center shadow-product2 bg-white">
                <ThemeProvider theme={theme}>
                    <Pagination
                        count={5}
                        shape="rounded"
                        onChange={(_, page: number) => handleChangePage(page)}
                        page={pageNumber}
                        color="primary"
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default OrderManage;
