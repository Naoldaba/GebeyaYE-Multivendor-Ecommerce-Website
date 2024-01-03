import { useState, useContext, useEffect } from "react";
import feedback from "../utils/feedback.avif";
import { AuthContext } from "../components/AuthContext";

const ContactForm = () => {
    const [questions, setQuestions] = useState(["whyme, why them","what is gebeyaye" ]);
    const [adminAnswers, setAdminAnswers] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingAnswers, setLoadingAnswers] = useState(false);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
    const {userType, authToken}=useContext(AuthContext);


    // Gebeyaye QA api
    const API_URL = ''; 

    const sendQuestion = async (question) => {
        console.log("hello")
        setQuestions([...questions, question])
        try {
            const response = await fetch(`${API_URL}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify(questions),
            });

            if (!response.ok) {
                alert('Error while sending the question.')
                throw new Error("Couldn't send question")
            } 
            
            alert('question succesfully sent')
            
        } catch (error) {
            console.error('Error sending question:', error);
        };
    }

    const sendAnswer = async (index, answer) => {
        const updatedAnswers = [...adminAnswers];
        updatedAnswers[index] = answer;
        setAdminAnswers(updatedAnswers);
        try {
            console.log({index, answer})
            const response = await fetch(`${API_URL}/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminAnswers), // Send the index of the question along with the answer
            });

            if (!response.ok) {
                throw new Error('Failed to send answer');
            }

            

        } catch (error) {
            console.error('Error sending answer:', error);
            // Handle error, maybe display an error message to the user
        }
    };

    const fetchQuestions = async () => {
        try {
            setLoadingQuestions(true);
            const response = await fetch(`${API_URL}/questions`);

            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }

            const data = await response.json();
            setQuestions(data || []);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoadingQuestions(false);
        }
    };


    // Function to fetch answers
    const fetchAnswers = async () => {
        try {
            setLoadingAnswers(true);
            const response = await fetch(`${API_URL}/answers`);

            if (!response.ok) {
                throw new Error('Failed to fetch answers');
            }

            const data = await response.json();
            setAdminAnswers(data || []);
        } catch (error) {
            console.error('Error fetching answers:', error);
        } finally {
            setLoadingAnswers(false);
        }
    };

    const handleQuestionSubmit = (question) => {
        setQuestions([...questions, question]);
    };

    const handleAdminAnswer = (index, answer) => {
        const updatedAnswers = [...adminAnswers];
        updatedAnswers[index] = answer;
        setAdminAnswers(updatedAnswers);
    };

    const handleAdminAnswerSubmit = () => {
        if (selectedQuestionIndex !== null && adminAnswers[selectedQuestionIndex] !== undefined) {
            handleAdminAnswer(selectedQuestionIndex, adminAnswers[selectedQuestionIndex]);
            // Send the answer to the backend if needed
            sendAnswer(selectedQuestionIndex, adminAnswers[selectedQuestionIndex]);

            const textarea = document.querySelector('.admin-textarea'); // Add a class to the textarea for easier selection
            if (textarea) {
                textarea.value = ''; // Reset the textarea value to empty
            }

            setSelectedQuestionIndex(null);
        }
    };
    

    useEffect(() => {
        fetchQuestions();
        fetchAnswers();
    }, []);

    return (
        <div className="flex justify-around items-center">
            <div className="hidden lg:block w-1/2">
                <h1 className="text-3xl font-bold">Contact the admins of <span className="text-blue-500">GebeyaYE</span></h1>
                <img src={feedback} className="w-full" alt="Feedback" />
            </div>
            <div className="justify-self-center rounded shadow-2xl p-6 bg-white w-1/2 lg:w-1/3 min-w-max my-6">
                <div className="border rounded p-4 h-80 overflow-y-auto">
                    {/* Display chat-like questions and answers */}
                    <h2 className="text-xl font-bold mb-6">Questions and Answers</h2>
                    {userType!=="Admin" && questions.map((q, index) => (
                        <div key={index} className={`mb-4 ${userType === 'Admin' ? 'flex justify-end' : 'flex justify-start'}`}>
                            <div className={`bg-gray-200 rounded p-2 ${userType === 'Admin' ? 'bg-blue-200' : 'bg-gray-300'}`}>
                                <p className="text-sm">{q}</p>
                            </div>
                        </div>
                    ))}
                    {userType === 'Admin' && adminAnswers.map((answer, index) => (
                        <>
                            <h2>Answer for question-{index+1}</h2>
                            <div key={index} className="flex justify-end mb-4">
                                <div className="bg-blue-200 rounded p-2">
                                    <p className="text-sm">{answer}</p>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                
                {userType === 'Admin' && questions.map((q, index) => (
                    <>
                        <h2>Question-{index+1}</h2>
                        <div key={index} onClick={() => setSelectedQuestionIndex(index)} className="cursor-pointer">
                            <div className={`mb-4 ${userType === 'Admin' ? 'flex justify-end' : 'flex justify-start'}`}>
                                <div className={`bg-gray-200 rounded p-2 ${userType === 'Admin' ? 'bg-blue-200 hover:bg-blue-700' : 'bg-gray-300'}`}>
                                    <p className="text-sm">{q}</p>
                                </div>
                            </div>
                        </div>
                    </>
                ))}

                {/* Input for answering questions (for admin) */}
                {userType === 'Admin' && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAdminAnswerSubmit();
                    }} className="mt-4">
                        <textarea
                            value={selectedQuestionIndex !== null ? adminAnswers[selectedQuestionIndex] || '' : ''}
                            onChange={(e) => {
                                if (selectedQuestionIndex !== null) {
                                    const updatedAnswers = [...adminAnswers];
                                    updatedAnswers[selectedQuestionIndex] = e.target.value;
                                    setAdminAnswers(updatedAnswers);
                                    
                                }
                            }}
                            className="rounded bg-gray-200 p-2 w-full"
                            placeholder="Type your answer"
                        />
                        <button
                            type="submit"
                            className="mt-2 bg-blue-500 border-none p-2 rounded text-white"
                        >
                            Send
                        </button>
                    </form>
                )}

                {userType !== 'Admin' && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const newQuestion = e.target.elements.question.value;
                        handleQuestionSubmit(newQuestion);
                        e.target.elements.question.value = '';
                        sendQuestion(newQuestion);
                    }}>
                        <input
                            type="text"
                            className="rounded bg-gray-200 p-2 w-full mt-4"
                            placeholder="Type your question?"
                            name="question"
                        />
                        <button
                            type="submit"
                            className="block mt-4 bg-blue-500 border-none p-2 w-full rounded text-white"
                        >
                            Ask
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
 
export default ContactForm;

