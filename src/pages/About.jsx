import { Link } from "react-router-dom";
import Eyob from '../utils/Eyob.JPG';
import Aregawi from '../utils/Aregawi.jpg';
import logo_red from '../utils/logo_red.png';
import Moti from '../utils/Moti.jpg';

const AboutUs = () => {
    return (
        <div className="flex flex-wrap mx-10">
            <h1 className="text-4xl text-center w-full my-10 font-bold">WELCOME TO GebeyaYE</h1>
            <div className="flex gap-5 items-center justify-center">
                <img src={logo_red} className="w-1/2 max-w-md rounded-md" />
                <div className="w-1/2">
                    <h3 className="text-2xl font-bold">About GebeyaYE</h3>
                    <p className="text-lg">Our product focuses primarily on creating a platform that store owners can use to
showcase and promote their products as well as to allow customers to find their
desired items and explore new products creating a virtual front between store
owners and online shoppers.</p>
                </div>
            </div>
            <div className="flex flex-wrap w-full justify-center">
                <h3 className="w-full text-center text-2xl font-bold my-10">Our Admins</h3>
                <div className="flex flex-wrap w-full justify-center gap-40">
                    <fieldset>
                        <img src={Eyob} className="h-64 max-w-max " />
                        <caption className="w-40 text-left">Eyob Deresse</caption>
                    </fieldset>
                    <fieldset>
                        <img src={Aregawi} className="h-64 max-w-max rounded-2xl" />
                        <caption className="w-40 text-left">Aregawi Fikre</caption>
                    </fieldset>
                    <fieldset>
                        <img src={Moti} className="h-64 max-w-max rounded-2xl" />
                        <caption className="w-40 text-left">Moti Leggese</caption>
                    </fieldset>
                    
                </div>
                
            </div>
            <Link className=" text-blue-500 font-semibold text-xl p-1 w-40 my-10" to="/about/contact">Contact Admins</Link>
        </div>
    );
}
 
export default AboutUs;