import { NavLink } from "react-router-dom";
import Auth from "../utils/Auth.jpg";

const successBuyer = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-100">
            <img src={Auth} alt="Authentication" className="w-20 mb-4" />
            <h1 className="text-3xl font-bold mb-4">You are successfully logged in!</h1>
            <p className="text-gray-600 mb-6">Welcome back to our platform.</p>
            <NavLink to="/" className="text-lg bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">Get back to shopping</NavLink>
        </div>
    );
}
 
export default successBuyer;