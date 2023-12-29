import React from 'react';
import { useState } from 'react';
import toy from '../utils/toy.jpg';



const vendors=[
    {
        name:"Naol Daba Mulleta",
        email:"nahafile@gmail.com",
        password:"abcdefgh",
        phoneNum:"0920375653",
        address:"Arada",
        accountNum:'1000307059774',
        package: 'Regular',
        licence: toy,
        profilePic: toy
    }
]
const AdminMain = ({ activeMenu, requests }) => {
  const [selectedVendor, setSelectedVendor]= useState(null);
    
  const toggleAccordion=(vendorName)=>{
      if (selectedVendor===vendorName){
        setSelectedVendor(null);
      }else{
        setSelectedVendor(vendorName);
      }
  };

  let content = null;
  
  switch (activeMenu) {
    case 'request':
        content = (
        <div>
            <h2 className='text-4xl text-center mb-12'>Requests</h2>
            {requests.map((request, ind) => (
                <div key={ind} className='p-3 shadow-2xl mx-6 my-20'>
                    <div className='flex flex-wrap  items-center'>
                        <img src={request.profilePic} alt="Profile" className='w-1/2' />
                        <div>
                            <div className='mb-4'>
                                <p>Name:</p>
                                <p>{request.name}</p>
                            </div>
                            <div className='mb-4'>
                                <p>Email:</p>
                                <p>{request.email}</p>
                            </div>
                            <div className='mb-4'>
                                <p>Phone Number:</p>
                                <p>{request.phoneNum}</p>
                            </div>
                            
                            <div className='mb-4'>
                                <p>Address:</p>
                                <p>{request.address}</p>
                            </div>
                            <div className='mb-4'>
                                <p>Account Number:</p>
                                <p>{request.accountNum}</p>
                            </div>
                            <div>
                                <p>Selected Package:</p>
                                <p>{request.package}</p>
                            </div>
                            {/* <img src={request.licence} className='block' /> */}
                        </div>

                    </div>
                    
                    <button className='bg-blue-500 text-white p-2 w-36 mx-auto'>Approve</button>
                </div>
                ))}

        </div>
    );
      break;
    case 'vendorList':
      content = (
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
                            <button onClick={() => toggleAccordion(vendor.name)} className="text-blue-500 font-semibold mb-2 focus:outline-none">
                                {selectedVendor === vendor.name ? 'Show less' : 'Show More'}
                            </button>

                            {selectedVendor===vendor.name && (
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
                            
                            {/* <img src={request.licence} className='block' /> */}
                        </div>

                    </div>
                    
                    <button className='bg-blue-500 text-white p-2 w-36 mx-auto' type='submit'>Ban Vendor</button>
                </div>
                ))}

        </div>
      );
      break;
    case 'advertisments':
      content = <div>Advertisment Section</div>;
      break;
    default:
      content = <div>Select an option from the sidebar</div>;
  }

  return <div className="main-section col-span-7 flex justify-center items-center ">{content}</div>;
};

export default AdminMain;
