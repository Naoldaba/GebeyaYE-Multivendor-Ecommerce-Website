import React, { useContext } from 'react';
import { RiAccountCircleFill } from "react-icons/ri";
import { AuthContext } from './AuthContext';

const VendorSidebar = ({ setActiveMenu, activeMenu, isPremium }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="sidebar bg-gradient-to-b from-yellow-400 to-yellow-600 col-span-3 h-screen text-white p-6">
      <div className='w-full mb-10 mt-24'>
        <RiAccountCircleFill className="text-6xl mx-auto" />
        <h2 className='text-xl font-bold mt-2 text-center'>User</h2>
      </div>
      <ul className='text-lg flex flex-col gap-4'>
        <li
          onClick={() => setActiveMenu('profile')}
          className={`hover:cursor-pointer ${activeMenu === 'profile' && 'text-gray-900'}`}
        >
          {activeMenu === 'profile' && <span className="mr-2">{'>'}</span>} Profile
        </li>
        <li
          onClick={() => setActiveMenu('products')}
          className={`hover:cursor-pointer ${activeMenu === 'products' && 'text-gray-900'}`}
        >
          {activeMenu === 'products' && <span className="mr-2">{'>'}</span>} Products
        </li>
        <li
          onClick={() => setActiveMenu('addProduct')}
          className={`hover:cursor-pointer ${activeMenu === 'addProduct' && 'text-gray-900'}`}
        >
          {activeMenu === 'addProduct' && <span className="mr-2">{'>'}</span>} Add Product
        </li>
        {isPremium && (
          <li
            onClick={() => setActiveMenu('addbanner')}
            className={`hover:cursor-pointer ${activeMenu === 'addbanner' && 'text-gray-900'}`}
          >
            {activeMenu === 'addbanner' && <span className="mr-2">{'>'}</span>} Add Banner
          </li>
        )}
        <li
          onClick={() => setActiveMenu('report')}
          className={`hover:cursor-pointer ${activeMenu === 'report' && 'text-gray-900'}`}
        >
          {activeMenu === 'report' && <span className="mr-2">{'>'}</span>} Report
        </li>
      </ul>
    </div>
  );
};

export default VendorSidebar;
