import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const VendorPackageChooser = ({ signUpData, setSignUpData }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePackageSelection = (packageName) => {
    setSelectedPackage(packageName);
    setSignUpData({ ...signUpData, isPremium: packageName === 'Premium' });
  };

  const packages = [
    {
      name: 'Regular',
      description: 'No Ad posting',
      benefits: ['Basic support', 'Access to vendor tools'],
    },
    {
      name: 'Premium',
      description: 'Viral Ad posting',
      benefits: ['Priority support', 'Enhanced tools', 'Featured listing'],
    },
  ];

  return (
    <div className='w-full mb-10'>
      <h2 className='text-2xl font-bold mb-6'>Select Your Vendor Package</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`border p-6 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedPackage === pkg.name
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-300 bg-white'
            }`}
            onClick={() => handlePackageSelection(pkg.name)}
          >
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold'>{pkg.name} Package</h3>
              {selectedPackage === pkg.name && (
                <FaCheckCircle className='text-blue-500' />
              )}
            </div>
            <p className='text-gray-600 mb-4'>{pkg.description}</p>
            <ul className='text-gray-500'>
              {pkg.benefits.map((benefit, index) => (
                <li key={index} className='mb-2'>
                  - {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorPackageChooser;
