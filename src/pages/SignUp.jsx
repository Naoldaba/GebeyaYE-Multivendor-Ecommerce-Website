import BuyerSignUp from "../components/BuyerSignUp";
import VendorSignUp from "../components/VendorSignUp"
import { useState } from "react";

const SignUp = () => {

    const [selectedOption, setSelectedOption] = useState("Role");
    const [buyerData, setBuyerData] = useState({});
    const [vendorData, setVendorData] = useState({});

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    let signUpChoice;

    if (selectedOption === "Vendor") {
        signUpChoice = <VendorSignUp vendorData={vendorData} setVendorData={setVendorData} />;
    } else {
        signUpChoice = <BuyerSignUp buyerData={buyerData} setBuyerData={setBuyerData} />;
    }

    // ... (Previous code remains unchanged)

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let formData = new FormData();
            let url = '';

            console.log('Selected Option:', selectedOption);
            console.log('Buyer Data:', buyerData);
            console.log('Vendor Data:', vendorData);

            if (selectedOption === "Buyer" || selectedOption === "Role") {
                console.log('Appending Buyer Data to FormData:', buyerData);
            
                for (let [key, value] of Object.entries(buyerData)) {
                    console.log('Appending to FormData:', key, value);
                    formData.append(key, value);
                }
                console.log(formData.get("name"))
                url = ""; // Set URL here for buyer

            } else if (selectedOption === "Vendor") {
                Object.entries(vendorData).forEach(([key, value]) => {
                    console.log('Appending to Vendor FormData:', key, value);
                    // Assuming profile_pic and trade_licence are files
                    if (key === "profile_pic" || key === "trade_licence") {
                        formData.append(key, value[0]); // Assuming only one file is uploaded for each
                    } else {
                        formData.append(key, value);
                    }
                    formData.append("status", "pending");
                });
              
                url = ""; // Set your URL here for vendor
            }

            console.log('Filled Data:', formData); // Debugging: check formData before sending

            const response = await fetch(url, {
                method: "POST",
                body: formData,
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };


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