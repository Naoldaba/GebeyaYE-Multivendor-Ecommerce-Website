import { createContext, useState } from "react";
import {useHistory} from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const [authToken, setAuthToken] = useState(() => {

        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setIsAuthenticated(true);
            return storedToken;
        }
        return null;
    });
    const history=useHistory();
    
    const login = async (name, password, selectedRole) => {
        try {
            const response = await fetch('http://127.0.0.1:3000/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data.token);
                if (data.token) {
                    if (selectedRole === 'Vendor') {
                        const getRequest = await fetch('http://127.0.0.1:3000/api/user/vendor', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "authToken": authToken
                            },
                            body:JSON.stringify({name:name})
                        });
                        if (getRequest.ok) {
                            const statusData = await getRequest.json();
                            console.log(statusData[0].status)
                            if (statusData[0].status === 'approved') {
                                setAuthToken(data.token);
                                localStorage.setItem('authToken', data.token);
                                setIsAuthenticated(true);
                                return true; 
                            } 
                            return false
                        } else {
                            console.error('Failed to fetch vendor status');
                            return false;
                        }
                    } else {
                        setAuthToken(data.token);
                        localStorage.setItem('authToken', data.token);
                        
                        setIsAuthenticated(true);
                        return true;
                    }
                } else {
                    return false;
                }
            } else {
                console.error('Authentication failed');
                return false;
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            return false;
        }
    };
    

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUserType(null);
        localStorage.removeItem('userType');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, setUserType, userType, authToken }}>
            {children}
        </AuthContext.Provider>
    );
};
