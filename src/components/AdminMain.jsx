import React from 'react';
import { useState } from 'react';
import toy from '../utils/toy.jpg';
import RequestList from './RequestList';
import VendorManagement from './VendorManagement';
import AdminAdvertisements from './AdminAdvertisement';
import AdminOrders from './AdminOrders';
import AdminPanel from './AdminPanel';



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
    
  // const toggleAccordion=(vendorName)=>{
  //     if (selectedVendor===vendorName){
  //       setSelectedVendor(null);
  //     }else{
  //       setSelectedVendor(vendorName);
  //     }
  // };

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
      content = (
        <AdminAdvertisements/>
      )
      break;
    case 'orders':
      content = (
        <AdminOrders/>
      )
      break;
    case 'questions panel':
      content = (
        <AdminPanel/>
      )
      break;
    default:
      content = <div>Select an option from the sidebar</div>;
  }

  return <div className="main-section col-span-7 flex justify-center items-center ">{content}</div>;
};

export default AdminMain;
