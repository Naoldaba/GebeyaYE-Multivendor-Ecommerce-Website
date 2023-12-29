import BuyerLogin from "../components/BuyerLogin";
import VendorLogin from "../components/VendorLogin";
import AdminLogin from "../components/AdminLogin";
import ecom from "../utils/ecom.jpg"



import { useState } from "react";
const Login = () => {
    const [selectedValue, setSelectedValue]=useState('Select Role')
    const [buyerData, setBuyerData]=useState({});
    const [vendorData, setVendorData]=useState({});
    const [adminData, setAdminData]=useState({});

    const handleOption=(event)=>{
        setSelectedValue(event.target.value)
    }

    const handleSubmit=async (event)=>{

        event.preventDefault();
        try{

            let filledData={};
            let url=''
            if (selectedValue=="Buyer"){
                filledData=buyerData;
                url=''
            }else if (selectedValue=="Vendor"){
                filledData=vendorData;
                url=''
            }else if(selectedValue=="Admin"){
                filledData=adminData;
                url=''
            }

            const response=await fetch('',{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filledData)
            })

            if(response.ok){
                const data=await response.json();
                localStorage.setItem('token', data.token)
            }
            else{
                console.log('Login Failed');
            }

        }catch(error){
            console.log("error occured: ",error)
        }



    }

    let loginComponent;

    if (selectedValue === "Buyer") {
        loginComponent = <BuyerLogin />;
      } else if (selectedValue === "Vendor") {
        loginComponent = <VendorLogin />;
      } else if (selectedValue === "Admin") {
        loginComponent = <AdminLogin />;
      } else if(selectedValue==="Select Role"){
            loginComponent=<BuyerLogin/>
      }

    return (
        <div className="flex justify-around">
            <form className="flex flex-col justify-center items-center w-1/2 max-w-sm   my-10 rounded-md" onSubmit={handleSubmit}>
                <h1 className="my-5 text-3xl text-center font-bold"><span className="text-blue-500">Welcome</span> Back to GebeyaYe!</h1>
                <div className="w-4/5">
                    <select value={selectedValue} onChange={handleOption} className="w-full rounded-lg" required>
                        <option value="Select Role">Select Role</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Vendor">Vendor</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                {loginComponent}
                <button className="bg-primary my-10 px-4 py-2 text-white rounded">Log In</button>

            </form>
            <div className="hidden lg:block w-1/2">
                <img src={ecom} className="w-full rounded-2xl"/>
            </div>
        </div>
        
    );
}
 
export default Login;