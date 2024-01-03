import React, { useContext, useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminMain from '../components/AdminMain';
import bag from '../utils/bag.avif';
import toy from '../utils/toy.jpg';
import { AuthContext } from '../components/AuthContext';

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
    const {isAuthenticated, authToken}=useContext(AuthContext);
    const [vendorRequests, setVendorRequests]=useState(null);
    
    useEffect(()=>{
        const fetchRequests= async ()=>{
            try{
                const response=await fetch('', {
                    method: "GET",
                    headers:{
                        "Content-Type":"application/json",
                        Autherization: `Bearer ${authToken}`
                    }
                    
                })

                if (response.ok){
                    const venRequests= await response.json()
                    setVendorRequests(venRequests);
                } else{
                    console.log("Error while fetching")
                }
            } catch(error){
                console.log('Counldn\'t fetch due to:', error)
            }
        }

        if(isAuthenticated){
            fetchRequests();
        }

    },[])


    return (
        <div className="dashboard grid grid-cols-10">
            <AdminSidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} className=""/>
            <AdminMain requests={requests} activeMenu={activeMenu} className=""/>
        </div>
    );
}
 
export default AdminDashboard;