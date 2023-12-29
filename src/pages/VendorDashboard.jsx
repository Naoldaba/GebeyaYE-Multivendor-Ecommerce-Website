import React, { useState } from 'react';
import DashboardSidebar from '../components/VendorSidebar';
import DashboardMain from '../components/VendorMain';


const VendorDashboard = ({products}) => {
    const [activeMenu, setActiveMenu] = useState('products');

    return (
        <div className="dashboard grid grid-cols-10">
            <DashboardSidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} className="col-span-3 bg-black"/>
            <DashboardMain products={products} activeMenu={activeMenu} className="col-span-7"/>
        </div>
    );
};


export default VendorDashboard;
