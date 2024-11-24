//Imports
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/auth_context';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/dashboard/NavBar';
import pokeball from '../styles/pokeball.jpg';

export default function Dashboard() {
  const [user, setUser] = useState(null); //State for user data

  const { userInfo } = useAuth(); //Get user data and logout from context
  const nav = useNavigate(); //Hook to navigate

  //Handler for click event
  function handleClick() {
    nav('/pokeball'); //Navigate to pokeball 
  }

  //Get user data when the component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {

        const data = await userInfo();  //Fetch user data using the userInfo function from context
        
        setUser(data);  //Set the user data in the state

      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };

    fetchUserInfo();
  }, [userInfo]);  //Re-run the effect if userInfo function changes

  //While user data is loading or isn't available...
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    //Navigation bar
    <div>
      <NavBar />
      <h1>Welcome, {user.name}!</h1>

      <img className="pokeball" onClick={handleClick} src={pokeball} alt="Pokeball"/>

    </div>
  );
}