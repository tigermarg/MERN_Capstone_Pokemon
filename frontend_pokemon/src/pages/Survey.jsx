import { useState } from 'react';

function Survey({ addPokemonToMyPokeball }){ //Destructure and pass in prop
  const [selectedMood, setSelectedMood] = useState(''); //State for mood selection
  const [pokemon, setPokemon] = useState(null); //State for Pokemon
  const [isSubmitted, setIsSubmitted] = useState(false); //Track from submission
  const [pokemonPosition, setPokemonPosition] = useState({ x: 0, y: 0 }); //To track position

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
      alert(`Congrats! Your training begins now...`)

      addPokemonToMyPokeball(pokemonData); //Add Pokemon to MyPokeball

    } catch (err) {
      console.error(err)
    }
  };    
  
  //Mouse move function
  const handleMouseMove = (e) => {
    if (e.buttons === 1) {  //If the Pokemon image is being dragged (e.buttons = state of mouse buttons when e is triggered; 1 = left mouse button is pressed)
      setPokemonPosition((prevPosition) => ({
        x: prevPosition.x + e.movementX,
        y: prevPosition.y + e.movementY,
      }));
    }
  };
  
    return (
      //Track mouse movement //Set to full page
      <div onMouseMove={handleMouseMove}  className="survey-container">
        {!isSubmitted ? (
          <>
            <h2 style={{ marginLeft: '5%'}}>Which best describes your current mood?</h2>

            <form style={{ marginRight: '30%'}} onSubmit={handleSubmit}>
              <div>
                {Object.keys(moodToPokemonType).map((mood) => (
                  <label key={mood}>
                    <input type="radio"
                      name="mood"
                      value={mood}
                      onChange={handleMoodChange}
                      checked={selectedMood === mood}
                    />
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </label>
                ))}
              </div>
  
              <button type="submit">Catch Pokémon</button>
            </form>
          </>
        ) : (
          <>
            <div>
              {pokemon ? (
                <img src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  style={{
                    position: 'absolute', //Absolute positioning to allow free movement around page
                    top: `${pokemonPosition.y}px`, //Y positioning for movement
                    left: `${pokemonPosition.x}px`, //X positioning for movement
                    width: '250px', //Pokemon size
                    height: 'auto',
                    cursor: 'grab', //Indicate Pokemon is draggable
                  }}
                  draggable //Attribute set to true
                />
              ) : (
                <p style={{ fontSize: "1.5rem", textAlign: "center", marginTop:"6em" }}>Catching your Pokémon...</p>
              )}
            </div>
          </>
        )}
      </div>
    );
};

export default Survey;