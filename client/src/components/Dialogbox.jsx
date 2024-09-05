import React, { useState } from 'react';

const Dialogbox = ({ onDialogSubmit, message, onClose }) => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleSubmit = () => {
        onDialogSubmit(verificationCode);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">{message}</h2>
                {message.includes("sent") && (
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
                        placeholder="Verification Code"
                    />
                )}  
                <div className="flex justify-end">
                    {message.includes("sent") ? (
                        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                            Submit
                        </button>
                    ) : (
                        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                            Ok
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dialogbox;
