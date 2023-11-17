'use client';

import UserNav from '@/components/shared/UserNav';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import Image from 'next/image';
import React, { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ChangeName from '@/components/form/ChangeName';
import Form1 from '@/components/form/email/Form1';
import Form2 from '@/components/form/email/Form2';
import Form3 from '@/components/form/email/Form3';
import { User } from '@/types/type';

const Profile = () => {
    const date = '2019-01-25';
    const userString = localStorage.getItem('user');
    let user: User | null = null;

    if (userString !== null) {
        try {
            user = JSON.parse(userString) as User;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    const [selectedGender, setSelectedGender] = useState(user?.gender);

    return (
        <div className="flex px-20 mt-10 gap-5">
            <UserNav />
            <div className="shadow-lg py-[40px] pl-[90px] pr-[120px] flex rounded-lg items-center w-[1100px]">
                <div className="flex flex-col items-center gap-5 mr-[100px]">
                    <Image src={user?.avatar ?? ''} alt="Avt" width={140} height={140} className="rounded-full" />
                    <div className="w-40 h-10 rounded-lg bg-blue bg-opacity-20 text-blue flex items-center justify-center gap-2">
                        <InsertPhotoOutlinedIcon />
                        <span className="font-medium text-sm">Upload Avatar</span>
                    </div>
                </div>
                <div>viền xanh</div>
                <div className="w-full flex flex-col gap-[50px] ml-[100px] font-medium ">
                    <div className="flex items-center gap-[50px]">
                        <span className="block w-[100px]">Full name</span>

                        <span>{user?.fullName}</span>
                        <div className="flex-grow"></div>

                        <EditOutlinedIcon />
                    </div>
                    <div className="flex items-center gap-[50px]">
                        <span className="block w-[100px]">Email</span>

                        <span>{user?.email}</span>
                        <div className="flex-grow"></div>
                        <EditOutlinedIcon />
                    </div>
                    <div className="flex items-center gap-[50px]">
                        <span className="block w-[100px]">Phone</span>
                        <span>{user?.phone}</span>
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
                            <DatePicker format="DD/MM/YYYY" defaultValue={dayjs(user?.birthDay, 'DD/MM/YYYY')} />
                        </LocalizationProvider>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-[200px] h-11 bg-blue bg-opacity-20 text-blue rounded-lg flex items-center justify-center gap-2">
                            <CloudUploadOutlinedIcon />
                            <span>Save</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ChangeName /> */}
            {/* <Form3 /> */}
        </div>
    );
};

export default Profile;
