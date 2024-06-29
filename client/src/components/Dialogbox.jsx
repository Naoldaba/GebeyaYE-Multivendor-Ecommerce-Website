import React, { useState } from 'react';

const Dialogbox = ({ onDialogSubmit }) => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleSubmit = () => {
        onDialogSubmit(verificationCode);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">We have sent a Verification code to your Email. Please enter Verification Code</h2>
                <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
                    placeholder="Verification Code"
                />
                <div className="flex justify-end">
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialogbox;
