import React from 'react';

export default function MyPokeball({ pokemons }) {
  return (
    <div>
      <h1>I Choose...</h1>

      {pokemons.length === 0 ? ( <p>Your Pokéball is empty. Unleash a PokéPal!</p> ) : (

        //Add pokemons to Pokeball...
        <div className="pokemon-container">
          {pokemons.map((pokemon, index) => (
            <div key={index} className="pokemon-card">
              <div className="pokemon-info">
                <img src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}/>
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
              </div>

              {/* Hover Details */}
              <div className="pokemon-details">
                <p><strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}