import React, { useContext, useState, useEffect } from 'react';
import shoe from '../utils/shoe.avif';
import bag from '../utils/bag.avif';
import toy from '../utils/toy.jpg';
import { AuthContext } from '../components/AuthContext';
import VendorSidebar from '../components/VendorSidebar';
import VendorMain from '../components/VendorMain';


const productData=[
    {
      id:1,
      name:"product-1",
      image: shoe,
      description: "bla bla",
      price: 1200
    },
    {
      id:2,
      name:"product-2",
      image: bag,
      description: "bla bla",
      price: 3000
    },
    {
      id:3,
      name:"product-3",
      image: toy,
      description: "bla bla",
      price: 2500
    },
    {
      id:4,
      name:"product-1",
      image: shoe,
      description: "bla bla",
      price: 1000
    },
    {
      id:5,
      name:"product-2",
      image: bag,
      description: "bla bla",
      price: 5000
    },
    {
      id:6,
      name:"product-3",
      image: toy,
      description: "bla bla",
      price: 1000
    }
  ]

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
          const response = await fetch('http://127.0.0.1:3000/api/product/myproduct', {
            method: "GET",
            headers: {
              "authToken": authToken,
              'Content-Type': 'application/json'
            }
          })
          console.log(authToken);
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
          const response = await fetch('http://127.0.0.1:3000/api/user/me', {
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
