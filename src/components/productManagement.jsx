import React, { useState, useEffect, useContext,useCallback } from 'react';
import bag from "../utils/bag.avif"
import { AuthContext } from './AuthContext';

const ProductManagement = () => {
  const {authToken} = useContext(AuthContext);
  const [price, setPrice]=useState(null);
  const [stock, setStock]=useState(null);

  const [products, setProducts] = useState([{
    id:2,
    name:"product-2",
    imageUrl: bag,
    description: "bla bla",
    price: 3000
  }]);

  useEffect(() => {
    fetch('API_ENDPOINT')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleRemove =(productId) => {
    setProducts(products.filter((product) => product._id !== productId));
   
    fetch(`YOUR_API_ENDPOINT/${productId}`, {
      method: 'DELETE',
      headers:{
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        console.log('Product deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handlePriceEdit = (productId, newPrice) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, price: newPrice } : product
      )
    );
    
    fetch(`YOUR_API_ENDPOINT/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product price');
        }
        console.log('Product price updated successfully');
      })
      .catch((error) => {
        console.error('Error updating product price:', error);
      });
  };

  const handleStockEdit = (productId, newStock ) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
    
    fetch(`YOUR_API_ENDPOINT/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock: newStock }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product price');
        }
        console.log('Product price updated successfully');
      })
      .catch((error) => {
        console.error('Error updating product price:', error);
      });
  };

  return (
    <div className="products flex flex-wrap justify-center items-center gap-3">
      <h2 className="w-full text-3xl text-center my-6 font-bold">Product List</h2>
      {products.map((product) => (
        <div key={product.id} className="product bg-white justify-self-center rounded-lg p-6 w-64 shadow-2xl">
          <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
          <div className="flex flex-wrap gap-3">
            <h3 className="text-lg font-semibold mb-2">{product.name} </h3>
            <p className="text-green-600 font-bold">Price: {product.price}Br.</p>
            <p className="text-gray-600 mb-2 w-full">Description: {product.description}</p>
            <p className="text-gray-600 mb-2 w-full">stock: {product.stock}</p>
            <p className="text-gray-600 mb-2 w-full">Category: {product.category}</p>
            
            <label className='pr-2'>
              <input
                type="number"
                onChange={(e)=>setPrice(e.target.value)}
                className="w-20 p-1 border rounded"
              />
              <button onClick={(e)=>handlePriceEdit(product.id, price)} className='bg-green-400 border-none p-2 ml-2 rounded'>setprice</button>
            </label>
            <label>
              <input
                type="number"
                onChange={(e)=>setStock(e.target.value)}
                className='w-20 p-1 border rounded'
              />
              <button className='bg-green-400 border-none p-2 ml-2 rounded' onClick={(e)=>handleStockEdit(product.id, stock)}>setStock</button>
            </label>
            <button className="bg-blue-500 p-2 text-white rounded" onClick={() => handleRemove(product.id)}>
              Remove Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductManagement;
