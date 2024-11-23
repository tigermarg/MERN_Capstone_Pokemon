//Imports
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import pokeball from './styles/pokeball.jpg';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Survey from './pages/Survey';
import Pokeball from './pages/Pokeball';
import Account from './pages/Account';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  const [myPokeball, setMyPokeball] = useState([]); //State to hold Pokemon
  const nav = useNavigate(); //Declare variable for useNavigate

  //Function to add Pokemon to Pokeball
  function addPokemonToMyPokeball(pokemon){
    setMyPokeball((prevPokemons) => [
      ...prevPokemons, 
      pokemon,
    ])}
  
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
          <h1 style={{ fontFamily: 'Pokemon' }}>Your PokéPal awaits!</h1>
          <br/>   
          <h3>Fetch a Pokémon to match your mood...</h3>
          <h3>Click the Pokéball to see who you catch today!</h3>
          <img className="pokeball" onClick={handleClick} src={pokeball} alt="Pokeball" style={{ width: '30vw', height: 'auto' }} />          
        </>
        } />
        <Route path='/login' element={<Login />} style={{ animation: 'none' }}/>
        <Route path='/signup' element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path="/survey" element={<Survey addPokemonToMyPokeball={addPokemonToMyPokeball} />} />
        <Route path="/pokeball" element={<Pokeball pokemons={myPokeball} />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  )
}

export default App