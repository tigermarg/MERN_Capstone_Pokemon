//Imports
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import pokeball from './styles/pokeball.jpg';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const nav = useNavigate(); //Declare variable for useNavigate
  
  //Click and navigate to login page
  function handleClick(){
    nav('/login');
  }

  return (
    <div>
    {/* Create routes to pages */}
      <Routes>
        <Route path='/' element={
        <>
          <h2>Your Pokémon awaits!</h2>
          <h3>Match your mood with a Pokémon—Click the Pokéball to see who you catch today!</h3>
          <img className="pokeball" onClick={handleClick} src={pokeball} alt="Pokeball" style={{ width: '30vw', height: 'auto' }} />             
        </>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
