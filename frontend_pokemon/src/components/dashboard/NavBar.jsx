//Imports
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth_context';

export default function NavBar(){

    const { logout } = useAuth(); //Get user data and logout from context
    const nav = useNavigate(); //Hook to navigate

    //Handler for log out
    function handleLogOut() {
        logout();
        nav('/'); //Redirect to main page at logout
    }

    return(
        //Links to Suvey and MyPokeball
        <nav>
            <ul className='nav-links'>
                <li className="li"><Link to="/survey">Catch PokéPal</Link></li>
                <li className="li"><Link to="/pokeball">My Pokéball</Link></li>
                <li className="li"><Link to="/account">Account</Link></li>
                <li className="li">
                    <button className="logout-btn" onClick={handleLogOut}>Log Out</button>       
                </li>
            </ul>
                 
        </nav>
    )
}