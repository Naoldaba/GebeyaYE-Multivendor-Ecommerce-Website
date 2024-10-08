import React, { useState } from 'react';

const BuyerSignUp = ({ signUpData, setSignUpData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleData = (prop, event) => {
    let value = event.target.value;
    setSignUpData({ ...signUpData, [prop]: value });
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
          onChange={(event) => handleData("name", event)}
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-lg">Username</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Enter username"
          required
          onChange={(event) => handleData("username", event)}
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
          onChange={(event) => handleData("email", event)}
        />
      </div>

      <div className="mb-5 relative">
        <label className="block mb-2 text-lg">Password</label>
        <input
          className="w-full p-2 border rounded"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          required
          onChange={(event) => handleData("password", event)}
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
          onChange={(event) => handleData("phone", event)}
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-lg">Account Number</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Enter CBE Account Number"
          required
          onChange={(event) => handleData("accountNumber", event)}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-md shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-4 focus:ring-green-300"
        disabled={passwordError}
      >
        Sign Up
      </button>
    </div>
  );
};

export default BuyerSignUp;
