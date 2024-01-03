import BuyerLogin from "../components/BuyerLogin";
import VendorLogin from "../components/VendorLogin";
import AdminLogin from "../components/AdminLogin";
import ecom from "../utils/ecom.jpg";
import { AuthContext } from "../components/AuthContext";
import VendorDashboard from "./VendorDashboard";
import { useContext, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { NavLink } from "react-router-dom";
import Auth from "../utils/Auth.jpg";



const Login = () => {
    const [selectedValue, setSelectedValue]=useState('Select Role')
    const [loginData, setLoginData]= useState({})
    const [loggedInRole, setLoggedInRole] = useState("Buyer");
    const [isDisabled, setIsDisabled]=useState(true);
    const { isAuthenticated, setUserType, login}=useContext(AuthContext);


    const handleOption=(event)=>{
        setSelectedValue(()=>event.target.value)
        if (event.target.value!=="Select Role"){
            setIsDisabled(false);
        }
        setLoginData({...loginData, ["role"]: event.target.value})
        setUserType(selectedValue)
    }

    const handleLoginSuccess = (role) => {
        setLoggedInRole(role); 
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!loginData.name || !loginData.password || !loginData.role || loginData.role === "Select Role") {
                console.log("Incomplete login data");
                return;
            }
            console.log(loginData)
            const success = await login(loginData.name, loginData.password);
    
            if (success) {
                console.log("Login Successful");
                handleLoginSuccess(loginData.role);
            } else {
                console.log('Login Failed');
            }
    
        } catch (error) {
            console.log("error occurred: ", error);
        }
    };

    let componentToRender = null;


    if (selectedValue === "Buyer") {
    componentToRender = <BuyerLogin loginData={loginData} setLoginData={setLoginData} />;
    } else if (selectedValue === "Vendor") {
    componentToRender = <VendorLogin loginData={loginData} setLoginData={setLoginData} />;
    } else if (selectedValue === "Admin") {
    componentToRender = <AdminLogin loginData={loginData} setLoginData={setLoginData} />;
    }
    

    return (
        <div>
          {isAuthenticated ? (
            <>
                {loggedInRole === "Vendor" ? <VendorDashboard /> : null}
                {loggedInRole === "Admin" ? <AdminDashboard /> : null}
                {loggedInRole === "Buyer" ? (
                <div className="flex justify-center flex-wrap text-center ">
                    <img src={Auth} className="w-20"/>
                    <h1 className="w-full text-2xl">You are successfully logged in!!</h1>
                    <NavLink to="/" className="text-center text-lg bg-primary text-white p-2 rounded mt-3">Get back to shopping</NavLink>
                </div>) : null}
            </>
          ) : (
            <div className="flex justify-around items-center">
                <form className="flex flex-col justify-center items-center w-1/2 max-w-sm my-10 rounded-md" onSubmit={handleSubmit}>
                    <h1 className="my-5 text-3xl text-center font-bold"><span className="text-blue-500">Welcome</span> Back to GebeyaYe!</h1>
                    <div className="w-4/5">
                        <select value={selectedValue} onChange={handleOption} className="w-full rounded-lg" required>
                            <option value="Select Role">Select Role</option>
                            <option value="Buyer">Buyer</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    {componentToRender}
                    <p className="text-right w-4/5 text-blue-500 mt-6"><NavLink to="/signup" className="">don't have account? Sign Up</NavLink></p>
                    <button className="bg-primary my-10 px-4 py-2 text-white rounded" disabled={isDisabled}>Log In</button>
                </form>
                <div className="hidden lg:block w-1/3">
                    <img src={ecom} className="w-full rounded-2xl"/>
                </div>
            </div>
          )}
        </div>
      );
}
 
export default Login;