import React, { useState, useEffect, useContext,useCallback } from 'react';
import { AuthContext } from './AuthContext';
import {useHistory} from 'react-router-dom';

const ProductManagement = () => {
  const {authToken} = useContext(AuthContext);
  const [price, setPrice]=useState(null);
  const [stock, setStock]=useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({});

  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
  
    fetch('http://127.0.0.1:3000/api/product/myproduct', { 
      method:"GET",
      headers: {
        "authToken": authToken
      },
      signal 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching products:', error);
        }
      });
  
    return () => {
      abortController.abort();
    };
  }, []);
  

  const handleRemove =(productId) => {
   
    fetch(`http://localhost:3000/api/product/${productId}`, {
      method: 'DELETE',
      headers:{
        'authToken': authToken,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        setProducts(products.filter((product) => product._id !== productId));
        console.log('Product deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handlePriceEdit = (productId, newPrice) => {
    const updatedProduct = products.find((product) => product._id === productId);
    if (!updatedProduct) {
      console.error("Product not found");
      return;
    }
  
    const updatedProductData = { ...updatedProduct, price: newPrice };
    const { name, stock, category, description, price } = updatedProductData;
  
    const updatedProductToSend = { name, stock, category, description, price };
  
    setProducts(
      products.map((product) =>
        product._id === productId ? updatedProductData : product
      )
    );
  
    fetch(`http://localhost:3000/api/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authToken': authToken,
      },
      body: JSON.stringify(updatedProductToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product price');
        }
        console.log('Product price updated successfully');
        alert("product updated!")
        history.push('/product management');
      })
      .catch((error) => {
        console.error('Error updating product price:', error);
      });
  };
  
  const handleStockEdit = (productId, newStock) => {
    const updatedProduct = products.find((product) => product._id === productId);
    if (!updatedProduct) {
      console.error("Product not found");
      return;
    }
  
    const updatedProductData = { ...updatedProduct, stock: newStock };
    const { name, stock, category, description, price } = updatedProductData;
  
    const updatedProductToSend = { name, stock, category, description, price };
  
    setProducts(
      products.map((product) =>
        product._id === productId ? updatedProductData : product
      )
    );
  
    fetch(`http://localhost:3000/api/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authToken': authToken,
      },
      body: JSON.stringify(updatedProductToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product stock');
        }
        console.log('Product stock updated successfully');
        alert("product updated!")
      })
      .catch((error) => {
        console.error('Error updating product stock:', error);
      });
  };
  

  return (
    <div className="products flex flex-wrap justify-center items-center gap-3">
      <h2 className="w-full text-3xl text-center my-6 font-bold">Product List</h2>
      {products.map((product) => (
        <div key={product._id} className="product bg-white justify-self-center rounded-lg p-6 w-64 shadow-2xl">
          <img src={product.imageurl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
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
              <button onClick={(e)=>handlePriceEdit(product._id, price)} className='bg-green-400 border-none p-2 ml-2 rounded'>setprice</button>
            </label>
            <label>
              <input
                type="number"
                
                onChange={(e)=>setStock(e.target.value)}
                className='w-20 p-1 border rounded'
              />
              <button className='bg-green-400 border-none p-2 ml-2 rounded' onClick={(e)=>handleStockEdit(product._id, stock)}>setStock</button>
            </label>
            <button className="bg-blue-500 p-2 text-white rounded" onClick={() => handleRemove(product._id)}>
              Remove Product
            </button>
          </div>
        </div>
        ))}
    </div>
  );
};

export default ProductManagement;
