import { createContext, useState } from "react";
import {useHistory} from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [authToken, setAuthToken] = useState(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setIsAuthenticated(true);
            return storedToken;
        }
        return null;
    });
    const history = useHistory();
    
    const login = async (name, password, role) => {
        try {
            const response = await fetch('https://gebeyaye-backend.vercel.app/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    const userDetailsResponse = await fetch('https://gebeyaye-backend.vercel.app/api/user/me', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            "authToken": data.token
                        },
                    });
                    if (userDetailsResponse.ok){
                        const userDetails= await userDetailsResponse.json();
                        console.log(userDetails);
                        const loggedInUser = userDetails[0];
                        setUser(loggedInUser);
                        localStorage.setItem('user', JSON.stringify(loggedInUser)); 
                        if (loggedInUser.role === role) {
                            if (role === 'Vendor' && loggedInUser.status === 'approved') {
                                if (loggedInUser.payment === "pending") {
                                    return "pendingPayment";
                                }
                                setAuthToken(data.token);
                                localStorage.setItem('authToken', data.token);
                                setIsAuthenticated(true);
                                return "vendorLogin";
                            } else if(role === "Vendor" && loggedInUser.status === 'pending'){
                                return "vendorPending";
                            } else if (role === 'Buyer') {
                                setAuthToken(data.token);
                                localStorage.setItem('authToken', data.token);
                                setIsAuthenticated(true);
                                return "buyerLogin";
                            } else if (role === 'Admin') {
                                setAuthToken(data.token);
                                localStorage.setItem('authToken', data.token);
                                setIsAuthenticated(true);
                                return "adminLogin";
                            } 
                        } else {
                            return "roleMismatch";
                        }
                    }
                } else {
                    return "failedLogin";
                }
            } else {
                console.error('Authentication failed');
                return "failedLogin";
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            return "failedLogin";
        }
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user'); 
        setIsAuthenticated(false);
        setUserType(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, setUserType, userType, authToken, user }}>
            {children}
        </AuthContext.Provider>
    );
};
