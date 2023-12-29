import BuyerSignUp from "../components/BuyerSignUp";
import VendorSignUp from "../components/VendorSignUp"
import { useState } from "react";

const SignUp = () => {

    const [selectedOption, setSelectedOption]= useState("Role");
    const [buyerData, setBuyerData]=useState({});
    const [vendorData, setVendorData]=useState({});

    const handleChange=(event)=>{
        setSelectedOption(event.target.value);
    }    

    const handleSubmit= async (event)=>{
        event.preventDefault()

        try{
            let url=''
            let filledData={}
            if (selectedOption=="Buyer"){
                filledData=buyerData
                url=''
            }else if( selectedOption=="Vendor"){
                filledData=vendorData
                url=""
            }
        
            const response= await fetch('',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filledData)

            })
            if (!response.ok) {
                throw new Error('Network response was not ok.');
                }

        } catch (error) {
            console.error('Error signing up:', error);
        }
    }


    let signUpChoice;

    if (selectedOption==="Vendor"){
        signUpChoice=<VendorSignUp vendorData={vendorData} setVendorData={setVendorData} />
    } else {
        signUpChoice=<BuyerSignUp buyerData={buyerData} setBuyerData={setBuyerData} />
    }



    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-2/3 max-w-lg mx-auto bg-gray-200 my-10 rounded-md">
            <h1 className="my-5 text-5xl text-center font-bold"><span className="text-blue-500">Welcome</span> to GebeyaYe!</h1>
            <div className="w-4/5">
                <select value={selectedOption} onChange={handleChange} className="w-full" required>
                    <option value="Role">Role</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Vendor">Vendor</option>
                </select>
            </div>
            {signUpChoice}
            <button className="bg-primary my-10 px-4 py-2 text-white rounded" >Sign Up</button>
        </form>
    );
}
 
export default SignUp;