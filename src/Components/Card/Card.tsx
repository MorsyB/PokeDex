import React, { useEffect, useState } from "react";
import Pokemon from "../../Services/Pokemon";
import "./Card.css";

function capitalizeFirstLetter(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

function Card(props:Pokemon) {

    const [pokemon, setPokemon] = useState<any>("");
    // Function to collect data
    const getApiData = async () => {
      try {
        const response = await fetch(props.url).then((response) =>
          response.json()
        );
  
        // update the state
        setPokemon(response);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getApiData();
    }, [pokemon]);

    const redirect = () =>{
      window.location.href = "/details/" + pokemon.id;
    };
  
    return (
      <div onClick={redirect} className="card">
        <p className="pokeId">#{pokemon && ('000'+pokemon.id).slice(-3)}</p>
        <div className="forPokeID">
        <img src={pokemon && pokemon.sprites.front_default} />
        <p className="pokeName">
          {pokemon && capitalizeFirstLetter(pokemon.name)}
        </p>
        </div>
      </div>
    );
}

export default Card;
