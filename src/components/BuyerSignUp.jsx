import { useState } from "react";

const BuyerSignUp = () => {

    const [selectedValue, setSelectedValue]=useState('Select subcity');

    const handleOption=(event)=>{
        setSelectedValue(event.target.value)
    }


    return (
        <>
            <div className="w-4/5 my-10">
                <label className="block mb-2 text-lg">Full Name</label>
                <input className="w-full" type="text" placeholder="Enter full name" required/>
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">User Name</label>
                <input className="w-full" type="text" placeholder="Enter user name" required/>
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Password</label>
                <input className="w-full" type="password" placeholder="Enter password" required/>
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Email</label>
                <input className="w-full" type="email" placeholder="Enter email" required/>
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Phone Number</label>
                <input className="w-full" type="number" placeholder="Enter phone number" required/>
            </div>
            <div className="w-4/5 mb-5">
                <h1 className="text-lg">Address</h1>
                <select className="w-full"  value={selectedValue} onChange={handleOption}  required>
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
                <input className="w-full" type="number" placeholder="Credit card number" required/>
            </div>
            
        </>
    );
}
 
export default BuyerSignUp;