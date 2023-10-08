import React, { useState, useEffect } from "react";
import PokemonData from "./PokemonData";

const Pokemones = () => {
  const [pokemones, setPokemones] = useState([]);
  const [anterior, setAnterior] = useState(null);
  const [siguiente, setSiguiente] = useState(null);
  const [actual, setActual] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  const [isOpen, setisOpen] = useState(false);
  const [pokemon, setPokemon] = useState(undefined)

  const handlePokemonClick = (pokemon,index) => {
    setisOpen(true)
    setPokemon({...pokemon,index})
  }

  useEffect(() => {
    async function obtenerPokemones() {
      const response = await fetch(actual);
      const data = await response.json();
      console.log(data);
      setPokemones(data.results);
      setAnterior(data.previous);
      setSiguiente(data.next);

    }

    obtenerPokemones();
  }, [actual]);

  return (
    <div>
      <ul>
        {pokemones.map((pokemon, index) => {
          return <li key={index} onClick={() => handlePokemonClick(pokemon,index)}>{pokemon.name} </li>;
        })}
      </ul>
      <button onClick={() => anterior !== null && setActual(anterior)}>
        Anterior
      </button>
      <button onClick={() => siguiente !== null && setActual(siguiente)}>
        Siguientes
      </button>
      {isOpen && <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          top: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ backgroundColor: "white", width: "50%", height: "70%" }}>
          <h1>modal</h1>
          <p onClick={() => setisOpen(false)}>close</p>
          {pokemon && <PokemonData url={pokemon.url} name={pokemon.name} index={pokemon.index}/>}
        </div>
      </div>}
    </div>
  );
};

export default Pokemones;
