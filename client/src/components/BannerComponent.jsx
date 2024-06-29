import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import {useHistory} from 'react-router-dom';

const BannerComponent = () => {
  const [advertisement, setAdvertisement] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const {authToken} = useContext(AuthContext);
  const [description, setDescription]= useState(null);
  const history= useHistory();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdvertisement(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('banner', advertisement);
      formData.append('description', description);
      const response = await fetch('https://gebeyaye-backend.vercel.app/api/advert', {
        method: 'POST',
        headers:{
          'authToken': authToken
        },
        body: formData,
      });
      console.log(authToken);

      if (response.ok) {
        console.log('Advertisement uploaded successfully!');
        alert("banner successfully sent for approval");
        history.push('/product management');
      } else {
        console.error('Failed to upload advertisement');
      }
    } catch (error) {
      console.error('Error uploading advertisement:', error);
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md mx-10">
      <h3 className="text-4xl font-semibold mb-14">Advertisement Post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-2"
          name="banner"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Advertisement Preview"
            className="w-96 h-48 mb-2 rounded-md object-cover"
          />
        )}
        
        <input type="text" className='w-full' placeholder='Enter Description' onChange={(e)=>setDescription(e.target.value)} />
        <button
          type="submit"
          className="bg-blue-500 text-white mt-6 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!advertisement}
        >
          Upload Advertisement
        </button>
      </form>
    </div>
  );
};

export default BannerComponent;
