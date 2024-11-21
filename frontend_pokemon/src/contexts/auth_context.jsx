import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export default function AuthProvider ({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies();

    const login = async(formData) => {
        try {
            let res = await fetch('http://localhost:3000/api/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData), // Convert form data to JSON
            });
        
            let data = await res.json();
    
            setCookie('token', data.data.token)
            
          } catch (err) {
            console.error(err);
          }
        }

    const signUp = async (formData) => {
        try {
            let res = await fetch('http://localhost:3000/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData), // Convert form data to JSON
            });
        
            let data = await res.json();
    
            setCookie('token', data.data.token)
            
          } catch (err) {
            console.error(err);
          }
        }
    
    const logout = () => {
        ['token'].forEach((cookie) => {
            removeCookie(cookie)
        })
    }

    const value = useMemo(() => ({
        cookies,
        login,
        logout,
        signUp,
    }), [cookies])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    return useContext(AuthContext);
}