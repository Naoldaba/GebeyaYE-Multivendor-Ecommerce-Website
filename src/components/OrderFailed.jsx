import React from 'react';

const OrderFailed = ({ errorMessage }) => {
  return (
    <div className="bg-red-100 rounded-md p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-red-700">Order Failed</h2>
      <p className="text-lg text-red-900 mb-2">{errorMessage}</p>
      <p className="text-lg text-red-900 mb-2">Please try again or contact support.</p>
    </div>
  );
};

export default OrderFailed;
