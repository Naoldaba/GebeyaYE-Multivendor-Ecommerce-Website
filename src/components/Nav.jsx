import SearchWithDropdown from "./SearchWithDropdown";
import Hamburger from "./Hamburger";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";

function Nav({cartCount}){

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }

    const [accountClick, setAccountClick]=useState(false);
    const toggleAccount =()=>{
        setAccountClick(!accountClick);
    }

    return (
        <>
            <div>
                <header className="bg-primary flex h-28 justify-around items-center">
                    <div className="logo text-3xl italic text-white font-bold">
                        <p>Gebeyaዬ</p>
                        <p className="text-sm font-normal not-italic">ሱቅ ከእልፍኜ</p>
                    </div>
                    <div className="search_filter w-1/2">      
                        <SearchWithDropdown/>
                    </div>
                    <nav>
                        <ul className="nav md:flex text-white text-xs gap-6 hidden">
                            <li><NavLink exact to="/" activeClassName="border-b-4 border-black rounded"><GoHomeFill className="text-2xl text-center w-full"/>Home</NavLink></li>
                            <div className="flex flex-wrap justify-center relative">
                                <li onClick={toggleAccount}><NavLink to=""><RiAccountCircleFill className="text-2xl text-center w-full"/>Account</NavLink></li>
                                <div id="account" className="hidden absolute top-12 bg-black text-white text-center text-sm w-24 rounded p-1">
                                    <ul className=""> 
                                        <li><NavLink to="/login" activeClassName="border-b-4 border-black rounded">Login</NavLink></li>
                                        <li><NavLink to="/signup" activeClassName="border-b-4 border-black rounded">Sign Up</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="relative">
                                <li className="text-center"><NavLink to="/cart" activeClassName="border-b-4 border-black rounded"><FaCartShopping className="text-2xl text-center w-full" /> cart</NavLink></li>
                                <span className="absolute -top-5 -right-3 text-xl font-bold">{cartCount}</span>
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
                        <li className="hover: cursor-pointer"><NavLink to="/login">Login</NavLink></li>
                        <li className="hover: cursor-pointer"><NavLink to="/signup">Sign Up</NavLink></li>
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