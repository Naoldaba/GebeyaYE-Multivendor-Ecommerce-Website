import React, { useState } from 'react';

const VendorPackageChooser = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  
  const handlePackageSelection = (packageName) => {
    setSelectedPackage(packageName);
    
  };

  return (
    <div className='w-4/5 mb-5'>
      <h2>Select Your Vendor Package</h2>
      <div className='my-5'>
        <label className='pr-4'>
          <input
            type="radio"
            name="package"
            value="Regular"
            checked={selectedPackage === 'Regular'}
            className='mr-3'
            onChange={() => handlePackageSelection('Regular')}
          />Regular - ----------
        </label>
      </div>
      <div className='mb-5'>
        <label>
          <input
            type="radio"
            name="package"
            value="Premium"
            checked={selectedPackage === 'Premium'}
            className='mr-3'
            onChange={() => handlePackageSelection('Premium')}
          />
          Premium - ---------
        </label>
      </div>
      
      <div>
        <p>Selected Package: {selectedPackage}</p>
      </div>
    </div>
  );
};

export default VendorPackageChooser;
