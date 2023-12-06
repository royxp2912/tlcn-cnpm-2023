import React from 'react';

const Sure = () => {
    return (
        <div className="modal">
            <div className="flex flex-col bg-white items-center p-10 rounded-md shadow-form gap-5">
                <span>Are You Sure ?</span>
                <div>
                    <button>Yes</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Sure;
