import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminMain from '../components/AdminMain';
import bag from '../utils/bag.avif';
import toy from '../utils/toy.jpg';

const requests=[
    {
        name:"Naol Daba Mulleta",
        email:"nahafile@gmail.com",
        password:"abcdefgh",
        phoneNum:"0920375653",
        address:"Arada",
        accountNum:'1000307059774',
        package: 'Regular',
        licence: bag,
        profilePic: toy
    },
    {
        name:"Naol Daba Mulleta",
        email:"nahafile@gmail.com",
        password:"abcdefgh",
        phoneNum:"0920375653",
        address:"Arada",
        accountNum:'1000307059774',
        package: 'Regular',
        licence: bag,
        profilePic: toy
    }
]

const AdminDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('request');

    return (
        <div className="dashboard grid grid-cols-10">
            <AdminSidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} className=""/>
            <AdminMain requests={requests} activeMenu={activeMenu} className=""/>
        </div>
    );
}
 
export default AdminDashboard;