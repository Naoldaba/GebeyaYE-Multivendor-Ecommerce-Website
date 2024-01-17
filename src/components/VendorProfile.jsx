import React from 'react';
import { useState } from 'react';

const VendorProfile = ({ vendorProfile }) => {

  if (!vendorProfile) {
    return <div>Couldn't fetch</div>;
  }
  console.log(vendorProfile);
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gradient-to-b from-indigo-500 to-indigo-700 shadow-md rounded px-8 py-6 mb-4  max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Vendor Profile</h2>
        {vendorProfile.map((profile) => (
          <div key={profile.id} className="grid grid-cols-2 gap-4 text-white">
            <div>
              <p className="text-gray-300 font-semibold">Profile Picture:</p>
              <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
            </div>
            <div>
              <p className="text-gray-300 font-semibold">Name:</p>
              <p className="text-gray-200">{profile.name}</p>
            </div>
            <div>
              <p className="text-gray-300 font-semibold">Username:</p>
              <p className="text-gray-200">{profile.username}</p>
            </div>
            <div>
              <p className="text-gray-300 font-semibold">Email:</p>
              <p className="text-gray-200">{profile.email}</p>
            </div>
            <div>
              <p className="text-gray-300 font-semibold">Phone:</p>
              <p className="text-gray-200">{profile.phone}</p>
            </div>
            <div>
              <p className="text-gray-300 font-semibold">Address:</p>
              <p className="text-gray-200">{profile.address}</p>
            </div>
            <div>
              <p className="text-gray-300 font-semibold">Account Number:</p>
              <p className="text-gray-200">{profile.accountNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorProfile;
