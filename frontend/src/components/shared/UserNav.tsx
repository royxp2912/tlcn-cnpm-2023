import React from 'react';
import { userNav } from '@/constants';

const UserNav = () => {
    return (
        <div>
            <div>
                <div>ảnh</div>
                <span>Han Soo Hee</span>
            </div>
            {userNav.map((item) => (
                <div>
                    {item.icon}
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default UserNav;
