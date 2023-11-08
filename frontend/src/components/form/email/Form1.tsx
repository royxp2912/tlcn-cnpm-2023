'use client';
import { sendCode } from '@/slices/authSlice';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    email: string;
    setOpen1: Dispatch<SetStateAction<boolean>>;
};

const Form1 = ({ setOpen, email, setOpen1 }: Props) => {
    const handleNext = () => {
        setOpen1(true);
        setOpen(false);
    };
    return (
        <div className="modal">
            <div className=" flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span className="font-bold text-xl">Update Email - Notification</span>
                <p className="text-center font-semibold mt-5">
                    To ensure the confidentiality and security of information, we have sent a 6-digit confirmation code
                    to the email "{email}".
                </p>
                <p className="text-center font-semibold">
                    Please check your email "{email}" to continue the process of changing your email.
                </p>
                <div className="flex gap-5 font-medium text-xl">
                    <button
                        className="w-[190px] h-[60px] rounded-full bg-red bg-opacity-20 text-red"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-[190px] h-[60px] rounded-full  bg-blue bg-opacity-20 text-blue"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Form1;
