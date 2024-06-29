import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const SalesReportPage = () => {
  const { authToken } = useContext(AuthContext);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    
    const fetchSalesData = async () => {
      try {
        const response = await fetch('https://gebeyaye-backend.vercel.app/api/order/sales_report', {
          method: 'GET',
          headers: {
            'authToken': authToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSalesData(data);
        } else {
          console.error('Failed to fetch sales data');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, [authToken]);

  return (
    <div className="container mx-10 my-8">
      <h2 className="text-3xl font-bold mb-6">Sales Report</h2>

      {salesData.length === 0 ? (
        <p>No sales data available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity Sold</th>
              <th className="border border-gray-300 px-4 py-2">Total Revenue</th>
              <th className="border border-gray-300 px-4 py-2">Delivery Date</th>

            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale._id}>
                <td className="border border-gray-300 px-4 py-2">{sale._id}</td>
                <td>
                  {sale.products.map((product, index) => (
                    <div key={index} className="flex flex-col">
                      <p className="border border-gray-300 px-4 py-2">{product.product_name}</p>
                    </div>
                  ))}
                </td>
                <td>
                  {sale.products.map((product, index) => (
                    <div key={index} className="flex flex-col">
                      <p className="border border-gray-300 px-4 py-2">{product.quantity}</p>
                    </div>
                  ))}
                </td>
                
                <td className="border border-gray-300 px-4 py-2">{sale.totalAmount}Br.</td>
                <td className="border border-gray-300 px-4 py-2">{sale.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesReportPage;
