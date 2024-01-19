
// import { NavLink } from "react-router-dom";
// import VendorPackageChooser from "./VendorPackageChooser";
// import { useState } from "react";


// const VendorSignUp = ({setSignUpData, signUpData, setLicence, setProfilePicture}) => {
//     const [selectedValue, setSelectedValue]=useState('Select subcity');

//     const handleOption=(prop, event)=>{
//         setSelectedValue(event.target.value)
//         setSignUpData({ ...signUpData, [prop]: event.target.value });
//     }

//     const handleInputChange = (prop, event) => {
//         setSignUpData({ ...signUpData, [prop]: event.target.value });
//     };
    
//     const handleFileInputChange = (prop, event) => {
//         if (prop==="licence"){
//             const licenceFile=event.target.files[0]
//             setLicence(licenceFile);
//         }else{
//             const ppFile=event.target.files[0];
//             setProfilePicture(ppFile);
//         }
//     };

//     return (
//         <>
//             <NavLink to='/application status' className="text-blue-500 text-lg absolute top-44 right-5">Check application status?</NavLink>
//             <div className="w-4/5 my-10">
//                 <label className="block mb-2 text-lg">Full Name</label>
//                 <input className="w-full" type="text" placeholder="Enter full name" required onChange={(event)=>handleInputChange("name", event)} />
//             </div>
//             <div className="w-4/5 mb-5">
//                 <label className="block mb-2 text-lg">User Name</label>
//                 <input className="w-full" type="text" placeholder="Enter user name" required onChange={(event)=>handleInputChange("username", event)} />
//             </div>
//             <div className="w-4/5 mb-5">
//                 <label className="block mb-2 text-lg">Email</label>
//                 <input className="w-full" type="email" placeholder="Enter email" required onChange={(event)=>handleInputChange("email", event)} />
//             </div>
//             <div className="w-4/5 mb-5">
//                 <label className="block mb-2 text-lg">Password</label>
//                 <input className="w-full" type="password" placeholder="Enter password" required onChange={(event)=>handleInputChange("password", event)} />
//             </div>
//             <div className="w-4/5 mb-5">
//                 <label className="block mb-2 text-lg">Phone Number</label>
//                 <input className="w-full" type="number" placeholder="Enter phone number" required onChange={(event)=>handleInputChange("phone", event)} />
//             </div>
//             <div className="w-4/5 mb-5">
//                 <h1 className="text-lg">Address</h1>
//                 <select className="w-full"  value={selectedValue} onChange={(event)=>handleOption("address",event)}  required  >
//                         <option value="">Select Subcity</option>
//                         <option value="Addis Ketema">Addis Ketema</option>
//                         <option value="Akaky Kaliti">Akaky Kaliti</option>
//                         <option value="Arada">Arada</option>
//                         <option value="Bole">Bole</option>
//                         <option value="Gullele">Gullele</option>
//                         <option value="Kirkos">Kirkos</option>
//                         <option value="Kolfe Keranio">Kolfe Keranio</option>
//                         <option value="Lideta">Lideta</option>
//                         <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
//                         <option value="Yeka">Yeka</option>
//                 </select>
//             </div>
            
//             <div className="w-4/5 mb-5">
//                 <label className="block mb-2 text-lg">Account Number</label>
//                 <input className="w-full" type="number" placeholder="Credit card number" required onChange={(event)=>handleInputChange("accountNumber", event)} />
//             </div>
//             <VendorPackageChooser signUpData={signUpData} setSignUpData={setSignUpData}/>
//             <div className="w-4/5 mb-5">
//                 <label className="block mb-2 text-lg">Trade Licence</label>
//                 <input className="w-full" type="file" name="licence" accept="image/*" placeholder="Upload licence"  onChange={(event) => handleFileInputChange("licence", event)} />
//             </div>
//             <div className="w-4/5 mb-5">
//                 <label className="block mb-2 text-lg">Profile Picture</label>
//                 <input className="w-full" type="file" name="profilePicture" accept="image/*" placeholder="Upload profile picture"  onChange={(event) => handleFileInputChange("profilePicture", event)} />
//             </div>
//         </>
//     );
// }
 
// export default VendorSignUp;




import { NavLink } from "react-router-dom";
import VendorPackageChooser from "./VendorPackageChooser";
import { useState, useEffect } from "react";

