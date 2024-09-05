import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useHistory } from 'react-router-dom';
import CustomDialog from './CustomDialog';

const AdminAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const { authToken } = useContext(AuthContext);
  const history = useHistory();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleApproval = async (advertisementId, approved) => {
    try {
      const response = await fetch(`https://gebeyaye-backend.vercel.app/api/advert/${advertisementId}`, {
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

      setDialogMessage('Advert approved successfully');
      setIsDialogOpen(true);
      setAdvertisements(advertisements.filter((ad) => ad._id !== advertisementId));
    } catch (error) {
      console.error('Error updating advertisement approval:', error);
    }
  };

  const handleReject = async (advertisementId, rejected) => {
    try {
      const response = await fetch(`https://gebeyaye-backend.vercel.app/api/advert/${advertisementId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authToken': authToken,
        },
        body: JSON.stringify({ rejected }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject advertisement');
      }

      setDialogMessage('Advert rejected successfully');
      setIsDialogOpen(true);
      setAdvertisements(advertisements.filter((ad) => ad._id !== advertisementId));
    } catch (error) {
      console.error('Error rejecting advertisement:', error);
    }
  };

  const handleDelete = async (adId, deleted) => {
    try {
      const response = await fetch(`https://gebeyaye-backend.vercel.app/api/advert/${adId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authToken': authToken,
        },
        body: JSON.stringify({ deleted }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete advertisement');
      }

      setDialogMessage('Advert deleted successfully');
      setIsDialogOpen(true);
      setAllAds(allAds.filter((ad) => ad._id !== adId));
    } catch (error) {
      console.error('Error deleting advertisement:', error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchAdvertisements = async () => {
      try {
        const response = await fetch('https://gebeyaye-backend.vercel.app/api/advert', {
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
      }
    };

    const fetchAllAdvertisements = async () => {
      try {
        const response = await fetch('https://gebeyaye-backend.vercel.app/api/advert/all', {
          method: 'GET',
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
          setAllAds(data);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error('Error fetching advertisements:', error);
        }
      }
    };

    fetchAllAdvertisements();
    fetchAdvertisements();

    return () => {
      abortController.abort();
    };
  }, [authToken]);

  const closeModal = () => {
    setIsDialogOpen(false);
    history.push('/admindashboard');
  };

  return (
    <div className="flex flex-wrap mx-auto">
      <div className="advertisements w-full mb-12 lg:mb-0 flex flex-wrap gap-14 items-center ml-6 ">
        <h2 className="text-3xl text-center w-full font-semibold mt-8 mb-4 ">Posted Adverts</h2>
        {allAds.length > 0 ? allAds.map((advert) => (
          <div key={advert._id} className="advertisement mb-2">
            <img src={advert.banner} alt={advert.content} className="advert-banner w-36" />
            <p>{advert.content}</p>
            <button className='bg-primary text-white mt-4 p-2 rounded text-md' onClick={() => handleDelete(advert._id, true)}>Delete</button>
          </div>
        )) : 
          <p>No adverts</p>
        }
      </div>
      <div className="flex flex-wrap mx-auto">
        <h2 className="text-3xl text-center w-full font-semibold mt-8 mb-4 ">Pending Adverts</h2>
        <div className="grid grid-cols-3 gap-4 mx-4">
          {advertisements.length > 0 ? advertisements.map((advertisement) => (
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
                <button onClick={() => handleReject(advertisement._id, true)}>Reject</button>
              </div>
            </div>
          )) : 
            <p>No pending Adverts</p>
          }
      </div>

      </div>
      
      <CustomDialog
        isOpen={isDialogOpen}
        title="Advertisement Action"
        message={dialogMessage}
        onClose={closeModal}
      />
    </div>
  );
};

export default AdminAdvertisements;
