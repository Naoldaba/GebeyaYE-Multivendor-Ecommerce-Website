import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://gebeyaye-backend.vercel.app/api/order', {
          method:"GET",
          headers:{
            'authToken': authToken
          }
        }); 
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Delivery Date</th>
              <th className="px-4 py-2">Sale</th>
              <th className="px-4 py-2">Deducted Commission</th>
              
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-gray-300">
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2">{order.userName}</td>
                <td className="px-4 py-2">{order.deliveryDate}</td>
                <td className="px-4 py-2">{order.totalAmount} Br.</td>
                <td className="px-4 py-2">{order.serviceFee} Br.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
