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
                console.log(data);
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
                    
                        if (userDetails[0].role === role) {
                            if (role === 'Vendor' && userDetails[0].status === 'approved') {
                                if (userDetails[0].payment==="pendding"){
                                    return "pendingPayment"
                                }
                                setAuthToken(data.token);
                                localStorage.setItem('authToken', data.token);
                                setIsAuthenticated(true);
                                return "vendorLogin";
                            } else if(role==="Vendor" && userDetails[0].status==='pendding'){
                                return "vendorPending";
                            }
                            else if (role === 'Buyer') {
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
