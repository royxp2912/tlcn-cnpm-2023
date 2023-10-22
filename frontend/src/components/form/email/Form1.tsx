import React from 'react';

const Form1 = () => {
    return (
        <div>
            <div>
                <h1>Update Email - Notification</h1>
                <p>
                    To ensure the confidentiality and security of information, we have sent a 6-digit confirmation code
                    to the email "currentemail@gmail.com".
                </p>
                <p>Please check your email "currentemail@gmail.com" to continue the process of changing your email.</p>
                <div>
                    <button>Cancel</button>
                    <button>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Form1;
