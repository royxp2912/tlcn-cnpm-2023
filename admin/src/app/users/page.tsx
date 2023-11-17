import Revenue from '@/components/chart/Revenue';
import Top from '@/components/chart/Top';
import React from 'react';

const UserStatis = () => {
    return (
        <div className="flex flex-col gap-[10px]">
            <div>{/* Option của mui */}</div>
            <div>
                <Revenue path="New Users" />
            </div>
            <div>
                <Top path="user" />
            </div>
        </div>
    );
};

export default UserStatis;
