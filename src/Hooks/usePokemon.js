// src/hooks/usePokemon.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemon = (limit = 10) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Récupérer la liste des Pokémon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=150`);
        
        // Pour chaque Pokémon, récupérer les détails (types et mouvements)
        const pokemonData = await Promise.all(
          response.data.results.map(async (poke) => {
            const pokeDetails = await axios.get(poke.url);

            // Extraire les types et les mouvements
            const types = pokeDetails.data.types.map(type => type.type.name);
            const moves = pokeDetails.data.moves.slice(0, 5).map(move => move.move.name); // Limiter à 5 mouvements

            return {
              name: poke.name,
              image: pokeDetails.data.sprites.front_default,
              types: types,
              moves: moves
            };
          })
        );

        setPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        setError('Erreur de chargement des Pokémon');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [limit]); // Si le `limit` change, refait la requête

  return { pokemon, loading, error };
};

export default usePokemon;
