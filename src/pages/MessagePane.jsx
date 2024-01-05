import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

const MessagePage = ({ userType, userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const {authToken} = useContext(AuthContext);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`your-api-endpoint/messages/${userType}/${userId}`);
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

        fetchMessages();
    }, [userType, userId]);

    const sendMessage = async () => {
        try {
            const response = await fetch('your-api-endpoint/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': authToken
                },
                body: JSON.stringify({
                    sender: userId,
                    // receiver: adminId, 
                    content: newMessage,
                }),
            });

            if (response.ok) {
                // Message sent successfully
                setNewMessage('');
                // Optionally, refresh message list after sending
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-200 text-gray-700 p-4">
                    <h1 className="text-xl font-semibold">Messages</h1>
                </div>
                <div className="px-4 py-2 flex flex-col h-80 overflow-auto">
                    {/* Render message threads */}
                    {messages.map((message) => (
                        <div key={message._id} className="border-b py-2">
                            {/* Render message details */}
                            <p className="text-gray-600">{message.content}</p>
                            <p className="text-xs text-gray-500">{message.timestamp}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-200 p-4">
                    {/* Render message input */}
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full border rounded-lg py-2 px-4"
                        placeholder="Type your message here..."
                    />
                    <button
                        onClick={sendMessage}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagePage;
