import UserNav from '@/components/shared/UserNav';
import React from 'react';
import TextField from '@mui/material/TextField';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

const ChangePassword = () => {
    return (
        <div className="flex px-20 mt-10 gap-5">
            <UserNav />

            <div className="flex flex-col items-center w-[1100px] shadow-lg rounded-lg gap-[10px] py-10">
                <span className="font-bold text-2xl">Change Password</span>
                <span className="font-medium">Your password must be at least 6 characters!!!</span>
                <TextField label="Current Password" variant="outlined" className="mt-[30px] mb-[15px] w-[500px]" />
                <TextField label="New Password" variant="outlined" className="mb-[13px] w-[500px]" />
                <TextField label="Re-type New Password" variant="outlined" className="mb-[12px] w-[500px]" />

                <div className="w-[500px] h-11 bg-blue bg-opacity-20 text-blue rounded-full flex items-center justify-center gap-2 font-medium text-xl">
                    <CloudUploadOutlinedIcon />
                    <span>Save</span>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
