import React, { useContext, useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminMain from '../components/AdminMain';
import { AuthContext } from '../components/AuthContext';


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
                        'authToken': authToken
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
            <AdminMain  activeMenu={activeMenu} className=""/>
        </div>
    );
}
 
export default AdminDashboard;