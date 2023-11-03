import React from 'react';
import TextField from '@mui/material/TextField';

const Form3 = () => {
    return (
        <div>
            <div className="p-10 flex flex-col items-center rounded-md shadow-lg">
                <span className="font-bold text-xl">Get New Email</span>
                <TextField label="New Email" fullWidth variant="outlined" className="mt-[33px] mb-[21px]" />

                <div className="mt-5 flex gap-5 font-medium text-xl">
                    <button className="w-[160px] h-[60px] rounded-full bg-red bg-opacity-20 text-red">Cancel</button>
                    <button className="w-[160px] h-[60px] rounded-full bg-blue bg-opacity-20 text-blue">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Form3;
