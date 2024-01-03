
import {useState, useEffect, useContext} from 'react';
import toy from '../utils/toy.jpg'
import { AuthContext } from './AuthContext';

const RequestList = () => {

    const {authToken} = useContext(AuthContext);
    const [requests, setRequests] = useState([{
        name:"Naol Daba Mulleta",
        email:"nahafile@gmail.com",
        password:"abcdefgh",
        phoneNum:"0920375653",
        address:"Arada",
        accountNum:'1000307059774',
        package: 'Regular',
        licence: toy,
        profilePic: toy
    }]);

    useEffect(() => {
        
        const fetchRequests = async () => {
          try {
            const response = await fetch('your_api_endpoint_here', {
                headers:{
                    Autherization: `Bearer ${authToken}`
                }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch requests');
            }
            const data = await response.json();
            setRequests(data); 
          } catch (error) {
            console.error('Error fetching requests:', error);
          }
        };
    
        fetchRequests(); 
      }, []);

    const handleApprove = async (requestId) => {
        try {
            const response = await fetch(`your_approve_endpoint/${requestId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({status: "approved"}),
            });

            if (response.ok) {
                
                console.log(`Vendor with ID ${requestId} has been approved`);
            } else {
                console.error('Approval failed');
            }
        } catch (error) {
            console.error('Error during approval:', error);
        }
    };

    return (
        <div>
            <h2 className='text-4xl text-center my-12'>Requests</h2>
            {requests.map((request, ind) => (
                <div key={ind} className='p-3 shadow-2xl mx-6 my-20'>
                    <div className='flex flex-wrap  items-center'>
                        <img src={request.profilePic} alt="Profile" className='w-1/2' />
                        <div>
                            <div className='mb-4'>
                                <p>Name:</p>
                                <p>{request.name}</p>
                            </div>
                            <div className='mb-4'>
                                <p>Email:</p>
                                <p>{request.email}</p>
                            </div>
                            <div className='mb-4'>
                                <p>Phone Number:</p>
                                <p>{request.phoneNum}</p>
                            </div>
                            
                            <div className='mb-4'>
                                <p>Address:</p>
                                <p>{request.address}</p>
                            </div>
                            <div className='mb-4'>
                                <p>Account Number:</p>
                                <p>{request.accountNum}</p>
                            </div>
                            <div>
                                <p>Selected Package:</p>
                                <p>{request.package}</p>
                            </div>
                            {/* <img src={request.licence} className='block' /> */}
                        </div>

                    </div>
                    
                    <button onClick={()=>handleApprove(request.id)} className='bg-blue-500 text-white p-2 w-36 mx-auto'>Approve</button>
                </div>
                ))}

        </div>
    );
}
 
export default RequestList;