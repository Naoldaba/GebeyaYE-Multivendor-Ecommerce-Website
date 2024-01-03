import React from 'react';
import { useState } from 'react';
import toy from '../utils/toy.jpg';
import RequestList from './RequestList';
import VendorManagement from './VendorManagement';



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
        <RequestList requests={requests}/>
    );
      break;
    case 'vendorList':
      content = (
        <VendorManagement vendors={vendors}/>
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
