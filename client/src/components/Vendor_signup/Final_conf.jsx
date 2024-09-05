import React from 'react';

const FinalConfirmation = ({ handlePreviousSection, handleSubmit }) => {
  return (
    <div className="w-4/5 my-10 mx-auto">
      <h1 className="text-2xl mb-6 text-center">Final Confirmation</h1>
      <p className="text-lg mb-5 text-center">
        Please review all the information before submitting.
      </p>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousSection}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          type='submit'
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default FinalConfirmation;
