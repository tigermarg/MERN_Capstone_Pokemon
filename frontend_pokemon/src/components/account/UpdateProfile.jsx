//Imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth_context';

function UpdateProfileForm() {
  const [formData, setFormData] = useState({ password: '' }); //State for form data
  const [error, setError] = useState(null); //State for error handling
  const [message, setMessage] = useState(null); //State for success message
  const [user, setUser] = useState(null); //State to store user data

  const { cookies, updateProfile, userInfo } = useAuth(); // Extract from context
  const nav = useNavigate(); //Navigation hook

  //Fetch user info when the component mounts/token changes
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (cookies.token) {  //If token exists,
        try {
          const userData = await userInfo(); //Fetch user data
          setUser(userData); //Set the user data in state

        } catch (err) { //Error handling if fetching data fails
          setError('Failed to fetch user data');
        }
      }
    };
    
    fetchUserInfo();  //Invoke function
  }, [cookies.token, userInfo]); //Dependency--only re-run if token or userInfo function changes

  //Handler for input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Handler for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); //Reset any previous errors
    setMessage(null); //Reset any previous success messages

    try {
      const data = await updateProfile(formData); //Call the updateProfile function from context
      setMessage(data.msg); //Show success message

      //Navigate to the login page after successful update
      setTimeout(() => { nav('/login'); }, 2000); // 2 seconds delay to allow success message to be shown

    } catch (err) {
      setError(err.message || 'Failed to update profile'); //If update fails, set error message
    }
  };

  //If user data is not loaded yet, show loading state
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Display user info*/}
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      {/* Password field to change password */}
      <div>
        <label>Change Password:</label>
        <input style={{ width: '20em', borderRadius: "4px", height: "1.5em", borderColor: "silver"}} type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button style={{ backgroundColor: "#fcfbfb8f", color: "#2b8d08", border: "none" }} type="submit">Update</button>
      
      {/* Display error/success message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </form>
  );
}

export default UpdateProfileForm;

