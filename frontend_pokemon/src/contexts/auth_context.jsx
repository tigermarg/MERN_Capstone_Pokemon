//Imports
import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export default function AuthProvider ({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies();  //Hook to get and set cookies

//POST request using fetch for login
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

//POST request using fetch for sign up 
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

//GET request using fetch for user info
    const userInfo = async () => {
      try {
        const token = cookies.token; //Access token from cookies
        
        //If no token, throw error
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await fetch('http://localhost:3000/api/auth', {
          method: 'GET',
          headers: {
            'x-auth-token': token, //Send token in auth header
          },
        });
        
        //If response is not ok, throw error
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const data = await response.json(); //Parse JSON response from api

        return data; //Return user data

      } catch (err) {
        console.error(err);
      }
    };

//PUT request using fetch to update user profile
    const updateProfile = async (formData) => { //formData parm from UpdateProfileForm
      try {
        const token = cookies.token; //Access the token from cookies

        //If no token, throw error
        if (!token) {
          throw new Error('No token found');
        }
    
        const res = await fetch(`http://localhost:3000/api/auth/${cookies.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token, //Send token for authorization
          },
          body: JSON.stringify(formData), //Send form data (password) in the request body
        });
    
        const data = await res.json();  //Parse JSON response from api

        //If response is not ok, throw error
        if (!res.ok) {
          throw new Error(data.errors?.[0]?.msg || 'Failed to update profile');
        }
    
        return data; //Return the success message or updated data
    
      } catch (err) {
        console.error(err);
        throw err; //Rethrow the error so that it can be caught in the handleSubmit function
      }
    };

//DELETE request using fetch to delete account
    const deleteAccount = async () => {
      try {

        const token = cookies.token;  //Access token from cookies

        //If no token, throw an error
        if (!token) {
          throw new Error('No token found');
        }
    
        const res = await fetch(`http://localhost:3000/api/auth/${cookies.userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token, //Send token for authorization
          },
        });

        const data = await res.json();  //Parse JSON response from api

        //If response is not ok,
        if (!res.ok) {
          throw new Error(data.errors ? data.errors[0].msg : 'Failed to delete account');
        }
    
        return data;  //Return success message or data from the response

      } catch (err) {
        console.error(err);
        throw err; //Rethrow the error to be handled in the component
      }
    }

    //useMemo hook to memoize context value to avoid unnecessary re-renders
    const value = useMemo(() => ({
        cookies,  //access to cookies
        userInfo, //function to get user info
        login,  //function to login user
        logout, //function to logout user
        signUp, //function to signUp user
        updateProfile, //function to update user info
        deleteAccount, //function to delete account
    }), [cookies])  //Dependencies //only re-run when cookies change

    //Wrap children components with AuthContext.Provider and pass context value
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//Custom hook to use authentication context in other components
export function useAuth(){
    return useContext(AuthContext);
}