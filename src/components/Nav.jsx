import SearchWithDropdown from "./SearchWithDropdown";
import Hamburger from "./Hamburger";
import { MdDashboard } from "react-icons/md";
import { useContext, useState } from "react";
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { AuthContext } from "./AuthContext";


function Nav({cartCount, setProducts}){

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const {isAuthenticated,logout, userType}= useContext(AuthContext);

    const toggleHamburger = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }

    const [accountClick, setAccountClick]=useState(false);

    const toggleAccount =()=>{
        setAccountClick(!accountClick);
    }

    const toggleLogoutAccount =()=>{
        console.log(isAuthenticated);
        setAccountClick(!accountClick);
        logout();
        console.log(isAuthenticated)
    }

    const type=localStorage.getItem('userType');


    return (
        <>
            <div>
                <header className="bg-primary flex h-28 justify-around items-center">
                    <div className="logo text-3xl italic text-white font-bold">
                        <p>Gebeyaዬ</p>
                        <p className="text-sm font-normal not-italic">ሱቅ ከእልፍኜ</p>
                    </div>
                    <div className="search_filter w-1/2">      
                        <SearchWithDropdown setProducts={setProducts}/>
                    </div>
                    <nav>
                        <ul className="nav md:flex text-white text-xs gap-6 hidden">
                            <li><NavLink exact to="/" activeClassName="border-b-4 border-black rounded"><GoHomeFill className="text-2xl text-center w-full"/>Home</NavLink></li>
                            <div className="flex flex-wrap justify-center relative">
                                <li onClick={toggleAccount}><NavLink to=""><RiAccountCircleFill className="text-2xl text-center w-full"/>Account</NavLink></li>
                                {isAuthenticated===false ? (
                                    <div id="account" className="hidden absolute top-12 bg-black text-white text-center text-sm w-24 rounded py-3">
                                        <ul className=""> 
                                            <li onClick={toggleAccount}><NavLink to="/login" activeClassName="border-b-4 border-black rounded">Login</NavLink></li>
                                            <li onClick={toggleAccount}><NavLink to="/signup" activeClassName="border-b-4 border-black rounded">Sign Up</NavLink></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div id="account" className="hidden absolute top-12 bg-black text-white text-center text-sm w-24 rounded py-3">
                                        <ul className=""> 
                                            <li onClick={toggleLogoutAccount}><NavLink to="/logout" activeClassName="border-b-4 border-black rounded">Log out</NavLink></li>
                                        </ul>
                                    </div>
                                )}
                                
                            </div>
                            <div className="relative">
                            {isAuthenticated === true && type === "Buyer" ? (
                                <NavLink to="/cart" activeClassName="border-b-4 border-black rounded">
                                    <FaCartShopping className="text-2xl text-center w-full" /> cart
                                </NavLink>
                                ) : isAuthenticated === true && type != null ? (
                                <NavLink to={`/${type.toLowerCase()}dashboard`} activeClassName="border-b-4 border-black rounded">
                                    <MdDashboard className="text-2xl text-center w-full cursor-not-allowed" /> Dashboard
                                </NavLink>
                                ) : (
                                <div
                                    onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    }}
                                >
                                    <FaCartShopping className="text-2xl text-center w-full cursor-not-allowed" />
                                    cart
                                </div>
                                )}

                                {isAuthenticated === true && type === "Buyer" && (
                                <span className="absolute -top-5 -right-3 text-xl">{cartCount}</span>
                            )}
                            </div>
                            
                        </ul>
                        
                        <div className="md:hidden" onClick={toggleHamburger}>
                            <Hamburger  isOpen={hamburgerOpen}/>
                        </div>
                        
                    </nav>
                    
                </header>
                <div id="dropdown" className="hidden mt-1 border-white bg-primary py-5">
                    <ul className="px-5 text-xl text-white flex flex-col gap-4 items-center ">
                        <li className="hover:cursor-pointer"><NavLink to="/">Home</NavLink></li>
                        { isAuthenticated==false ? (
                            <>
                                <li className="hover: cursor-pointer"><NavLink to="/login">Login</NavLink></li>
                                <li className="hover: cursor-pointer"><NavLink to="/signup">Sign Up</NavLink></li>
                            </>
                        ): (
                            <li onClick={toggleLogoutAccount}><NavLink to="/logout" activeClassName="hover:cursor-pointer">Log out</NavLink></li>
                        )}
                        
                        <li className="hover: cursor-pointer"><NavLink to="/cart">Cart</NavLink></li>
                        <li className="hover: cursor-pointer"><NavLink to="/about">About Us</NavLink></li>
                    </ul>
                </div>
                
            </div>
            
            <style jsx>{`
                #dropdown{
                    display: ${hamburgerOpen ? 'block': 'none'}
                }
                #account{
                    display: ${accountClick ? "block" : "none"}
                }
            `}</style>
        </>
    )
}
export default Nav;