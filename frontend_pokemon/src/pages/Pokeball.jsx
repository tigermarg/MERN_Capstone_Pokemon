export default function MyPokeball({ pokemons }) { //Destructure and pass in pokemons prop
    return (
      //Conditional Rendering
      <div>
      <h2>I Choose...</h2>
      {pokemons.length === 0 ? ( //If Pokeball is empty, display...
        <p>Your Pokeball is empty. Gotta catch 'em all...</p>
      ) : (
        //If not, render...
        <div> 
          {pokemons.map((pokemon, index) => (
            <div key={index}>
                <img src={pokemon.sprites.other.home.front_default}
                  alt={pokemon.name}
                  style={{ width: '250px', height: 'auto' }} />
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
    );
  }