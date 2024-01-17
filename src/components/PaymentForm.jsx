import { useState } from 'react';

const PaymentForm = () => {
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  const handlePayment = () => {
    
    console.log('Processing payment...');
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Payment Details</h1>
      <div className="mb-4">
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
          <option value="2500">5000Br for 6 months</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentForm;
