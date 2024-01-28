import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import {useHistory} from 'react-router-dom';

const AdminAdvertisements = () => {

    const [advertisements, setAdvertisements] = useState([]);
    const [allAds, setAllAds]= useState([]);
    
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
        setAdvertisements(advertisements.filter((ad) => ad._id !== advertisementId));
        history.push('/admindashboard')
      } catch (error) {
        console.error('Error updating advertisement approval:', error);
      }
    };

    const handleReject = async (advertisementId, rejected) => {
      
        fetch(`http://localhost:3000/api/advert/${advertisementId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authToken': authToken,
          },
          body: JSON.stringify({rejected})
          
        })
        
        .then((response)=>{
          if (!response.ok) {
            throw new Error('Failed to update advertisement approval');
          }
          alert('Advert rejected successfully');
          
          setAdvertisements(advertisements.filter((ad) => ad._id !== advertisementId));
      
          history.push('/admindashboard');
        })
        .catch((error)=>{
          console.error('Error updating advertisement approval:', error);
        })
      
        
      
    };

    const handleDelete = async (adId, deleted) => {
      
        fetch(`http://localhost:3000/api/advert/${adId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authToken': authToken,
          },
          body: JSON.stringify({deleted})
        })
        
        .then((response)=>{
          console.log('geek');
          if (!response.ok) {
            throw new Error('Failed to update advertisement deletion');
          }
          alert('Advert deleted successfully');
          setAllAds(allAds.filter((ad) => ad._id !== adId));
          history.push('/admindashboard');
        })
        
        .catch((error)=>{
          console.error('Error updating advertisement approval:', error);
        })
      
        
      
    };
    

    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      console.log('guy');
    
      const fetchAdvertisements = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/advert', {
            headers: {
              'authToken': authToken,
            },
            signal: signal,
          });
          
          if (!signal.aborted) {
            console.log(authToken);
            if (!response.ok) {
              throw new Error('Failed to fetch advertisements');
            }
            const data = await response.json();
            setAdvertisements(data);
            console.log('bye');
          }
        } catch (error) {
          if (!signal.aborted) {
            console.error('Error fetching advertisements:', error);
          }
        } 
      };
    
      const fetchAllAdvertisements = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/advert/all', {
            method: "GET",
            headers:{
              'authToken': authToken,
            },
            signal: signal
          });
          
          if (!signal.aborted) {
            if (!response.ok) {
              throw new Error('Failed to fetch advertisements');
            }
            const data = await response.json();
            setAllAds(data);
            console.log('hi');
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
    }, []); 
    
  

  return (
    <div className="flex flex-wrap mx-auto">
      <h2 className="text-3xl text-center w-full font-semibold mt-8 mb-4 ">All Advertisements</h2>
        <div className="advertisements w-full mb-12 lg:mb-0 flex flex-wrap gap-14 items-center ml-6 ">
          {/* <h2 className='text-2xl font-semibold'>Advertisements</h2> */}
            {allAds.map((advert) => (
              <div key={advert._id} className="advertisement mb-2">
                <img src={advert.banner} alt={advert.content} className="advert-banner w-36" />
                <p>{advert.content}</p>
                <button className='bg-primary text-white mt-4 p-2 rounded text-md' onClick={() => handleDelete(advert._id, true)}>Delete</button>
              </div>
            ))}
        </div>
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
                <button onClick={() => handleReject(advertisement._id, true)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}



export default AdminAdvertisements;
