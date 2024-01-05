import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const SalesReport = ({ vendorId }) => {
  const [products, setProducts] = useState([]);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
  
    const fetchVendorProducts = async () => {
      try {
        const response = await fetch(`YOUR_API_ENDPOINT/vendors/${vendorId}/products`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          signal: signal
        });

        if (!signal.aborted) {
          if (response.ok) {
            const data = await response.json();
            setProducts(data);
          } else {
            console.error('Failed to fetch products');
          }
        }
        
      } catch (error) {
        if (!signal.aborted) {
          console.error('Error fetching products:', error);
        }
      }
    };
  
    fetchVendorProducts();
  
    return () => {
      abortController.abort();
    };
  }, [vendorId, authToken]);
  

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Products Sold by Vendor</h2>
      <div className="grid grid-cols-3 gap-4">
      {products.map((product, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-500 text-sm">Price: ${product.price}</span>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SalesReport;
