import BuyerSignUp from "../components/BuyerSignUp";
import VendorSignUp from "../components/VendorSignUp"
import { useState } from "react";


const SignUp = () => {

    const [selectedOption, setSelectedOption]= useState("Role");

    const handleChange=(event)=>{
        setSelectedOption(event.target.value);
    }

    let signUpChoice;

    if (selectedOption==="Vendor"){
        signUpChoice=<VendorSignUp/>
    } else {
        signUpChoice=<BuyerSignUp/>
    }

    return (
        <div className="flex flex-col justify-center items-center w-2/3 max-w-sm mx-auto bg-gray-200 my-10 rounded-md">
            <h1 className="my-5 text-2xl font-bold">Welcome Back to GebeyaYe!</h1>
            <div className="w-4/5">
                <select value={selectedOption} onChange={handleChange} className="w-full" required>
                    <option value="Role">Role</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Vendor">Vendor</option>
                </select>
            </div>
            {signUpChoice}
            <button className="bg-primary my-10 px-4 py-2 text-white rounded">Sign Up</button>
        </div>
    );
}
 
export default SignUp;