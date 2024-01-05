import React from 'react';
import { useState } from 'react';

const VendorProfile = ({ vendorProfile }) => {

  if (!vendorProfile) {
    return <div>Couldn't fetch</div>;
  }
  console.log(vendorProfile);
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 py-6 mb-4 w-3/4 max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Vendor Profile</h2>
        {vendorProfile.map((profile)=>(
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-semibold">Profile Picture:</p>
              {console.log(profile.profilePicture)}
              <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Name:</p>
              <p className="text-gray-600">{profile.name}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Username:</p>
              <p className="text-gray-600">{profile.username}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Email:</p>
              <p className="text-gray-600">{profile.email}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Phone:</p>
              <p className="text-gray-600">{profile.phone}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Address:</p>
              <p className="text-gray-600">{profile.address}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Account Number:</p>
              <p className="text-gray-600">{profile.accountNumber}</p>
            </div>
            {/* <div>
              <p className="text-gray-700 font-semibold">Licence:</p>
              <img className="text-gray-600" src={profile.licence}/>
            </div> */}
          </div>))}
      </div>
    </div>
  );
};

export default VendorProfile;
