import { useState } from "react";

const BuyerSignUp = ({signUpData, setSignUpData}) => {

    const handleData=(prop,event)=>{
        let value=event.target.value;
        setSignUpData({...signUpData, [prop]:value})
    }


    return (
        <>
            <div className="w-4/5 my-10">
                <label className="block mb-2 text-lg">Full Name</label>
                <input className="w-full" type="text" placeholder="Enter full name" required onChange={(event)=>handleData("name",event)}/>
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">User Name</label>
                <input className="w-full" type="text" placeholder="Enter user name" required onChange={(event)=>handleData("username",event)}/>
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Password</label>
                <input className="w-full" type="password" placeholder="Enter password" required onChange={(event)=>handleData("password",event)}/>
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Email</label>
                <input className="w-full" type="email" placeholder="Enter email" required onChange={(event)=>handleData("email",event)}/>
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Phone Number</label>
                <input className="w-full" type="number" placeholder="Enter phone number" required onChange={(event)=>handleData("phone",event)}/>
            </div>
            <div className="w-4/5 mb-5">
                <label className="block mb-2 text-lg">Account Number</label>
                <input className="w-full" type="text" placeholder="Credit card number" required onChange={(event)=>handleData("accountNumber",event)}/>
            </div>
        </>
    );
}
 
export default BuyerSignUp;