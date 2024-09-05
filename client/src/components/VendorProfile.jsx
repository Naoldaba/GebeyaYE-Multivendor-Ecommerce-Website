import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import CustomDialog from './CustomDialog'; 

const VendorProfile = ({ vendorProfile }) => {
  const history = useHistory();
  const { authToken, logout } = useContext(AuthContext);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(null);

  if (!vendorProfile) {
    return <div>Couldn't fetch</div>;
  }

  const handleUpgrade = () => {
    setDialogMessage('Are you sure you want to upgrade your account to premium?');
    setDialogAction(() => confirmUpgrade);
    setDialogVisible(true);
  };

  const handleDowngrade = () => {
    setDialogMessage('Are you sure you want to downgrade your account to Regular?');
    setDialogAction(() => confirmDowngrade);
    setDialogVisible(true);
  };

  const confirmUpgrade = () => {
    fetch('https://gebeyaye-backend.vercel.app/api/user/upgrade', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authToken": authToken
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upgrade account. Please try again later.');
        }
        return response.json();
      })
      .then((data) => {
        logout();
        history.push('/login');
      })
      .catch((error) => {
        console.error('Upgrade error:', error.message);
        setDialogMessage('Something went wrong during the upgrade process. Please try again later.');
        setDialogAction(null); 
        setDialogVisible(true);
      });
  };

  const confirmDowngrade = () => {
    fetch('https://gebeyaye-backend.vercel.app/api/user/downgrade', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authToken": authToken
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to downgrade account. Please try again later.');
        }
        return response.json();
      })
      .then((data) => {
        logout();
        history.push('/login');
      })
      .catch((error) => {
        console.error('Downgrade error:', error.message);
        setDialogMessage('Something went wrong during the downgrade process. Please try again later.');
        setDialogAction(null); 
        setDialogVisible(true);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gradient-to-b from-indigo-500 to-indigo-700 shadow-md rounded px-8 py-6 mb-4  max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Vendor Profile</h2>
        {vendorProfile.map((profile) => (
          <div key={profile.id} className="grid grid-cols-2 gap-4 text-white">
            <div>
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
        {!vendorProfile[0].isPremium ? (
          <div className='text-yellow-400 mt-6'>
            <a onClick={handleUpgrade} className='hover:cursor-pointer'>Upgrade Account to Premium</a>
          </div>
        ) : (
          <div className='text-yellow-400 mt-6'>
            <a onClick={handleDowngrade} className='hover:cursor-pointer'>Downgrade Account to Regular</a>
          </div>
        )}

        {dialogVisible && (
          <CustomDialog
            message={dialogMessage}
            onClose={() => setDialogVisible(false)}
            onConfirm={dialogAction}
          />
        )}
      </div>
    </div>
  );
};

export default VendorProfile;
