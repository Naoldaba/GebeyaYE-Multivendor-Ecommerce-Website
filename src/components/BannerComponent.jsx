import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const BannerComponent = () => {
  const [advertisement, setAdvertisement] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const {authToken} = useContext(AuthContext);

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
      const response = await fetch('http://localhost:3000/api/advert', {
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
      } else {
        
        console.error('Failed to upload advertisement');
      }
    } catch (error) {
      console.error('Error uploading advertisement:', error);
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h3 className="text-2xl font-semibold mb-14">Premium Vendor Advertisement</h3>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!advertisement}
        >
          Upload Advertisement
        </button>
      </form>
    </div>
  );
};

export default BannerComponent;
