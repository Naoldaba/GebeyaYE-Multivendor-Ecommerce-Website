import React, { useState } from 'react';

const PersonalInformation = ({ signUpData, handleInputChange, handleNextSection }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);
    setPasswordError(signUpData.password !== confirmPasswordValue);
  };

  return (
    <div className="w-4/5 my-10 mx-auto">
      <h1 className="text-2xl mb-6 text-center">Personal Information</h1>
      <div className="mb-5">
        <label className="block mb-2 text-lg">Full Name</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Enter full name"
          required
          value={signUpData.name || ''}
          onChange={(event) => handleInputChange("name", event)}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-lg">Username</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Enter username"
          required
          value={signUpData.username || ''}
          onChange={(event) => handleInputChange("username", event)}
          min="5"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-lg">Email</label>
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Enter email"
          required
          value={signUpData.email || ''}
          onChange={(event) => handleInputChange("email", event)}
        />
      </div>
      <div className="mb-5 relative">
        <label className="block mb-2 text-lg">Password</label>
        <input
          className="w-full p-2 border rounded"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          required
          value={signUpData.password || ''}
          onChange={(event) => handleInputChange("password", event)}
        />
        <button
          type="button"
          className="absolute right-2 top-2 text-sm text-gray-500"
          onClick={toggleShowPassword}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-lg">Confirm Password</label>
        <input
          className={`w-full p-2 border rounded ${passwordError ? 'border-red-500' : ''}`}
          type="password"
          placeholder="Confirm your password"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
        )}
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-lg">Phone Number</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Enter phone number"
          required
          value={signUpData.phone || ''}
          onChange={(event) => handleInputChange("phone", event)}
        />
      </div>
      <button
        onClick={handleNextSection}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-auto block"
        disabled={passwordError}
      >
        Next
      </button>
    </div>
  );
};

export default PersonalInformation;
