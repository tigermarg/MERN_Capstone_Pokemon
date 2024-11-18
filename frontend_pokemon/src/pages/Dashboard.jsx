//Imports
import NavBar from '../components/dashboard/NavBar';

export default function Dashboard(){

    return(
        <div>
        <NavBar />
  
        <h1>Welcome</h1>
        <p>Access to dashboard...</p>
  
        {/* Log Out button */}
        <button onClick={() => alert('Logged Out!')}>Log Out</button>
      </div>
    )
}