import React from 'react';
import { RiAccountCircleFill } from "react-icons/ri";



const VendorSidebar = ({ setActiveMenu, activeMenu }) => {
  return (
    <div className="sidebar bg-gray-200 col-span-3 h-screen">
      <div className=' w-full mb-20 mt-5'>
        <RiAccountCircleFill className="text-6xl text-center w-full"/>
        <h2 className='text-center text-2xl font-bold'>User</h2>
      </div>
      
      <ul className='text-xl flex flex-col gap-5 ml-10'>
        <li onClick={() => setActiveMenu('products')} className='hover:cursor-pointer'>{activeMenu==='products' && `>`}Products</li>
        <li onClick={() => setActiveMenu('addProduct')} className='hover:cursor-pointer'>{activeMenu==='addProduct' && `>`}Add Product</li>
        <li onClick={() => setActiveMenu('report')} className='hover:cursor-pointer'>{activeMenu==='report' && `>`}Report</li>
      </ul>
    </div>
  );
};

export default VendorSidebar;
