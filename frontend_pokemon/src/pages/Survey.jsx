import { useState } from 'react';

function Survey({ addPokemonToMyPokeball }){ //Destructure and pass in prop
  const [selectedMood, setSelectedMood] = useState(''); //State for mood selection
  const [pokemon, setPokemon] = useState(null); //State for Pokemon
  const [isSubmitted, setIsSubmitted] = useState(false); //Track from submission

  //Define the mapping of moods to Pokemon types
  const moodToPokemonType = {
    happy: 'fairy',
    sad: 'ghost',
    mad: 'fighting',    
    lonely: 'dark',
    excited: 'electric',
    stressed: 'psychic',
    frustrated: 'rock',    
    motivated: 'fire',
    relaxed: 'water',
    bored: 'normal',
  };

  //Handler for mood selection change
  function handleMoodChange(e){
    setSelectedMood(e.target.value);
  }

  //Fetch Pokemon based on the selected mood
  async function handleSubmit(e){
    e.preventDefault();
    if (!selectedMood) return;  //No mood selected, do nothing

    const pokemonType = moodToPokemonType[selectedMood];
    setPokemon(null); //Reset previous Pokemon data
    setIsSubmitted(true); //Mark the form as submitted

    //Error handling
    try {
      //Fetch Pokemon based on type
      const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);  
      const data = await response.json();

      console.log(data)

      //Choose random Pokemon from that type
      const randomPokemonIndex = Math.floor(Math.random() * data.pokemon.length);
      const pokemonUrl = data.pokemon[randomPokemonIndex].pokemon.url;

      //Fetch data of the chosen Pokemon
      const pokemonDataResponse = await fetch(pokemonUrl);
      const pokemonData = await pokemonDataResponse.json();

      //Set the fetched Pokemon data
      setPokemon(pokemonData);
      alert(`Congrats! You caught...`)

      addPokemonToMyPokeball(pokemonData); //Add Pokemon to MyPokeball

    } catch (err) {
      console.error(err)
    }
  };    
  
  return (
    <div>
      {/* If form is not submitted, display.. */}
      {!isSubmitted ? (
        <>
          <h2>Which best describes your current mood?</h2>

          {/* Survey form */}
          <form onSubmit={handleSubmit}>
            <div>
              {Object.keys(moodToPokemonType).map((mood) => (
                <label key={mood}>
                  <input type="radio"
                    name="mood"
                    value={mood}
                    onChange={handleMoodChange}
                    checked={selectedMood === mood}/>
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </label>
              ))}
            </div>

            <button type="submit">Catch Pokémon</button>
          </form>
        </>
      ) : (
        // Once form is submitted, display... 
        <>
          <div>
            {pokemon ? (
              <>
                <img src={pokemon.sprites.other.home.front_default}
                  alt={pokemon.name}
                  style={{ width: '250px', height: 'auto' }} />
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
              </>
            ) : (<p>Catching your Pokémon...</p>)}
          </div>
        </>
      )}
    </div>
  );
};

export default Survey;