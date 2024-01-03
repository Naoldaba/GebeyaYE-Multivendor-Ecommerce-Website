import Auth from "../utils/Auth.jpg";
import { NavLink } from "react-router-dom";

const Logout = () => {
    return (
        <div className="flex justify-center flex-wrap text-center ">
            <img src={Auth} className="w-20"/>
            <h1 className="w-full text-2xl">You are successfully logged out!!</h1>
        </div>
    );
}
 
export default Logout;