import React from 'react';

const Form1 = () => {
    return (
        <div>
            <div className=" flex flex-col items-center p-10 rounded-md shadow-lg gap-5">
                <span className="font-bold text-xl">Update Email - Notification</span>
                <p className="text-center font-semibold mt-5">
                    To ensure the confidentiality and security of information, we have sent a 6-digit confirmation code
                    to the email "currentemail@gmail.com".
                </p>
                <p className="text-center font-semibold">
                    Please check your email "currentemail@gmail.com" to continue the process of changing your email.
                </p>
                <div className="flex gap-5 font-medium text-xl">
                    <button className="w-[190px] h-[60px] rounded-full bg-red bg-opacity-20 text-red">Cancel</button>
                    <button className="w-[190px] h-[60px] rounded-full  bg-blue bg-opacity-20 text-blue">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Form1;
