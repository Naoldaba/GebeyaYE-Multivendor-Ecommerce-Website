import React, { useState } from 'react';
import PersonalInformation from './Vendor_signup/Personal_info';
import AddressDetails from './Vendor_signup/address_info';
import FinalConfirmation from './Vendor_signup/Final_conf';

const VendorSignUp = (
  {setSignUpData,
  signUpData,
  setLicence,
  setProfilePicture}
) => {
  const [currentSection, setCurrentSection] = useState(1);
  // const [signUpData, setSignUpData] = useState({});
  // const [licence, setLicence] = useState(null);
  // const [profilePicture, setProfilePicture] = useState(null);

  const handleInputChange = (prop, event) => {
    setSignUpData({ ...signUpData, [prop]: event.target.value });
  };

  const handleFileInputChange = (prop, event) => {
    if (prop === "licence") {
      setLicence(event.target.files[0]);
    } else {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleOption = (prop, event) => {
    setSignUpData({ ...signUpData, [prop]: event.target.value });
  };

  const handleNextSection = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePreviousSection = () => {
    setCurrentSection(currentSection - 1);
  };

  return (
    <>
      {currentSection === 1 && (
        <PersonalInformation
          signUpData={signUpData}
          setSignUpData = {setSignUpData}
          handleInputChange={handleInputChange}
          handleNextSection={handleNextSection}
        />
      )}

      {currentSection === 2 && (
        <AddressDetails
          formData={signUpData}
          setSignUpData={setSignUpData}
          handleInputChange={handleInputChange}
          handleFileInputChange={handleFileInputChange}
          handleOption={handleOption}
          handleNextSection={handleNextSection}
          handlePreviousSection={handlePreviousSection}
        />
      )}

      {currentSection === 3 && (
        <FinalConfirmation
          handlePreviousSection={handlePreviousSection}
        />
      )}
    </>
  );
};

export default VendorSignUp;
