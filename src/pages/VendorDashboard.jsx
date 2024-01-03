import React, { useContext, useState, useEffect } from 'react';
import shoe from '../utils/shoe.avif';
import bag from '../utils/bag.avif';
import toy from '../utils/toy.jpg';
import DashboardSidebar from '../components/VendorSidebar';
import DashboardMain from '../components/VendorMain';
import { AuthContext } from '../components/AuthContext';


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

    // useEffect(()=>{
    //     const fetchData=async ()=>{
    //         try{
    //             const response = await fetch('', {
    //                 method:"GET",
    //                 headers:{
    //                      Authorization: `Bearer ${authToken}`,
    //                     'Content-Type': 'application/json' 
    //                 }
    //             })
                
    //             if (response.ok){
    //                 const data=await response.json()
    //                 setVendorData(data);
    //             }else{
    //                 console.log("Failed to fetch data")
    //             }
    //         } catch (error){
    //             console.log("Error fetching data", error);
    //         }
    //     }

    //     if (isAuthenticated){
    //         fetchData();
    //     }
    // },[])

    return (
        <div className="dashboard grid grid-cols-10">
            <DashboardSidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} className="col-span-3 bg-black"/>
            <DashboardMain products={productData} activeMenu={activeMenu} className="col-span-7"/>
        </div>
    );
};


export default VendorDashboard;
