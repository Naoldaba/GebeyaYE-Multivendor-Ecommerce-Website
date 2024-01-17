import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import {useHistory} from 'react-router-dom';

const AdminAdvertisements = () => {

    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authToken } = useContext(AuthContext);
    const history = useHistory();
  
    const handleApproval = async (advertisementId, approved) => {
      try {
        const response = await fetch(`http://localhost:3000/api/advert/${advertisementId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authToken': authToken,
          },
          body: JSON.stringify({ approved }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update advertisement approval');
        }
        alert('advert approved successfully');
        setAdvertisements(advertisements.filter(ad => ad._id !== advertisementId));
        history.push('/admindashboard')
      } catch (error) {
        console.error('Error updating advertisement approval:', error);
      }
    };

    const handleDelete = async (advertisementId, rejected) => {
      try {
        const response = await fetch(`http://localhost:3000/api/advert/${advertisementId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authToken': authToken,
          },
          body: JSON.stringify({ rejected }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update advertisement approval');
        }
        alert('advert rejected successfully')
        setAdvertisements(advertisements.filter(ad => ad._id !== advertisementId));
        history.push('/admindashboard')
      } catch (error) {
        console.error('Error updating advertisement approval:', error);
      }
    };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
  
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/advert', {
          headers: {
            'authToken': authToken,
          },
          signal: signal,
        });
        
        if (!signal.aborted) {
          if (!response.ok) {
            throw new Error('Failed to fetch advertisements');
          }
          const data = await response.json();
          setAdvertisements(data);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error('Error fetching advertisements:', error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
  
    fetchAdvertisements();
  
    return () => {
      abortController.abort();
    };
  }, [authToken, advertisements]);
  

  return (
    <div className="flex flex-wrap mx-auto">
      <h2 className="text-3xl text-center w-full font-semibold mt-8 mb-4 ">All Advertisements</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mx-4">
          {advertisements.map((advertisement) => (
            <div key={advertisement.id} className="bg-gray-200 p-4 rounded-md">
              <img
                src={advertisement.banner}
                alt="Advertisement"
                className="w-full h-40 object-cover mb-2 rounded-md"
              />
              <p className="text-gray-800 font-semibold">{advertisement.userName}</p>
              <p className="text-gray-600">{advertisement.description}</p>
              <div className="flex justify-between mt-2">
                <button onClick={() => handleApproval(advertisement._id, true)}>Approve</button>
                <button onClick={() => handleDelete(advertisement._id, true)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



export default AdminAdvertisements;
