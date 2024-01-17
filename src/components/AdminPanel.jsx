import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

const AdminPanel = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [reply, setReply] = useState('');
    const {authToken} = useContext(AuthContext);

    useEffect(() => {
        const fetchMessagesForAdmin = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/message/inboxes',{
                    method:"GET",
                    headers:{
                        'authToken': authToken
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                } else {
                    throw new Error('Failed to fetch messages');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessagesForAdmin();
    }, []);

    const selectMessage = (message) => {
        setSelectedMessage(message);
        setReply('');
    };

    const sendReply = async () => {
        try {
            console.log(selectedMessage._id)
            const response = await fetch(`http://localhost:3000/api/message/sendreply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': authToken
                },
                body: JSON.stringify({
                    msg_id: selectedMessage._id,
                    reply:reply
                }),
            });

            if (response.ok) {
                alert('reply sent successfully!!')
                setReply('');
                setSelectedMessage(null);
            } else {
                throw new Error('Failed to send reply');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 w-2/3">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-800 text-white py-4 px-6">
                    <h1 className="text-2xl font-semibold">Admin Panel</h1>
                </div>
                <div className="flex">
                    <div className="w-1/3 border-r overflow-y-auto">
                        <ul>
                            {messages.map((message) => (
                                <li
                                    key={message._id}
                                    onClick={() => selectMessage(message)}
                                    className={`py-4 px-6 cursor-pointer ${
                                        selectedMessage?._id === message._id ? 'bg-gray-100' : ''
                                    }`}
                                >
                                    <p className="font-semibold">{message.sender}</p>
                                    <p className="text-sm text-gray-700 truncate">{message.content}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-2/3 p-6">
                        {selectedMessage && (
                            <div>
                                <h2 className="text-lg font-semibold mb-2">{selectedMessage.sender}</h2>
                                <p className="text-gray-700 mb-4">{selectedMessage.content}</p>
                                <textarea
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    className="w-full border rounded-lg py-2 px-4 mb-4"
                                    placeholder="Type your reply here..."
                                />
                                <button
                                    onClick={sendReply}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                                >
                                    Send Reply
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
