import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const VendorManagement = ({ vendors }) => {
    const [selectedVendor, setSelectedVendor] = useState(null);
    const {authToken} = useContext(AuthContext);

    const toggleAccordion = (vendorName) => {
        setSelectedVendor((prev) => (prev === vendorName ? null : vendorName));
    };

    const removeVendor = (vendorId, authToken) => {
        fetch(`your_api_endpoint/vendors/${vendorId}`, {
            method: 'DELETE',
            headers: {
                 Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log(`Vendor with ID ${vendorId} has been removed`);
            } else {
                console.error('Failed to remove vendor');
            }
        })
        .catch(error => {
            console.error('Error while removing vendor:', error);
        });
    };
    
    

    return (
        <div>
            <h2 className='text-4xl text-center mb-12'>Vendor List</h2>
            {vendors.map((vendor, ind) => (
                <div key={ind} className='p-3 shadow-2xl mx-6'>
                <div className='flex flex-wrap items-center'>
                    <img src={vendor.profilePic} alt="Profile" className='w-1/2' />
                    <div>
                    <div className='mb-4'>
                        <p>Name: {vendor.name}</p>
                    </div>
                    <div className='mb-4'>
                        <p>Email: {vendor.email}</p>
                    </div>
                    <div className='mb-4'>
                        <p>Phone Number: {vendor.phoneNum}</p>
                    </div>
                    <button
                        onClick={() => toggleAccordion(vendor.name)}
                        className="text-blue-500 font-semibold mb-2 focus:outline-none"
                    >
                        {selectedVendor === vendor.name ? 'Show less' : 'Show More'}
                    </button>

                    {selectedVendor === vendor.name && (
                        <div>
                        <div className='mb-4'>
                            <p>Address: {vendor.address}</p>
                        </div>
                        <div className='mb-4'>
                            <p>Account Number: {vendor.accountNum}</p>
                        </div>
                        <div>
                            <p>Selected Package: {vendor.package}</p>
                        </div>
                        </div>
                    )}

                    <button
                        className='bg-blue-500 text-white p-2 w-full mx-auto'
                        onClick={() => removeVendor(vendor.id, authToken)} // Pass the vendor ID to the banning function
                        type='button'
                    >
                        Ban Vendor
                    </button>
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
};

export default VendorManagement;
