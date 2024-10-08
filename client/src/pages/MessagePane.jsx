import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import CustomDialog from "../components/CustomDialog";

const MessagePage = ({ userType, userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { authToken } = useContext(AuthContext);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState({ title: '', message: '' });
    const history = useHistory();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`https://gebeyaye-backend.vercel.app/api/message/myinbox`, {
                    method: "GET",
                    headers: {
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

        fetchMessages();
    }, [userType, userId, authToken]);

    const sendMessage = async () => {
        try {
            const response = await fetch('https://gebeyaye-backend.vercel.app/api/message/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': authToken
                },
                body: JSON.stringify({
                    receiver: "Admin",
                    content: newMessage,
                }),
            });

            if (response.ok) {
                setNewMessage('');
                setDialogMessage({ title: 'Success', message: 'Message successfully sent!' });
                setDialogOpen(true);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error(error);
            setDialogMessage({ title: 'Error', message: 'Please log in first.' });
            setDialogOpen(true);
            history.push('/login');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen gap-32">
            <div className='hidden lg:block'>
                <h2 className='text-6xl mb-14'>Contact US</h2>
                <div className='text-xl'>
                    <p>Our address is: King George VI St</p>
                    <p>Email: nahafile@gmail.com</p>
                    <p>Phone: +251-920-375-653</p>
                    <div className='flex mt-10'>
                        <FaTelegram data-testid='telegram-icon' className="social-icons" color="#672301DE" fontSize="40px" />
                        <FaInstagram data-testid='instagram-icon' className="social-icons" color="#672301DE" fontSize="40px" />
                        <BiLogoGmail data-testid='gmail-icon' className="social-icons" color="#672301DE" fontSize="40px" />
                    </div>
                </div>
            </div>
            <div className='w-1/2 text-xl'>
                <p className='mb-6'>Empowering Your Shopping Experience, One Click at a Time!</p>
                <div className="bg-white shadow-lg rounded-lg border-4 overflow-hidden max-w-lg">
                    <div className="bg-gray-200 text-gray-700 p-4">
                        <h1 className="text-xl font-semibold">Messages</h1>
                    </div>
                    <div className="px-4 py-2 flex flex-col h-80 overflow-auto">
                        {messages.map((message) => (
                            <div key={message._id} className="border-b py-2 my-3">
                                <p className="text-xs text-gray-500">{message.timestamp}</p>
                                <p className="text-gray-600">You- {message.content}</p>
                                {message.reply && (
                                    <p className="text-gray-600">Admin- {message.reply}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-200 p-4">
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
            <CustomDialog
                isOpen={dialogOpen}
                title={dialogMessage.title}
                message={dialogMessage.message}
                onClose={() => setDialogOpen(false)}
            />
        </div>
    );
};

export default MessagePage;