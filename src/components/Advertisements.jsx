import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/advert/all', {
          method: "GET",
          headers:{
            'authToken': authToken,
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch advertisements');
        }
        const data = await response.json();
        setAdvertisements(data);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    fetchAdvertisements();
  }, []);

  return (
    <div className="advertisements w-full mb-12 lg:mb-0 lg:w-1/5 flex flex-row gap-4 lg:flex-col items-center mx-2 ">
      {/* <h2 className='text-2xl font-semibold'>Advertisements</h2> */}
      {advertisements.map((advert) => (
        <div key={advert._id} className="advertisement mb-2">
          <img src={advert.banner} alt={advert.content} className="advert-banner lg:w-full w-96 " />
          <p>{advert.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Advertisements;
