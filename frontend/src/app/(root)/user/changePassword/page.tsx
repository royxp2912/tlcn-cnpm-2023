'use client';
import UserNav from '@/components/shared/UserNav';
import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { User } from '@/types/type';
import axios from '@/utils/axios';

type Pass = {
    oldPass: string;
    newPass: string;
    rePass: string;
};

const ChangePassword = () => {
    const dispatch = useDispatch<AppDispatch>;

    const [passwords, setPasswords] = useState<Pass>({
        oldPass: '',
        newPass: '',
        rePass: ' ',
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswords((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const userString = localStorage.getItem('user');
    let user: User | null = null;

    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const id = user?._id as string;

    const handleCheck = () => {
        if (passwords.newPass !== passwords.rePass) {
            toast.error('Dont Match');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        try {
            const item = {
                user: id,
                oldPass: passwords.oldPass,
                newPass: passwords.newPass,
            };
            const isValid = handleCheck();

            if (!isValid) {
                return;
            }

            const { data } = await axios.patch('/users/password', item);
            console.log(data);
            if (data.success) {
                toast.success('Update Password Success');
            }
            // console.log(res);
        } catch (error) {
            toast.error('Wrong Old Password');
        }
    };
    return (
        <div className="flex px-20 mt-10 gap-5">
            <UserNav />

            <div className="flex flex-col items-center w-[1100px] shadow-lg rounded-lg gap-[10px] py-10">
                <span className="font-bold text-2xl">Change Password</span>
                <span className="font-medium">Your password must be at least 6 characters!!!</span>
                <TextField
                    label="Current Password"
                    variant="outlined"
                    id="oldPass"
                    className="mt-[30px] mb-[15px] w-[500px]"
                    onChange={handleChange}
                />
                <TextField
                    label="New Password"
                    variant="outlined"
                    id="newPass"
                    className="mb-[13px] w-[500px]"
                    onChange={handleChange}
                />
                <TextField
                    label="Re-type New Password"
                    variant="outlined"
                    id="rePass"
                    className="mb-[12px] w-[500px]"
                    onChange={handleChange}
                />

                <div
                    className="w-[500px] h-11 bg-blue bg-opacity-20 text-blue rounded-full flex items-center justify-center gap-2 font-medium text-xl"
                    onClick={handleSubmit}
                >
                    <CloudUploadOutlinedIcon />
                    <span>Save</span>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
