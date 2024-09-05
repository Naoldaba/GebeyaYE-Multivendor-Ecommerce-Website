import React from 'react';
import { useState } from 'react';
import toy from '../utils/toy.jpg';
import RequestList from './RequestList';
import VendorManagement from './VendorManagement';
import AdminAdvertisements from './AdminAdvertisement';
import AdminOrders from './AdminOrders';
import AdminPanel from './AdminPanel';



const vendors=[]


const AdminMain = ({ activeMenu, requests }) => {
  const [selectedVendor, setSelectedVendor]= useState(null);

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
    case 'advertisements':
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
    // default:
    //   content = <div>Select an option from the sidebar</div>;
  }

  return <div className="main-section col-span-7 flex justify-center items-center ">{content}</div>;
};

export default AdminMain;
