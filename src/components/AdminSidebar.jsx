import React from 'react';
import { RiAccountCircleFill } from "react-icons/ri";



const AdminSidebar = ({ setActiveMenu, activeMenu }) => {
  return (
    <div className="sidebar bg-gray-200 col-span-3 h-screen">
      <div className=' w-full mb-20 mt-24'>
        <RiAccountCircleFill className="text-6xl text-center w-full"/>
        <h2 className='text-center text-2xl font-bold'>Admin</h2>
      </div>
      
      <ul className='text-xl flex flex-col gap-5 ml-10'>
        <li onClick={() => setActiveMenu('request')} className='hover:cursor-pointer'>{activeMenu==='request' && `>`}Requests</li>
        <li onClick={() => setActiveMenu('vendorList')} className='hover:cursor-pointer'>{activeMenu==='vendorList' && `>`}Vendor List</li>
        <li onClick={() => setActiveMenu('orders')} className='hover:cursor-pointer'>{activeMenu==='orders' && `>`}Order List</li>
        <li onClick={() => setActiveMenu('advertisments')} className='hover:cursor-pointer'>{activeMenu==='advertisments' && `>`}Advertisments</li>
        <li onClick={() => setActiveMenu('questions panel')} className='hover:cursor-pointer'>{activeMenu==='questions panel' && `>`}Questions Panel</li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
