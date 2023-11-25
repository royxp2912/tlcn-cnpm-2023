'use client';

import UserNav from '@/components/shared/UserNav';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import Image from 'next/image';
import React, { ChangeEvent, use, useEffect, useRef, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ChangeName from '@/components/form/ChangeName';
import Form1 from '@/components/form/email/Form1';
import Form2 from '@/components/form/email/Form2';
import Form3 from '@/components/form/email/Form3';
import { User } from '@/types/type';
import axios from '@/utils/axios';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';

const unProp = {
    setRegis: () => {},
};

const Profile = () => {
    const [load, setLoad] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [code, setCode] = useState<string>('');
    const [change, setChange] = useState(false);
    const [update, setUpdate] = useState(false);
    const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    let user: User | null = null;

    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;
    const [email, setEmail] = useState<string>(user?.email || '');

    const [image, setImage] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleToggleInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files;
        if (file) {
            setImage(file[0]);
        }
    };
    const [selectedGender, setSelectedGender] = useState(user?.gender);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
        user?.birthDay ? dayjs(user.birthDay, 'DD/MM/YYYY') : null,
    );
    const [items, setItems] = useState<{
        fullName: string;
        phone: string;
    }>({
        fullName: user?.fullName || '',
        phone: user?.phone || '',
    });

    const handleUpload = async () => {
        const formData = new FormData();
        image && formData.append('avatar', image);
        formData.append('user', id);

        // const itemlocal = {
        //     user: id,
        //     email: email,
        //     fullName: items.fullName,
        //     phone: items.phone,
        //     gender: selectedGender || '',
        //     birthDay: formatDate(selectedDate),
        //     avatar: image?.toString() || '',
        // };
        const { data } = await axios.patch('/users/upload-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data);
        if (data.success) {
            toast.success('Update avatar Success');
            // user = { ...user, ...itemlocal };
            // console.log(user);
            // localStorage.setItem('user', JSON.stringify(user));
            setLoad((prev) => !prev);
        } else {
            toast.error('Update avatar fail');
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setItems((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
    };
    const formatDate = (date: Dayjs | null) => {
        if (date) {
            return date.format('DD/MM/YYYY');
        }
        return '';
    };
    const handleSumbit = async () => {
        const item = {
            user: id,
            fullName: items.fullName,
            phone: items.phone,
            gender: selectedGender || '',
            birthDay: formatDate(selectedDate),
        };
        const itemlocal = {
            user: id,
            fullName: items.fullName,
            phone: items.phone,
            gender: selectedGender || '',
            birthDay: formatDate(selectedDate),
            avatar: user?.avatar || '',
        };
        const { data } = await axios.put('/users', item);
        if (data.success) {
            user = { ...user, ...itemlocal };
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Update profile success');
            setLoad((prev) => !prev);
        } else {
            toast.error('Update profile fail');
        }
    };
    const handleChangeEmail = async () => {
        const { data } = await axios.post('/auth/sendCode', {
            email: email,
        });
        if (data.success) {
            setCode(data.code);
            setOpen(true);
        }
    };
    useEffect(() => {}, [load]);

    useEffect(() => {
        if (change) {
            const postCode = async () => {
                const { data } = await axios.post('/auth/sendCode', {
                    email: email,
                });
                if (data.success) {
                    setCode(data.code);
                }
            };
            postCode();
        }
    }, [change]);

    useEffect(() => {
        if (update) {
            const updateEmail = async () => {
                const itemlocal = {
                    user: id,
                    email: email,
                    fullName: items.fullName,
                    phone: items.phone,
                    gender: selectedGender || '',
                    birthDay: formatDate(selectedDate),
                    avatar: user?.avatar || '',
                };
                const { data } = await axios.patch('/users/email', {
                    user: id,
                    newEmail: email,
                });

                if (data.success) {
                    user = { ...user, ...itemlocal };
                    localStorage.setItem('user', JSON.stringify(user));
                    toast.success('Update email success');
                    setLoad((prev) => !prev);
                } else {
                    toast.error('Update email fail');
                }
            };
            updateEmail();
        }
    }, [update]);
    return (
        <div className="flex px-20 mt-10 gap-5">
            <UserNav />
            <div className="shadow-lg py-[40px] pl-[90px] pr-[120px] flex rounded-lg items-center w-[1100px]">
                <div className="flex flex-col items-center gap-5 mr-[100px]">
                    <div className="w-[140px] h-[140px] relative">
                        <Image
                            src={image ? URL.createObjectURL(image) : user?.avatar ?? ''}
                            alt="Avt"
                            fill
                            className="rounded-full"
                        />
                    </div>
                    <div
                        className="w-40 h-10 rounded-lg bg-blue bg-opacity-20 text-blue flex items-center justify-center gap-2 cursor-pointer"
                        onClick={handleToggleInput}
                    >
                        <InsertPhotoOutlinedIcon />
                        <span className="font-medium text-sm">Upload Avatar</span>
                    </div>
                    <div
                        className="w-40 h-10 rounded-lg bg-blue bg-opacity-20 text-blue flex items-center justify-center gap-2 cursor-pointer"
                        onClick={handleUpload}
                    >
                        <CloudUploadOutlinedIcon />
                        <span className="font-medium text-sm">Save Avatar</span>
                    </div>
                    <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} multiple />
                </div>
                <div>viền xanh</div>
                <div className="w-full flex flex-col gap-[50px] ml-[100px] font-medium ">
                    <div className="flex items-center gap-[50px]">
                        <span className="block w-[100px]">Full name</span>

                        <TextField
                            className="w-full"
                            id="fullName"
                            variant="standard"
                            onChange={handleChange}
                            defaultValue={items.fullName}
                            inputProps={{
                                className: 'font-semibold',
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-[50px]">
                        <span className="block w-[74px]">Email</span>
                        <span className="font-semibold">{user?.email}</span>
                        <div className="flex-grow"></div>
                        <EditOutlinedIcon className="cursor-pointer" onClick={handleChangeEmail} />
                    </div>
                    <div className="flex items-center gap-[50px]">
                        <span className="block w-[100px]">Phone</span>
                        <TextField
                            className="w-full"
                            id="phone"
                            variant="standard"
                            onChange={handleChange}
                            defaultValue={items.phone}
                            inputProps={{
                                className: 'font-semibold',
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-[50px]">
                        <span className="block w-[100px]">Gender</span>
                        <div className="flex gap-[58px]">
                            <div className="flex items-center gap-[6px]">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="Male"
                                    value="Male"
                                    onChange={(e) => setSelectedGender(e.target.value)}
                                    checked={selectedGender === 'Male'}
                                    className="checked:bg-blue"
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className="flex items-center gap-[6px]">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="Female"
                                    value="Female"
                                    onChange={(e) => setSelectedGender(e.target.value)}
                                    checked={selectedGender === 'Female'}
                                    className="checked:bg-blue checked:text-blue"
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                            <div className="flex items-center gap-[6px]">
                                <input
                                    type="radio"
                                    name="gender"
                                    id="Other"
                                    value="Other"
                                    onChange={(e) => setSelectedGender(e.target.value)}
                                    checked={selectedGender === 'Other'}
                                    className="checked:bg-blue"
                                />
                                <label htmlFor="female">Other</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-[50px]">
                        <span className="block w-[100px]">BirthDay</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker format="DD/MM/YYYY" defaultValue={selectedDate} onChange={handleDateChange} />
                        </LocalizationProvider>
                    </div>
                    <div className="flex justify-center">
                        <div
                            className="w-[200px] h-11 bg-blue bg-opacity-20 text-blue rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                            onClick={handleSumbit}
                        >
                            <CloudUploadOutlinedIcon />
                            <span>Save</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ChangeName /> */}
            {open && (
                <Form1 setOpen={setOpen} email={email} setOpen1={setOpen1} setLoad={setLoad} setChange={setChange} />
            )}
            {open1 && (
                <Form2
                    code={code}
                    email={email}
                    setCode={setCode}
                    setOpen={setOpen}
                    setOpen1={setOpen1}
                    setOpen2={setOpen2}
                    change={change}
                    setChange={setChange}
                    setUpdate={setUpdate}
                    {...unProp}
                />
            )}
            {open2 && <Form3 setEmail={setEmail} setOpen={setOpen} setOpen2={setOpen2} setChange={setChange} />}
        </div>
    );
};

export default Profile;
