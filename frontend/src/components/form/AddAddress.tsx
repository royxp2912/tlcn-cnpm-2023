'use client';
import { ChangeEvent, Dispatch, useState } from 'react';
import TextField from '@mui/material/TextField';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Address, User } from '@/types/type';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { createAddress } from '@/slices/addressSlice';
type Props = {
    setOpen: Dispatch<React.SetStateAction<boolean>>;
};
const AddAddress = ({ setOpen }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
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

    const [address, setAddress] = useState<Address>({
        user: id,
        receiver: '',
        phone: '',
        province: '',
        districts: '',
        wards: '',
        specific: '',
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const handleCheck = () => {
        if (
            !address.receiver ||
            !address.phone ||
            !address.province ||
            !address.specific ||
            !address.wards ||
            !address.districts
        ) {
            {
                toast.error('Please fill enough info');
                return false;
            }
        }
        return true;
    };
    const handleCreate = async () => {
        try {
            const isValid = handleCheck();
            if (!isValid) return;
            const res = await dispatch(createAddress(address));
            if ((res.payload as { status: number }).status === 201) {
                setOpen(false);
                toast.success('Add Address success');
            }
        } catch (error) {
            toast.error('Wrong info');
        }
    };
    console.log(address);
    return (
        <div className="modal">
            <div className="modal-container">
                <div className="flex items-center justify-between mb-[10px]">
                    <span className="font-bold text-xl">New Delivery Address</span>
                    <ClearRoundedIcon onClick={() => setOpen(false)} fontSize="large" className="text-orange cursor-pointer" />
                </div>
                <span className="font-medium">Where you want to receive your orders!!!</span>
                <div className="flex gap-10 flex-col mt-10 mb-5">
                    <div className="flex gap-10 items-center">
                        <TextField
                            onChange={handleChange}
                            id="receiver"
                            label="Reveiver Name"
                            variant="outlined"
                            className="w-[360px] h-[70px]"
                        />
                        <TextField
                            onChange={handleChange}
                            id="phone"
                            label="Phone Number"
                            variant="outlined"
                            className="w-[360px] h-[70px]"
                        />
                    </div>
                    <div className="flex gap-5">
                        <TextField
                            onChange={handleChange}
                            id="province"
                            label="Province / City"
                            variant="outlined"
                            className="w-[240px] h-[70px]"
                        />
                        <TextField
                            onChange={handleChange}
                            id="districts"
                            label="District"
                            variant="outlined"
                            className="w-[240px] h-[70px]"
                        />
                        <TextField
                            onChange={handleChange}
                            id="wards"
                            label="Wards"
                            variant="outlined"
                            className="w-[240px] h-[70px]"
                        />
                    </div>
                    <div>
                        <TextField
                            onChange={handleChange}
                            id="specific"
                            label="Specific Address"
                            variant="outlined"
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between font-medium text-xl">
                    <button
                        onClick={() => setOpen(false)}
                        className="w-[360px] h-[60px] text-red bg-red bg-opacity-20 rounded-full">
                        Cancel
                    </button>
                    <div
                        onClick={handleCreate}
                        className="w-[360px] h-[60px] cursor-pointer flex items-center justify-center gap-[6px] text-blue bg-blue bg-opacity-20 rounded-full"
                    >
                        <CloudUploadOutlinedIcon />
                        <span>Save</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAddress;
