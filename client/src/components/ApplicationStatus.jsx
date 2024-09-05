import { useContext, useState, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import pending from "../utils/pending.jpg"
import PaymentForm from './PaymentForm';

const ApplicationStatus = () => {

  const [name, setName] = useState("");
  const [status, setStatus] = useState(null);
  const [searched, setSearched] = useState(null);
  const [isPremium, setIsPremium] = useState(null);
  const {isAuthenticated} = useContext(AuthContext);


  const fetchStatus = async () => {
    try {
      //To_change https://gebeyaye-backend.vercel.app/api/user/vendor
      const response = await fetch('https://gebeyaye-backend.vercel.app/api/user/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }
  
      const data = await response.json();
      if (!data) {
        throw new Error('Empty response or invalid JSON');
      }
      setStatus(data[0].status);
      if (data[0].isPremium) {
        setIsPremium(data[0].isPremium);
      }
      setSearched(true);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStatus();
  };

  const renderContent = () => {
    if (!searched) {
      return null; 
    }

    return (
      <div>
        {status === 'pending' ? (
          <div className=''>
            <img src={pending} className='w-40 mx-auto' />
            <p className='text-2xl'>Your application is pending approval...</p>
          </div>
          
        ) : status === 'approved' && isPremium === true ? (
          <PaymentForm />
        ) : status === 'approved' && isPremium === false ? (
          isAuthenticated ? (
            <>
              <p>You are approved for the regular package.</p>
              <NavLink to="/vendordashboard">Go back to dashboard</NavLink>
            </>
          ) : (
            <>
              <h1 className='text-2xl'>Please log in to continue.</h1>
              <NavLink to="/login" className="text-blue-500 text-xl">Log in</NavLink>
            </>
          )
        ) : (
          <h1>You didn't SignUp.</h1>
        )}
      </div>
    );
  };

  return (
    <div className='flex justify-center items-center flex-wrap'>
      {!searched && (
        <>
          <h1 className='w-full text-center text-2xl mb-4'>View Application Status</h1>
          <form className='relative mr-2' onSubmit={handleSearch}>
            <FaRegUser className='absolute top-3 text-blue-500 text-xl ml-2' />
            <input
              className="w-full pl-8 focus:outline-none"
              type="text"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className='bg-primary my-2 px-4 py-2 text-white rounded'>Search</button>
          </form>
        </>
      )}
      
      <div>
          {renderContent()}
      </div>
    </div>
  );
};

export default ApplicationStatus;
