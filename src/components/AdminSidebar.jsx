import React from 'react';
import { RiAccountCircleFill } from "react-icons/ri";

const AdminSidebar = ({ setActiveMenu, activeMenu }) => {
  return (
    <div className="sidebar bg-gradient-to-b from-yellow-400 to-yellow-600 col-span-3 h-screen text-white p-6">
      <div className='w-full mb-10 mt-20 text-center'>
        <RiAccountCircleFill className="text-6xl mx-auto"/>
        <h2 className='text-xl font-bold mt-2'>Admin Dashboard</h2>
      </div>
      
      <ul className='text-lg flex flex-col gap-4'>
        <li 
          onClick={() => setActiveMenu('request')} 
          className={`hover:cursor-pointer ${activeMenu === 'request' && 'text-yellow-300'}`}
        >
          {activeMenu==='request' && <span className="mr-2">{'>'}</span>} Requests
        </li>
        <li 
          onClick={() => setActiveMenu('vendorList')} 
          className={`hover:cursor-pointer ${activeMenu === 'vendorList' && 'text-yellow-300'}`}
        >
          {activeMenu==='vendorList' && <span className="mr-2">{'>'}</span>} Vendor List
        </li>
        <li 
          onClick={() => setActiveMenu('orders')} 
          className={`hover:cursor-pointer ${activeMenu === 'orders' && 'text-yellow-300'}`}
        >
          {activeMenu==='orders' && <span className="mr-2">{'>'}</span>} Order List
        </li>
        <li 
          onClick={() => setActiveMenu('advertisements')} 
          className={`hover:cursor-pointer ${activeMenu === 'advertisements' && 'text-yellow-300'}`}
        >
          {activeMenu==='advertisements' && <span className="mr-2">{'>'}</span>} Advertisements
        </li>
        <li 
          onClick={() => setActiveMenu('questions panel')} 
          className={`hover:cursor-pointer ${activeMenu === 'questions panel' && 'text-yellow-300'}`}
        >
          {activeMenu==='questions panel' && <span className="mr-2">{'>'}</span>} Questions Panel
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
