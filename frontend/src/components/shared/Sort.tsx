'use client';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Dispatch, SetStateAction, useState } from 'react';
import { MenuOutlined, AppsOutlined } from '@mui/icons-material';
import { usePathname } from 'next/navigation';

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
type Props = {
    setActive: Dispatch<SetStateAction<boolean>>;
    active: boolean;
    sort: boolean;
    setSort: Dispatch<SetStateAction<boolean>>;
    view: string;
    setView: Dispatch<SetStateAction<string>>;
};

const Sort = ({ setActive, active, sort, setSort, view, setView }: Props) => {
    const [sorts, setSorts] = useState<string[]>(['Low to High']);
    const name = ['Low to High', 'High to Low'];
    const pathname = usePathname();
    const handleChange = (event: SelectChangeEvent<typeof sorts>) => {
        const {
            target: { value },
        } = event;
        setSorts(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        if (value !== sorts.toString()) {
            setSort((prev) => !prev);
        }
    };
    const handleSet = () => {
        if (pathname.startsWith('/search')) {
            setView('');
        } else {
            setView('hot');
        }
    };
    return (
        <div className="flex items-center justify-between mt-3 mb-5 bg-deal rounded-lg p-5">
            <div className="flex gap-5 items-center">
                <button
                    className={`${view === 'new' ? 'bg-blue' : 'bg-[#ADD6FA]'} w-[120px] h-9 font-bold rounded-md`}
                    onClick={handleSet}
                >
                    New
                </button>
                <button
                    className={`${view === 'hot' ? 'bg-blue' : 'bg-[#ADD6FA]'} w-[120px] h-9 font-bold rounded-md`}
                    onClick={() => setView('hot')}
                >
                    Hot
                </button>
                <div>
                    <span className="font-medium">Price</span>
                    <Select className="ml-[10px] h-9" value={sorts} onChange={handleChange} MenuProps={MenuProps}>
                        {name.map((sort: string) => (
                            <MenuItem key={sort} value={sort}>
                                {sort}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="flex gap-4">
                <AppsOutlined
                    onClick={() => setActive(false)}
                    fontSize="large"
                    className={`${!active ? 'text-[#40bfff]' : 'text-rv'}`}
                />
                <MenuOutlined
                    onClick={() => setActive(true)}
                    fontSize="large"
                    className={`${active ? 'text-[#40bfff]' : 'text-rv'}`}
                />
            </div>
        </div>
    );
};

export default Sort;
