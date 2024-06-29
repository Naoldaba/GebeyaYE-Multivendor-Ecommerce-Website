import pending from "../utils/pending.jpg";
import { NavLink } from "react-router-dom";

const pendingVendor = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='text-center bg-white p-8 rounded-lg shadow-lg'>
                <img src={pending} alt="Pending Approval" className='w-40 mx-auto mb-4' />
                <p className='text-xl font-semibold text-gray-700'>Your application is pending approval...</p>
                <NavLink to="/" className="text-lg bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out mt-4 inline-block">Home</NavLink>
            </div>
        </div>
    );
}
 
export default pendingVendor;