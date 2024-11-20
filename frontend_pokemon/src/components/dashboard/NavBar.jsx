//Imports
import { Link } from 'react-router-dom';

export default function NavBar(){
    return(
        //Links to Suvey and MyPokeball
        <nav>
            <ul className='nav-links'>
                <li><Link to="/survey">Catch Pokemon</Link></li>
                <li><Link to="/pokeball">My Pokeball</Link></li>
            </ul>
        </nav>
    )
}