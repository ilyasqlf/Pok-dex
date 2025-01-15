// src/components/Pokedex.js
import React from 'react';
import usePokemon from '../Hooks/usePokemon';

const Pokedex = () => {
  const { pokemon, loading, error } = usePokemon(10);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {pokemon.map((poke, index) => (
          <li key={index} className="pokemon-item">
            <h2>{poke.name}</h2>
            <img src={poke.image} alt={poke.name} />
            <div className="types">
              <strong>Types :</strong>
              {poke.types.length > 0 ? poke.types.map((type) => (
                <span key={type} type={type}>{type}</span>
              )) : 'Aucun type'}
            </div>
            <div className="moves">
              <strong>Mouvements :</strong>
              {poke.moves.length > 0 ? poke.moves.map((move) => (
                <span key={move}>{move}</span>
              )) : 'Aucun mouvement'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pokedex;
