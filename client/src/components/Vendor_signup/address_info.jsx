import React from 'react';
import VendorPackageChooser from '../VendorPackageChooser';

const AddressDetails = ({
  formData,
  setSignUpData,
  handleInputChange,
  handleFileInputChange,
  handleOption,
  handleNextSection,
  handlePreviousSection
}) => {
  return (
    <div className="w-4/5 my-10 mx-auto">
      <h1 className="text-2xl mb-6 text-center">Address Details</h1>
      <div className="mb-5">
        <h1 className="text-lg">Address</h1>
        <select
          className="w-full p-2 border rounded"
          value={formData.address || ''}
          onChange={(event) => handleOption("address", event)}
          required
        >
          <option value="">Select Subcity</option>
          <option value="Addis Ketema">Addis Ketema</option>
          <option value="Akaky Kaliti">Akaky Kaliti</option>
          <option value="Arada">Arada</option>
          <option value="Bole">Bole</option>
          <option value="Gullele">Gullele</option>
          <option value="Kirkos">Kirkos</option>
          <option value="Kolfe Keranio">Kolfe Keranio</option>
          <option value="Lideta">Lideta</option>
          <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
          <option value="Yeka">Yeka</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-lg">Account Number</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Enter CBE account number"
          required
          value={formData.accountNumber || ''}
          onChange={(event) => handleInputChange("accountNumber", event)}
        />
      </div>
      <VendorPackageChooser signUpData={formData} setSignUpData={setSignUpData} />
      <div className="mb-5">
        <label className="block mb-2 text-lg">Trade Licence</label>
        <input
          className="w-full p-2 border rounded"
          type="file"
          name="licence"
          accept="image/*"
          placeholder="Upload licence"
          onChange={(event) => handleFileInputChange("licence", event)}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-lg">Profile Picture</label>
        <input
          className="w-full p-2 border rounded"
          type="file"
          name="profilePicture"
          accept="image/*"
          placeholder="Upload profile picture"
          onChange={(event) => handleFileInputChange("profilePicture", event)}
        />
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousSection}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextSection}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddressDetails;
