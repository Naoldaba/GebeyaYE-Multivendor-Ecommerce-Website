
import {useState, useEffect, useContext} from 'react';
import { AuthContext } from './AuthContext';

const RequestList = () => {

    const {authToken} = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
    
      const fetchRequests = async () => {
        try {
          const response = await fetch('http://127.0.0.1:3000/api/user', {
            method: "GET",
            headers: {
              'authToken': authToken,
              'Content-Type': 'application/json'
            },
            signal: signal 
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch requests');
          }
          
          const data = await response.json();
          console.log(data)
          const filteredRequests = data.filter(request => request.status !== "approved");
          setRequests(filteredRequests); 
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Request was aborted');
          } else {
            console.error('Error fetching requests:', error);
          }
        }
      };
    
      fetchRequests();
    
      return () => {
        abortController.abort();
      };
    }, [authToken]);
  
      
      
      

    const handleApprove = async (requestId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/changePendding/${requestId} `, {
                method: 'PUT',
                headers: {
                  'authToken': authToken,
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
            <h2 className='text-3xl font-semibold text-center my-12'>Requests</h2>
            {requests.map((request, ind) => (
                <div key={ind} className='p-3 shadow-2xl mx-6 my-20'>
                    <form className='flex flex-wrap items-center' onSubmit={()=>handleApprove(request._id)}>
                      {console.log(request.licence)}
                        <img src={request.licence} alt="Profile" className='w-1/2' />
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
                                <p>{request.phone}</p>
                            </div>
                            
                            <div className='mb-4'>
                                <p>Address:</p>
                                <p>{request.address}</p>
                            </div>
                            <div className='mb-4'>
                                <p>Account Number:</p>
                                <p>{request.accountNumber}</p>
                            </div>
                            <div>
                                <p>Selected Package:</p>
                                {request.isPremium ? (
                                  <p>Premium</p>
                                ): (
                                  <p>Regular</p>
                                )}
                            </div>
                        </div>
                        <button className='bg-blue-500 text-white p-2 w-36'>Approve</button>
                    </form>
                    
                    
                </div>
                ))}

        </div>
    );
}
 
export default RequestList;