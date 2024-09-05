import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import VendorSidebar from '../components/VendorSidebar';
import VendorMain from '../components/VendorMain';


const productData=[]

const VendorDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('products');
    const {isAuthenticated, authToken}= useContext(AuthContext);
    const [vendorData, setVendorData] = useState(null);
    const [isPremium, setIsPremium]= useState(null);
    const [profileData, setProfileData]= useState(null);
    

    useEffect(() => {
      let isMounted = true;
    
      const fetchData = async () => {
        try {
          const response = await fetch('https://gebeyaye-backend.vercel.app/api/product/myproduct', {
            method: "GET",
            headers: {
              "authToken": authToken,
              'Content-Type': 'application/json'
            }
          })
          if (isMounted && response.ok) {
            const data = await response.json();
            setVendorData(data);
          } else {
            console.log("Failed to fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        }
      }
    
      const fetchMe = async () => {
        try {
          const response = await fetch('https://gebeyaye-backend.vercel.app/api/user/me', {
            method: "GET",
            headers: {
              'authToken': authToken,
              'Content-Type': 'application/json'
            }
          })
    
          if (isMounted && response.ok) {
            const data = await response.json();
            setProfileData(data);
            setIsPremium(data[0].isPremium);
          } else {
            console.log("Failed to fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        }
      }

      if (isAuthenticated) {
        fetchData();
        fetchMe();
      }
    
      return () => {
        isMounted = false;
      };
    }, []);
    

    return (
        <div className="dashboard grid grid-cols-10">
            <VendorSidebar setActiveMenu={setActiveMenu} isPremium={isPremium} activeMenu={activeMenu} className="col-span-3 bg-black"/>
            <VendorMain products={productData} activeMenu={activeMenu} profileData={profileData} className="col-span-7"/>
        </div>
    );
};


export default VendorDashboard;
