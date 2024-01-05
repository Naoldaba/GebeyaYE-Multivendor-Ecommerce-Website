import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';


const AddProductForm = () => {

  const initialFormState = {
    productName: '',
    photo: null,
    description: '',
    price: '',
    category: '',
    stock: 0,
  };

  const resetForm = () => {
    setProductName('');
    setPhoto(null);
    setDescription('');
    setPrice('');
    setCategory('');
    setStock(0);
  };

  const [productName, setProductName]=useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory]=useState('');
  const [stock, setStock]=useState(0);
  const {authToken} = useContext(AuthContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const formData = new FormData();
      formData.append('productImage', photo);
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('stock', stock);

      const response = await fetch('http://127.0.0.1:3000/api/product', {
        method: 'POST',
        headers:{
          'authToken': authToken,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Product posted successfully!');
        alert("product posted successfully");
        resetForm();
      } else {
        console.error('Failed to post product data');
      }
    } catch (error) {
      console.error('Error posting product data:', error);
    }
  };

  return (
    <div className='w-2/3 shadow-2xl my-8 pb-4 min-w-max'>
      <h2 className='text-3xl font-bold text-center mb-20'>Add Product Form</h2>
      <form action="/upload" method="post" enctype="multipart/form-data" className='w-2/3 mx-auto flex flex-col gap-4' onSubmit={handleSubmit}>
        <p className='text-lg'>Upload Photo</p>
        <div className='h-36 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center'>
        <label htmlFor='file-upload' className='cursor-pointer'>
          <input
            id='file-upload'
            type='file'
            className='hidden'
            
            name="productImage"
            onChange={handleFileChange}
          />
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt='Selected'
              
              className='w-96 h-36 object-contain rounded-lg'
            />
          ) : (
            <div className='text-center'>
              <svg
                className='w-12 h-12 text-gray-400 mx-auto'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
              </svg>
              <p className='text-gray-400'>Click or drag and drop to upload</p>
            </div>
          )}
        </label>
        </div>
        <label className='text-lg'>
          Product Name
          <input
            type='text'
            
            className='w-full resize-none'
            
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label className='text-lg'>
          Write Description
          <textarea
            type='text'
            
            className='w-full resize-none'
            
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label className='text-lg'>
          Specify Price
          <input
            className='w-full'
            type='number'
           
            
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className='text-lg'>
          Category
          <input
            type='text'
           
            className='w-full '
            
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label className='text-lg'>
          Stock
          <input
            type='number'
            
            className='w-full '
            
            onChange={(e) => setStock(e.target.value)}
          />
        </label>
        <button className='bg-blue-500 p-2 text-white mt-5 rounded' type='submit'>
          Post
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
