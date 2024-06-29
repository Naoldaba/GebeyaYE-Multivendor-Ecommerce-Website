import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const OrderSuccess = () => {
    const [orders, setOrders] = useState([]);
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/order/myorder', {
                    method: "GET",
                    headers: {
                        "authToken": authToken
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    throw new Error("Unfortunately couldn't fetch orders");
                }
            } catch (error) {
                console.log("Error while fetching orders: ", error);
            }
        };

        fetchOrders();
    }, [authToken]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-700 mt-10 ml-6">Order Success!</h2>
            {orders.map(order => (
                <div key={order._id} className="bg-green-100 rounded-md p-6 shadow-md mb-4">
                    <h3 className="text-lg font-semibold mb-2">Customer Name: {order.userName}</h3>
                    <p className="text-lg font-semibold mb-2">Order ID: {order._id}</p>
                    <h4 className="text-lg font-semibold mb-2">Order Details:</h4>
                    <ul className="list-disc ml-6">
                        {order.products.map((product, index) => (
                            <li key={index} className="text-gray-700">
                                Product Name: {product.product_name}, Quantity: {product.quantity}
                            </li>
                        ))}
                    </ul>
                    <p className="text-lg font-semibold mt-2">Total Amount: {order.totalAmount}</p>
                    <p className="text-lg font-semibold mt-2">Delivery Date: {order.deliveryDate}</p>
                    <p className="text-lg font-semibold mt-2">Delivery Location: {order.deliveryLocation}</p>
                </div>
            ))}
        </div>
    );
};

export default OrderSuccess;
