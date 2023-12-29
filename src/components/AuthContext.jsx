import { createContext,useState } from "react";

export const AuthContext =createContext();
export const AuthProvider=({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        // Simulating a successful login, setting isAuthenticated to true
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    );
};

