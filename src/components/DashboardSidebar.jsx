import React from 'react';
import { RiAccountCircleFill } from "react-icons/ri";



const DashboardSidebar = ({ setActiveMenu, activeMenu }) => {
  return (
    <div className="sidebar bg-gray-200 col-span-3 h-screen">
      <div className=' w-full mb-20 mt-5'>
        <RiAccountCircleFill className="text-8xl text-center w-full"/>
        <h2 className='text-center text-3xl font-bold'>User</h2>
      </div>
      
      <ul className='text-3xl flex flex-col gap-5 ml-10'>
        <li onClick={() => setActiveMenu('products')}>{activeMenu==='products' && `>`}Products</li>
        <li onClick={() => setActiveMenu('addProduct')}>{activeMenu==='addProduct' && `>`}Add Product</li>
        <li onClick={() => setActiveMenu('report')}>{activeMenu==='report' && `>`}Report</li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
