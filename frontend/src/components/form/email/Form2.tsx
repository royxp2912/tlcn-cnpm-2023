import React, { useState } from 'react';
import OtpInput from '../../shared/OtpInput';

const Form2 = () => {
    const [otp, setOtp] = useState<string>('');

    const handleChange = (otp: string) => {
        setOtp(otp);
    };

    return (
        <div>
            <div className="p-10 flex flex-col items-center rounded-md shadow-lg">
                <span className="font-bold text-xl">Get Confirmation Code</span>
                <span className="font-medium text-red block mt-7 mb-10">Confirmation code is incorrect!!!</span>
                <OtpInput value={otp} valueLength={6} onChange={handleChange} />
                <span className="block mt-[50px] mb-1 font-medium">You can resend the code after 60s!!! </span>
                <span className="font-bold text-blue">Resend code</span>
                <div className="mt-5 flex gap-5 font-medium text-xl">
                    <button className="w-[160px] h-[60px] rounded-full bg-red bg-opacity-20 text-red">Cancel</button>
                    <button className="w-[160px] h-[60px] rounded-full bg-blue bg-opacity-20 text-blue">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Form2;
