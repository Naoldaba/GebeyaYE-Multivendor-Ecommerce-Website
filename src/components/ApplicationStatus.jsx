import { useContext, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import pending from "../utils/pending.jpg"
import PaymentForm from './PaymentForm';

const ApplicationStatus = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState("approved");
  const [searched, setSearched] = useState(true);
  const [isPremium, setIsPremium] = useState(true);
  const {isAuthenticated} = useContext(AuthContext);


  const fetchStatus = async () => {
    try {
      const response = await fetch(`_requests_api_endpoint/${name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }
      const data = await response.json();
      setStatus(data.status);
      if (data.isPremium){
        setIsPremium(data.isPremium);
      }
      setSearched(true);

    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const handleSearch = () => {
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
          <h1>No application sent.</h1>
        )}
      </div>
    );
  };

  return (
    <div className='flex justify-center items-center flex-wrap'>
      {!searched && (
        <>
          <h1 className='w-full text-center text-2xl mb-4'>View Application Status</h1>
          <div className='relative mr-2'>
            <FaRegUser className='absolute top-3 text-blue-500 text-xl ml-2' />
            <input
              className="w-full pl-8 focus:outline-none"
              type="text"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className='bg-primary my-2 px-4 py-2 text-white rounded' onClick={handleSearch}>Search</button>
          </div>
        </>
      )}
      
      <div>
          {renderContent()}
      </div>
    </div>
  );
};

export default ApplicationStatus;
