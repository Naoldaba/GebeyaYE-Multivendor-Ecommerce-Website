import BuyerLogin from "../components/BuyerLogin";
import VendorLogin from "../components/VendorLogin";
import AdminLogin from "../components/AdminLogin";
import ecom from "../utils/ecom.jpg";
import { AuthContext } from "../components/AuthContext";
import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {useHistory} from "react-router-dom";


const Login = () => {
    const [selectedValue, setSelectedValue]=useState('Select Role')
    const [loginData, setLoginData]= useState({})
    const [loggedInRole, setLoggedInRole] = useState(null);
    const [isDisabled, setIsDisabled]=useState(true);
    const { isAuthenticated, setUserType, login,userType}=useContext(AuthContext);
    const history=useHistory();

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        if (storedUserType) {
            setUserType(storedUserType);
            setSelectedValue(storedUserType); 
        }
    }, []);

    const handleOption = (event) => {
        const selectedRole = event.target.value;
        setSelectedValue(selectedRole);
        if (selectedRole !== "Select Role") {
            setIsDisabled(false);
        }
        setLoginData({ ...loginData, ["role"]: selectedRole });
        setUserType(selectedRole); 
        setSelectedValue(selectedRole)
    };


    const handleLoginSuccess = (role) => {
        setLoggedInRole(role); 
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!loginData.name || !loginData.password || !loginData.role || loginData.role === "Select Role") {
                return;
            }
            const success = await login(loginData.name, loginData.password, loginData.role);
    
            if (success==="vendorLogin") {
                localStorage.setItem('userType', userType);
                handleLoginSuccess(loginData.role);
                history.push('/vendordashboard')
                
            }else if(success==="pendingPayment"){
                history.push("/login/paymentform")
            }
            else if(success==="vendorPending"){
                history.push('/login/vendorpending')
            }
            else if (success==="buyerLogin"){
                localStorage.setItem('userType', userType);
                history.push('/login/buyerlogin')
            }
            else if (success==="adminLogin"){
                localStorage.setItem('userType', userType);
                history.push('/admindashboard')
            }
            else {
                history.push('/login/loginfailed')
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
          {/* {isAuthenticated ? (
            <>
                {userType === "Buyer" ? (
                <div className="flex justify-center flex-wrap text-center ">
                    <img src={Auth} className="w-20"/>
                    <h1 className="w-full text-2xl">You are successfully logged in!!</h1>
                    <NavLink to="/" className="text-center text-lg bg-primary text-white p-2 rounded mt-3">Get back to shopping</NavLink>
                </div>) : null}
            </>
          ) : ( */}
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
                    <p className="text-right w-4/5 text-blue-500 "><NavLink to="/application-status" className="">view application status</NavLink></p>
                    <button className="bg-primary my-10 px-4 py-2 text-white rounded" disabled={isDisabled}>Log In</button>
                </form>
                <div className="hidden lg:block w-1/3">
                    <img src={ecom} className="w-full rounded-2xl"/>
                </div>
            </div>
          {/* )} */}
        </div>
      );
}
 
export default Login;