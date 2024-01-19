import BuyerSignUp from "../components/BuyerSignUp";
import VendorSignUp from "../components/VendorSignUp"
import { useState } from "react";
import {useHistory} from 'react-router-dom';

const SignUp = () => {


    const [selectedOption, setSelectedOption] = useState("Role");
    const [signUpData, setSignUpData] = useState({});
    const [licence, setLicence]= useState(null);
    const [profilePicture, setProfilePicture]=useState(null);
    const history= useHistory();

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
      
        const updatedSignUpData = { ...signUpData, role: value };
      
        if (value === "Vendor") {
          updatedSignUpData.status = "pendding";
        }
      
        setSignUpData(updatedSignUpData);
      };
      
    let signUpChoice;

    if (selectedOption === "Vendor") {
        signUpChoice = <VendorSignUp  setSignUpData={setSignUpData} signUpData={signUpData} setLicence={setLicence} setProfilePicture={setProfilePicture} />;
    } else {
        signUpChoice = <BuyerSignUp setSignUpData={setSignUpData} signUpData={signUpData} />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          let formData = new FormData();
    
          Object.entries(signUpData).forEach(([key, value]) => {
              formData.append(key, value);
            
          });
          if (selectedOption==="Vendor"){
            formData.append("licence", licence);
            formData.append("profilePicture", profilePicture);  
          }
    
          const response = await fetch("http://127.0.0.1:3000/api/user", {
            method: "POST",
            body: formData,
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          } else{
            const data = await response.json()
            console.log(data); 
            if (selectedOption=="Buyer"){
              alert(`Dear ${data.name} you are successfully signed up. You can login and continue`);
              history.push('/login')
            } else{
              alert(`Dear ${data.name} your application is successfully sent.`);
              history.push('/application status');
            }
          }
    
        } catch (error) {
          alert("Error in signing in")
          console.error('Opps there is something wrong when signing you up:', error.message);
          
        }
      };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-2/3 max-w-lg mx-auto bg-gray-200 my-10 rounded-md">
            
            <h1 className="my-5 text-5xl text-center font-bold"><span className="text-blue-500">Welcome</span> to GebeyaYe!</h1>
            <div className="w-4/5">
                <select value={selectedOption} onChange={handleChange} className="w-full" required>
                    <option value="Role">Role</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Vendor">Vendor</option>
                </select>
            </div>

            {signUpChoice}
        </form>
    );
}
 
export default SignUp;