const VendorSignUp = ({ setSignUpData, signUpData, setLicence, setProfilePicture }) => {
  const [selectedValue, setSelectedValue] = useState('Select subcity');
  const [currentSection, setCurrentSection] = useState(1);

  const [formData, setFormData] = useState({});

  const handleOption = (prop, event) => {
    setSelectedValue(event.target.value);
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleInputChange = (prop, event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleFileInputChange = (prop, event) => {
    if (prop === "licence") {
      const licenceFile = event.target.files[0];
      setLicence(licenceFile);
    } else {
      const ppFile = event.target.files[0];
      setProfilePicture(ppFile);
    }
  };

  const handleNextSection = (e) => {
    e.preventDefault();

    setSignUpData({ ...signUpData, ...formData });
    setCurrentSection(currentSection + 1);
  };

  const handlePreviousSection = (e) => {
    e.preventDefault();
    setCurrentSection(currentSection - 1);
  };

  useEffect(() => {
    
    setFormData(signUpData);
  }, [currentSection, signUpData]);

  return (
    <>
      <NavLink to='/application status' className="text-blue-500 text-lg absolute top-28 lg:top-44 right-5">
        Check application status?
      </NavLink>

      {currentSection === 1 && (
        <>
            <div className="w-4/5 my-10">
            <label className="block mb-2 text-lg">Full Name</label>
            <input
                className="w-full"
                type="text"
                placeholder="Enter full name"
                required
                value={formData.name || ''}
                onChange={(event) => handleInputChange("name", event)}
            />
            </div>
            <div className="w-4/5 mb-5">
            <label className="block mb-2 text-lg">User Name</label>
            <input
                className="w-full"
                type="text"
                placeholder="Enter user name"
                required
                value={formData.username || ''}
                onChange={(event) => handleInputChange("username", event)}
            />
            </div>
            <div className="w-4/5 mb-5">
            <label className="block mb-2 text-lg">Email</label>
            <input
                className="w-full"
                type="email"
                placeholder="Enter email"
                required
                value={formData.email || ''}
                onChange={(event) => handleInputChange("email", event)}
            />
            </div>
            <div className="w-4/5 mb-5">
            <label className="block mb-2 text-lg">Password</label>
            <input
                className="w-full"
                type="password"
                placeholder="Enter password"
                required
                value={formData.password || ''}
                onChange={(event) => handleInputChange("password", event)}
            />
            </div>
            <div className="w-4/5 mb-5">
            <label className="block mb-2 text-lg">Phone Number</label>
            <input
                className="w-full"
                type="number"
                placeholder="Enter phone number"
                required
                value={formData.phone || ''}
                onChange={(event) => handleInputChange("phone", event)}
            />
            </div>
            <a onClick={handleNextSection} className="bg-blue-500 text-white px-4 py-2 cursor-pointer m-2">
            Next
            </a>
        </>
        )}


        {currentSection === 2 && (
        <>
            <div className="w-4/5 my-10">
            <h1 className="text-lg">Address</h1>
            <select
                className="w-full"
                value={selectedValue}
                onChange={(event) => handleOption("address", event)}
                required
            >
                <option value="">Select Subcity</option>
                <option value="Addis Ketema">Addis Ketema</option>
                <option value="Akaky Kaliti">Akaky Kaliti</option>
                <option value="Arada">Arada</option>
                <option value="Bole">Bole</option>
                <option value="Gullele">Gullele</option>
                <option value="Kirkos">Kirkos</option>
                <option value="Kolfe Keranio">Kolfe Keranio</option>
                <option value="Lideta">Lideta</option>
                <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
                <option value="Yeka">Yeka</option>
            </select>
            </div>
            <div className="w-4/5 mb-5">
            <label className="block mb-2 text-lg">Account Number</label>
            <input
                className="w-full"
                type="number"
                placeholder="Credit card number"
                required
                value={formData.accountNumber || ''}
                onChange={(event) => handleInputChange("accountNumber", event)}
            />
            </div>
            
            <VendorPackageChooser signUpData={formData} setSignUpData={setSignUpData} />
            <div className="w-4/5 mb-5">
            <label className="block mb-2 text-lg">Trade Licence</label>
            <input
                className="w-full"
                type="file"
                name="licence"
                accept="image/*"
                placeholder="Upload licence"
                onChange={(event) => handleFileInputChange("licence", event)}
            />
            </div>
            <div className="w-4/5 mb-5">
            <label className="block mb-2 text-lg">Profile Picture</label>
            <input
                className="w-full"
                type="file"
                name="profilePicture"
                accept="image/*"
                placeholder="Upload profile picture"
                onChange={(event) => handleFileInputChange("profilePicture", event)}
            />
            </div>
            <a onClick={handlePreviousSection} className="bg-gray-500 text-white px-4 py-2 cursor-pointer">
            Previous
            </a>
            <button className="bg-primary my-10 px-4 py-2 text-white rounded">Sign Up</button>
        </>
        )}
    </>
  );
};

export default VendorSignUp;
