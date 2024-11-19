//Imports
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import pokeball from './styles/pokeball.jpg';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Survey from './pages/Survey';
import Pokeball from './pages/Pokeball';

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
        <Route path="/survey" element={<Survey/>} />
        <Route path="/pokeball" element={<Pokeball/>} />
      </Routes>
    </div>
  )
}

export default App
