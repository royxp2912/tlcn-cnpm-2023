'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import OtpInput from '../../shared/OtpInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { sendCode } from '@/slices/authSlice';
import axios from '@/utils/axios';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>;
    email: string;
    setOpen1: Dispatch<SetStateAction<boolean>>;
    code: string;
    setCode: Dispatch<SetStateAction<string>>;
    setRegis: Dispatch<SetStateAction<boolean>>;
};

const Form2 = ({ setOpen, email, setOpen1, code, setCode, setRegis }: Props) => {
    const [otp, setOtp] = useState<string>('');
    const [check, setCheck] = useState(false);
    const { codes } = useSelector((state: any) => state.auth);
    console.log(code);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (otp: string) => {
        setCheck(false);
        setOtp(otp);
    };

    const handleCheckCode = () => {
        if (code.toString() === otp) {
            setRegis(true);
            setOpen1(false);
        } else {
            setCheck(true);
        }
    };

    const handleResend = async () => {
        const { data } = await axios.post('/auth/sendCode', {
            email: email,
        });
        if (data.success) {
            setCode(data.code);
        }
    };
    const handleCancel = () => {
        setOpen1(false);
    };

    return (
        <div className="modal">
            <div className="p-10 flex flex-col bg-white items-center rounded-md shadow-lg">
                <span className="font-bold text-xl">Get Confirmation Code</span>

                <OtpInput value={otp} valueLength={6} onChange={handleChange} />
                {check && (
                    <span className="font-medium text-red block mt-7 mb-10">Confirmation code is incorrect!!!</span>
                )}
                <span className="block mt-[50px] mb-1 font-medium">You can resend the code after 60s!!! </span>
                <span className="font-bold text-blue" onClick={handleResend}>
                    Resend code
                </span>
                <div className="mt-5 flex gap-5 font-medium text-xl">
                    <button
                        onClick={handleCancel}
                        className="w-[160px] h-[60px] rounded-full bg-red bg-opacity-20 text-red"
                    >
                        Cancel
                    </button>
                    <button
                        className="w-[160px] h-[60px] rounded-full bg-blue bg-opacity-20 text-blue"
                        onClick={handleCheckCode}
                    >
                        Complete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Form2;
