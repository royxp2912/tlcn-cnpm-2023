import React from 'react';

const Profile = () => {
    return (
        <div>
            <div>UserNav</div>
            <div>
                <div>
                    ảnh
                    <div>
                        icon
                        <span>Upload Avatar</span>
                    </div>
                </div>
                <div>viền xanh</div>
                <div>
                    <div>
                        <span>Full name</span>
                        <div>
                            <span>Han Soo Hee</span>
                            <input />
                            icon
                        </div>
                    </div>
                    <div>
                        <span>Email</span>
                        <div>
                            <span>Han Soo Hee</span>
                            <input />
                            icon
                        </div>
                    </div>
                    <div>
                        <span>Phone</span>
                        <span>0901909909</span>
                    </div>
                    <div>
                        <span>Gender</span>
                        <div>
                            {/* Lấy radio group của mui */}
                            <div>
                                <input type="checkbox" />
                                <span>Male</span>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <span>Male</span>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <span>Male</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>BirthDay</span>
                        <div>date range MUi</div>
                    </div>
                    <div>
                        icon
                        <span>Save</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
