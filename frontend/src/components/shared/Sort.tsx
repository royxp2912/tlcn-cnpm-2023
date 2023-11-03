'use client';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { MenuOutlined, AppsOutlined } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 132,
        },
    },
};

const Sort = () => {
    const [sort, setSort] = useState<string[]>(['Low to High']);
    const sorts = ['Low to High', 'High to Low'];
    const handleChange = (event: SelectChangeEvent<typeof sort>) => {
        const {
            target: { value },
        } = event;
        setSort(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <div className="flex items-center justify-between mt-3 mb-5 bg-deal rounded-lg p-5">
            <div className="flex gap-5 items-center">
                <button className="bg-blue w-[120px] h-9 font-bold rounded-md">New</button>
                <button className="bg-[#ADD6FA] w-[120px] h-9 font-bold rounded-md">Hot</button>
                <div>
                    <span className="font-medium">Price</span>
                    <Select className="ml-[10px] h-9" value={sort} onChange={handleChange} MenuProps={MenuProps}>
                        {sorts.map((sort: string) => (
                            <MenuItem key={sort} value={sort}>
                                {sort}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="flex gap-4">
                <AppsOutlined fontSize="large" className="text-rv" />
                <MenuOutlined fontSize="large" className="text-[#40bfff]" />
            </div>
        </div>
    );
};

export default Sort;
