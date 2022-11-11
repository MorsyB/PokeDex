import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Description from "../Components/Description/Description";
import PokedexIMG from "../Components/PokedexIMG/PokedexIMG";
import Stats from "../Components/Stats/Stats";
import Type from "../Components/Type/Type";
import "./Pokemon.css";

const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const pokeSpecies = "https://pokeapi.co/api/v2/pokemon-species/";


function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Pokemon() {
    const [poke, setPoke] = useState<any>("");
    const [species, setSpecies] = useState<any>("");
    const navigate = useNavigate();

    const pokeId = (useParams()["id"]);

    const getApiData = async () => {
        try {
            const response = await fetch(pokeAPI + pokeId).then((response) =>
                response.json()
            );

            // update the state
            setPoke(response);
            const responseSpecies = await fetch(pokeSpecies + pokeId).then(
                (responseSpecies) => responseSpecies.json()
            );
            setSpecies(responseSpecies);
            console.log(responseSpecies);
        } catch (error) {
            alert("Pokemon doesn't exist!");
            navigate('/');
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    const leftSide = () => {
        return (
            <div className="leftSide">
                <p className="pokeId">#{poke && ('000' + poke.id).slice(-3)}</p>
                <img src={poke && poke.sprites.front_default} />
                <div className="forPokeID">
                    <p className="pokeName">
                        {poke && capitalizeFirstLetter(poke.name)}
                    </p>
                    {poke && <Type pokeType={poke.types} />}
                </div>
            </div>)
    }

    const rightSide = () => {
        return (
            <div className="rightSide">
                {species && <Description description={species["flavor_text_entries"][0]["flavor_text"]} />}
                {poke.stats && <Stats stats={poke.stats}/>}
            </div>)
    }

    const displayPokemon = () => {
        return (
            <div className="pokemonCard">
                {leftSide()}
                <div className="vl"></div>
                {rightSide()}

            </div>);
    }

    return (<div className="details">
        <PokedexIMG />
        {displayPokemon()}
    </div>
    )
}
export default Pokemon;
