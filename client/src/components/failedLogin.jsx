import { NavLink } from "react-router-dom";

const failedLogin = () => {
    return (
        <div className='flex justify-center items-center flex-wrap h-screen bg-gray-100 text-gray-800'>
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Oops! Account not Found</h1>
                <p className="text-lg mb-6">Looks like the account you are looking for doesn't exist.</p>
                <p className="text-lg mb-6">Don't have an account?</p>
                <NavLink to="/signup" className="text-lg text-blue-500 underline">Sign Up</NavLink>
            </div>
        </div>
    );
}
 
export default failedLogin;