import { useState, useEffect } from 'react';

const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/advert');
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
    <div className="advertisements">
      <h2>Advertisements</h2>
      {advertisements.map((advert) => (
        <div key={advert._id} className="advertisement">
          <img src={advert.banner} alt={advert.content} className="advert-banner" />
          <p>{advert.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Advertisements;
