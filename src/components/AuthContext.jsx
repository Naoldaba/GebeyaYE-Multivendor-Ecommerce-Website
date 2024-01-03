import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [userType, setUserType] = useState(null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
    const [userId , setUserID] = useState(null)

    const login = async (name, password) => {
        try {
            const response = await fetch('http:localhost/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({
                    name,
                    password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAuthToken(data.token);
                localStorage.setItem('authToken', data.token);
                setIsAuthenticated(true);

                const decodedToken= jwt_decode(data.token);
                setUserID(decodedToken.userId);
                return true
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
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, setUserType, userType, authToken }}>
            {children}
        </AuthContext.Provider>
    );
};
