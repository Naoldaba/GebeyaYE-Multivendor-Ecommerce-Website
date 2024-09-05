import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const VendorManagement = () => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchVendors = async () => {
            try {
                const response = await fetch('https://gebeyaye-backend.vercel.app/api/user/approvedVendor', {
                    method: 'GET',
                    headers: {
                        "authToken": authToken,
                        'Content-Type': 'application/json'
                    },
                    signal: signal
                });

                if (!signal.aborted) {
                    if (!response.ok) {
                        throw new Error('Failed to fetch vendors');
                    }
                    const data = await response.json();
                    setVendors(data);
                }
            } catch (error) {
                if (!signal.aborted) {
                    console.error('Error fetching vendors:', error);
                }
            }
        };

        fetchVendors();

        return () => {
            abortController.abort();
        };
    }, [authToken]);

    const toggleAccordion = (vendorName) => {
        setSelectedVendor((prev) => (prev === vendorName ? null : vendorName));
    };

    const removeVendor = (vendorId) => {
        fetch(`https://gebeyaye-backend.vercel.app/api/user/${vendorId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    setVendors(prevVendors => prevVendors.filter(vendor => vendor.id !== vendorId));
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
            <h2 className='text-3xl font-semibold text-center mt-6 mb-12'>Vendor List</h2>
            {vendors.map((vendor, ind) => (
                <div key={ind} className='p-3 shadow-2xl mx-6'>
                <div className='flex flex-wrap items-center'>
                    <img src={vendor.profilePicture} alt="Profile" className='mr-6' />
                    <div>
                    <div className='mb-4'>
                        <p>Name: {vendor.name}</p>
                    </div>
                    <div className='mb-4'>
                        <p>Email: {vendor.email}</p>
                    </div>
                    <div className='mb-4'>
                        <p>Phone Number: {vendor.phone}</p>
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
                            <p>Account Number: {vendor.accountNumber}</p>
                        </div>
                        <div>{vendor.isPremium==true ? (
                                <p>Selected Package: Premium</p>
                            ) : (
                                <p>Selected Package: Regular</p>
                            )}
                        </div>
                        </div>
                    )}

                    <button
                        className='bg-blue-500 text-white p-2 w-full mx-auto mt-4'
                        onClick={() => removeVendor(vendor.id, authToken)} 
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
