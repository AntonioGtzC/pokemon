import React, {useEffect, useState, memo, useMemo} from 'react'


const PokemonData = ({url, name, index}) => {

    const [pokemon,setPokemon] = useState(undefined)

    useEffect(() => {
        async function obtenerPokemon() {
          const response = await fetch(url);
          const data = await response.json();
          console.log("pokemonData",data)
          setPokemon(data);
       
        
    
        }
    
        obtenerPokemon();
      }, [url, name, index]);

      const pokemonImage = useMemo(() => {
        return pokemon?.sprites.front_default
      }, [pokemon])
  return (
    <div>
        <p>{name}</p>
        <p>{index}</p>
        {pokemon && <img src={pokemonImage} />}
        
    </div>
  )
}

export default memo(PokemonData)