import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export default function AuthProvider ({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies();  //Hook to get and set cookies

    //Login POST fetch request to backend
    const login = async(formData) => {
      try {
        let res = await fetch('http://localhost:3000/api/auth', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), //Send form data as JSON
        });
    
        //If res is not ok, throw an error
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.errors[0].msg || 'Something went wrong');
        }
    
        //If login is successful, extract the token and set it in cookies
        let data = await res.json();

        //If a token is returned in the response, save token to cookies
        setCookie('token', data.token);

      } catch (err) {
        console.error(err);
        throw err; //Rethrow the error so that it can be caught in the handleSubmit function
      }
    };

    //Sign up POST request to backend
    const signUp = async (formData) => {
      try {
          let res = await fetch('http://localhost:3000/api/users', {  
             method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), //Send formData as JSON
          });
        
        //If res is not ok, throw an error
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.errors?.[0]?.msg || 'Something went wrong!');
        }

        // If signUp is successful, get the data from the response
          let data = await res.json();

        //If a token is returned in the response, save token to cookies
        setCookie('token', data.token); 
            
      } catch (err) {
        console.error(err);
        throw err; //Rethrow the error so that it can be caught in the handleSubmit function
      }
    }
    
    //Logout function to remove token from cookies
    const logout = () => {
        ['token'].forEach((cookie) => {
            removeCookie(cookie)
        })
    }

    //useMemo hook to memoize context value to avoid unnecessary re-renders
    const value = useMemo(() => ({
        cookies,  //access to cookies
        login,  //function to login user
        logout, //function to logout user
        signUp, //function to signUp user
    }), [cookies])  //Dependencies //only re-run when cookies change

    //Wrap children components with AuthContext.Provider and pass context value
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//Custom hook to use authentication context in other components
export function useAuth(){
    return useContext(AuthContext);
}