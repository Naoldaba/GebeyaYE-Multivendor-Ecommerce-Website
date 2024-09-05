import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BuyerSignUp from "../components/BuyerSignUp";
import VendorSignUp from "../components/VendorSignUp";
import CustomDialog from "../components/CustomDialog"; 

const SignUp = () => {
  const [selectedOption, setSelectedOption] = useState("Buyer");
  const [signUpData, setSignUpData] = useState({});
  const [licence, setLicence] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const history = useHistory();

  let signUpChoice;

  if (selectedOption === "Vendor") {
    signUpChoice = (
      <VendorSignUp
        setSignUpData={setSignUpData}
        signUpData={signUpData}
        setLicence={setLicence}
        setProfilePicture={setProfilePicture}
      />
    );
  } else if (selectedOption === "Buyer") {
    signUpChoice = (
      <BuyerSignUp setSignUpData={setSignUpData} signUpData={signUpData} />
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    signUpData["role"] = selectedOption
    if (selectedOption=="Vendor"){
      signUpData["status"] = "pending"
    }

    Object.entries(signUpData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (selectedOption === "Vendor") {
      formData.append("licence", licence);
      formData.append("profilePicture", profilePicture);
    }

    fetch("https://gebeyaye-backend.vercel.app/api/user", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return response.json().then((data) => {
            if (selectedOption === "Buyer") {
              setDialogMessage(
                `Dear ${data.name}, you have successfully signed up. You can log in and continue.`
              );
              setIsOpen(true);
            } else {
              setDialogMessage(
                `Dear ${data.name}, your application has been successfully submitted.`
              );
              setIsOpen(true);
            }
          });
        }
      })
      .catch((error) => {
        setDialogMessage(error.message);
        setIsOpen(true);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
    if (dialogMessage.includes("successfully")) {
      if (selectedOption === "Buyer") {
        history.push("/login");
      } else {
        history.push("/application-status");
      } 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-14">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-2xl transition-transform transform hover:scale-105">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-8">
          <h1 className="text-4xl font-extrabold tracking-wide">
            Welcome to <span className="text-yellow-400">Gebeyaዬ!</span>
          </h1>
          <p className="text-lg mt-2">Join us by creating your account</p>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Select Your Role
            </label>
            <select
              value={selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            >
              <option value="Buyer">Buyer</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>

          {signUpChoice}

          
        </form>
      </div>

      <CustomDialog
        isOpen={isOpen}
        title="Sign Up Status"
        message={dialogMessage}
        onClose={closeModal}
      />
    </div>
  );
};

export default SignUp;
