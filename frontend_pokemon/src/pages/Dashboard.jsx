//Imports
import { useAuth } from '../contexts/auth_context';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/dashboard/NavBar';

export default function Dashboard(){
  const { logout } = useAuth(); 
  const nav = useNavigate();

  //Handler for log out click event
  function handleLogOut(e){
    logout();
    nav('/'); //Redirect to main page at logout
  }

    return(
      //Navigation bar
        <div>
        <NavBar />
  
        <h1>Welcome</h1>
        <p>Access to dashboard...</p>

        {/* Log Out button */}
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    )
}