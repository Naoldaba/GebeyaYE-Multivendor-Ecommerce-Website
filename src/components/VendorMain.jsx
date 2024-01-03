import React, { useContext } from 'react';
import AddProductForm from './AddProductForm';
import ProductManagement from './productManagement';


const VendorMain = ({ activeMenu, products }) => {
  
  let content = null;

  switch (activeMenu) {
    case 'products':
        content = (
        <ProductManagement/>
    );
      break;
    case 'addProduct':
      content = (
        <AddProductForm />
      );
      break;
    case 'report':
      content = <div>Report Section</div>;
      break;
    default:
      content = <div>Select an option from the sidebar</div>;
  }

  return <div className="main-section col-span-7 flex justify-center items-center mb-4">{content}</div>;
};

export default VendorMain;
