import React, { useContext } from 'react';
import { RiAccountCircleFill } from "react-icons/ri";
import { AuthContext } from './AuthContext';



const VendorSidebar = ({ setActiveMenu, activeMenu, isPremium }) => {

  const {isAuthenticated} = useContext(AuthContext);

  return (
    <div className="sidebar bg-gray-200 col-span-3 h-screen">
      <div className=' w-full mb-20 mt-24'>
        <RiAccountCircleFill className="text-6xl text-center w-full"/>
        <h2 className='text-center text-2xl font-bold'>User</h2>
      </div>
      <ul className='text-xl flex flex-col gap-5 ml-10'>
        <li onClick={() => setActiveMenu('profile')} className='hover:cursor-pointer'>{activeMenu==='profile' && `>`}Profile</li>
        <li onClick={() => setActiveMenu('products')} className='hover:cursor-pointer'>{activeMenu==='products' && `>`}Products</li>
        <li onClick={() => setActiveMenu('addProduct')} className='hover:cursor-pointer'>{activeMenu==='addProduct' && `>`}Add Product</li>
        {isPremium && 
            <li onClick={() => setActiveMenu('addbanner')} className='hover:cursor-pointer'>{activeMenu==='addbanner' && `>`}Add Banner</li>
        }
        <li onClick={() => setActiveMenu('report')} className='hover:cursor-pointer'>{activeMenu==='report' && `>`}Report</li>
      </ul>
    </div>
  );
};

export default VendorSidebar;
