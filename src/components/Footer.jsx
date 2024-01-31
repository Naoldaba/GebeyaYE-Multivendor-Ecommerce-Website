import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function Footer(){
    return (
        <div className="flex flex-wrap justify-around w-full items-center border-t-2 border-black py-4">
            <div className="w-1/4 flex flex-col items-center">
                <ul>
                    <li className="foot-list hover:font-bold"><NavLink to="/about">About Us</NavLink></li>
                    <li className="foot-list hover:font-bold"><NavLink to="/about/contact">Contact Us</NavLink></li>
                    <li className="foot-list hover:font-bold">How to Buy</li>
                    <li className="foot-list hover:font-bold">Delivery</li>
                    <li className="foot-list hover:font-bold">Privacy Policy</li>
                </ul>
            </div>
            <div className="w-2/4">
                <p className="font-bold text-lg">We are continually working to create a favorable market environment for society!</p>
            </div>
            <div className="w-1/4 text-center flex flex-wrap justify-center">
                <p className="w-full mb-2 italic text-xl font-light">follow us on</p>
                <FaFacebook data-testid='facebook-icon' className="social-icons" color="#672301DE" fontSize="20px"/>
                <FaInstagram data-testid='instagram-icon' className="social-icons" color="#672301DE" fontSize="20px"/>
                <FaTelegram data-testid='telegram-icon' className="social-icons" color="#672301DE" fontSize="20px"/>
                <FaYoutube data-testid='youtube-icon' className="social-icons" color="#672301DE" fontSize="20px"/>
                <BiLogoGmail data-testid='gmail-icon' className="social-icons" color="#672301DE" fontSize="20px"/>
            </div>
        </div>
    )
}

export default Footer;