import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


const VendorLogin = ({loginData, setLoginData}) => {


    const [showPassword, setShowPassword]=useState(false);
    // const [password, setPassword]=useState('');

    const togglePasswordVisibility=()=>{
        setShowPassword(prevState=>!prevState)
    }

    const handleVendorData=(prop, e)=>{
        setLoginData({...loginData, [prop]:e.target.value})
    }
    return (
        <>
            <div className="w-4/5 my-8">
                <label className="block mb-2 text-lg">Vendor ID</label>
                <div className='relative'>
                    <FaRegUser className='absolute top-3 text-blue-500 text-xl' />
                    <input className="w-full border-none pl-6 focus:outline-none" type="text" placeholder="Enter vendor id" required onChange={(e) => {handleVendorData("name", e)}} />
                </div>
            </div>

            <div className="w-4/5">
                <label className="block mb-2 text-lg">Password</label>
                <div className='relative'>
                    <RiLockPasswordFill className='absolute top-3 text-blue-500 text-xl' />
                    <input className="border-none w-full pl-6" type={showPassword ? 'text' : 'password'} placeholder="Enter password" required onChange={(e) => {handleVendorData("password", e)}}/>
                    <span onClick={togglePasswordVisibility} className='absolute right-0 top-3'>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                
            </div>
        </>
    );
}
 
export default VendorLogin;