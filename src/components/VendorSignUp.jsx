
import { NavLink } from "react-router-dom";
import VendorPackageChooser from "./VendorPackageChooser";
import { useState } from "react";


const VendorSignUp = ({vendorData, setVendorData}) => {
    const [selectedValue, setSelectedValue]=useState('Select subcity');

    const handleOption=(prop, event)=>{
        setSelectedValue(event.target.value)
        setVendorData({ ...vendorData, [prop]: event.target.value });
    }

    const handleInputChange = (prop, event) => {
        setVendorData({ ...vendorData, [prop]: event.target.value });
    };
    
    const handleFileInputChange = async (prop, event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append(prop, file);
        setVendorData({ ...vendorData, [prop]: formData });
    };

    return (
        <>
            <NavLink to='/application status' className="text-blue-500 text-lg absolute top-44 right-5">Check application status?</NavLink>
            <div className="w-4/5 my-10">
                <label className="block mb-2 text-lg">Full Name</label>
                <input className="w-full" type="text" placeholder="Enter full name" required onChange={(event)=>handleInputChange("name", event)} />
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Email</label>
                <input className="w-full" type="email" placeholder="Enter email" required onChange={(event)=>handleInputChange("email", event)} />
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Password</label>
                <input className="w-full" type="password" placeholder="Enter password" required onChange={(event)=>handleInputChange("password", event)} />
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Phone Number</label>
                <input className="w-full" type="number" placeholder="Enter phone number" required onChange={(event)=>handleInputChange("phone_num", event)} />
            </div>
            <div className="w-4/5 mb-5">
                <h1 className="text-lg">Address</h1>
                <select className="w-full"  value={selectedValue} onChange={(event)=>handleOption("subcity",event)}  required  >
                        <option value="">Select Subcity</option>
                        <option value="Addis Ketema">Addis Ketema</option>
                        <option value="Akaky Kaliti">Akaky Kaliti</option>
                        <option value="Arada">Arada</option>
                        <option value="Bole">Bole</option>
                        <option value="Gullele">Gullele</option>
                        <option value="Kirkos">Kirkos</option>
                        <option value="Kolfe Keranio">Kolfe Keranio</option>
                        <option value="Lideta">Lideta</option>
                        <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
                        <option value="Yeka">Yeka</option>
                </select>
            </div>
            
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Account Number</label>
                <input className="w-full" type="number" placeholder="Credit card number" required onChange={(event)=>handleInputChange("account_number", event)} />
            </div>
            <VendorPackageChooser vendorData={vendorData} setVendorData={setVendorData}/>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Trade Licence</label>
                <input className="w-full" type="file" placeholder="Upload licence" required onChange={(event) => handleFileInputChange("trade_licence", event)} />
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Profile Picture</label>
                <input className="w-full" type="file" name="image" accept="image/*" placeholder="Upload licence" required onChange={(event) => handleFileInputChange("profile_pic", event)} />
            </div>
            

        </>
    );
}
 
export default VendorSignUp;