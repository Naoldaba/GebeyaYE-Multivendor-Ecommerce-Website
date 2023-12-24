import BuyerLogin from "../components/BuyerLogin";
import VendorLogin from "../components/VendorLogin";
import AdminLogin from "../components/AdminLogin";


import { useState } from "react";
const Login = () => {
    const [selectedValue, setSelectedValue]=useState('Select Role')

    const handleOption=(event)=>{
        setSelectedValue(event.target.value)
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
        <form className="flex flex-col justify-center items-center w-2/3 max-w-sm mx-auto bg-gray-200 my-10 rounded-md">
            <h1 className="my-5 text-2xl font-bold">Welcome Back to GebeyaYe!</h1>
            <div className="w-4/5">
                <select value={selectedValue} onChange={handleOption} className="w-full" required>
                    <option value="Select Role">Select Role</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            {loginComponent}
            <button className="bg-primary my-10 px-4 py-2 text-white rounded">Log In</button>
        </form>
    );
}
 
export default Login;