import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';


const AddProductForm = () => {
  const [productName, setProductName]=useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory]=useState('');
  const [stock, setStock]=useState(0);
  const {userId,authToken} = useContext(AuthContext);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setPhoto(uploadedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('imageUrl', photo);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('stock', stock);
      formData.append('owner', userId);


      // Make a POST request to your backend API endpoint to post product data
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers:{
          "Content-Type": "multipart/form-date",
          Autherization:`Bearer${authToken}`
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Product posted successfully!');
      } else {
        console.error('Failed to post product data');
      }
    } catch (error) {
      console.error('Error posting product data:', error);
    }
  };

  return (
    <div className='w-1/2 shadow-2xl pb-4 min-w-max'>
      <h2 className='text-3xl font-bold text-center mb-20'>Add Product Form</h2>
      <form className='w-2/3 mx-auto flex flex-col gap-4' onSubmit={handleSubmit}>
        <p className='text-lg'>Upload Photo</p>
        <div className='h-36 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center'>
          <label htmlFor='file-upload' className='cursor-pointer'>
            <input id='file-upload' type='file' className='hidden' onChange={handleFileChange} />
            <div className='text-center'>
              <svg
                className='w-12 h-12 text-gray-400 mx-auto'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                ></path>
              </svg>
              <p className='text-gray-400'>Click or drag and drop to upload</p>
            </div>
          </label>
        </div>
        <label className='text-lg'>
          Product Name
          <textarea
            type='text'
            className='w-full resize-none'
            value={description}
            onChange={(e) => setProductName(e.target.value)}
          ></textarea>
        </label>
        <label className='text-lg'>
          Write Description
          <textarea
            type='text'
            className='w-full resize-none'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label className='text-lg'>
          Specify Price
          <input
            className='w-full'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className='text-lg'>
          Category
          <textarea
            type='text'
            className='w-full resize-none'
            value={description}
            onChange={(e) => setCategory(e.target.value)}
          ></textarea>
        </label>
        <label className='text-lg'>
          Stock
          <textarea
            type='number'
            className='w-full resize-none'
            value={description}
            onChange={(e) => setStock(e.target.value)}
          ></textarea>
        </label>
        <button className='bg-blue-500 p-2 text-white mt-5 rounded' type='submit'>
          Post
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
