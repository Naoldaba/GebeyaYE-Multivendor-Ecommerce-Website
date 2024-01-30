import { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import Dialogbox from './Dialogbox';

const PaymentForm = () => {
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [username, setUsername]= useState('');
  const [showDialog, setShowDialog] = useState(false); 
  const [verificationCode, setVerificationCode] = useState('');
  const history= useHistory();

  const handleDialogSubmit = (code) => {
    setVerificationCode(code);
    setShowDialog(false);
  };

  const handlePayment = async () => {
    console.log('Processing payment...');
    console.log({ accountNumber: accountNumber, balance: Number(selectedPackage), username: username });
    fetch('http://127.0.0.1:3000/api/payment/verifyaccount', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountNumber: accountNumber, balance: Number(selectedPackage), username: username })
    })
      .then((response) => {
        if (response.ok) {
          setShowDialog(true);
        } else {
          alert("Something went wrong, please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  // Handle payment after verification code is set
  useEffect(() => {
    if (verificationCode) {
      fetch('http://127.0.0.1:3000/api/payment/pay', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ accountNumber: accountNumber, balance: Number(selectedPackage), username: username, verificationCode: verificationCode })
      })
        .then((response) => {
          if (response.ok) {
            alert("Payment Successful");
            history.push('/login');
          } else {
            return response.text().then(text => {
              throw new Error(text);
            })
          }
        })
        .catch((error) => {
          alert(error.message);
          history.push('/');
        });
    }
  }, [verificationCode]);

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Payment Details</h1>
      <div className="mb-4">
        <div className="mb-4">
        <label htmlFor="username" className="block text-lg mb-2">Username</label>
        <input
          id="username"
          type="text"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none bg-gray-100"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
        <label htmlFor="bank" className="block text-lg mb-2">Select Bank</label>
        <select
          id="bank"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none bg-gray-100"
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
        >
          <option value="">Select Bank</option>
          <option value="Commercial Bank of Ethiopia">Commercial Bank of Ethiopia</option>
          <option value="Zemen Bank">Zemen Bank</option>
          <option value="Cooperative Bank of Ethiopia">Cooperative Bank of Ethiopia</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="accountNumber" className="block text-lg mb-2">Account Number</label>
        <input
          id="accountNumber"
          type="number"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none bg-gray-100"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="package" className="block text-lg mb-2">Select Package</label>
        <select
          id="package"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none bg-gray-100"
          value={selectedPackage}
          onChange={(e) => setSelectedPackage(e.target.value)}
        >
          <option value="">Select Package</option>
          <option value="1000">1000Br for 1 month</option>
          <option value="2500">2500Br for 3 months</option>
          <option value="5000">5000Br for 6 months</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
        onClick={handlePayment}
      >
        Pay Now
      </button>
      {showDialog && <Dialogbox onDialogSubmit={handleDialogSubmit}/>}
    </div>
  );
};

export default PaymentForm;
