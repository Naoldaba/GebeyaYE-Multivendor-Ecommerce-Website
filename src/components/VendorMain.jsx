import React, { useContext } from 'react';
import AddProductForm from './AddProductForm';
import ProductManagement from './productManagement';
import VendorProfile from './VendorProfile';
import BannerComponent from './BannerComponent';
import SalesReport from './SalesReport';


const VendorMain = ({ activeMenu, products, profileData}) => {
  
  let content = null;
  

  switch (activeMenu) {
    case 'profile':
      content = (
        <VendorProfile vendorProfile={profileData}/>
      );
      break;
    case 'products':
        content = (
        <ProductManagement products={products}/>
    );
      break;
    case 'addProduct':
      content = (
        <AddProductForm />
      );
      break;
    case 'addbanner':
      content = (
        <BannerComponent/>
      )
      break;
    case 'report':
      content = (
        <SalesReport/>
      )
      break;
    default:
      content = <div>Select an option from the sidebar</div>;
  }

  return <div className="main-section col-span-7 flex justify-center items-center mb-4">{content}</div>;
};

export default VendorMain;
