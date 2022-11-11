import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Card from "../Components/Card/Card";
import PokedexIMG from "../Components/PokedexIMG/PokedexIMG";
import Pokemon from "../Services/Pokemon";
import "./Pokedex.css";

let pokeAPI = "https://pokeapi.co/api/v2/pokemon";

function Pokedex() {
    const navigate = useNavigate();
    const input = document.getElementById("search") as HTMLInputElement;
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [nextUrl, setNextUrl] = useState<string>("");
    const [nameToSearch, setNameToSearch] = useState<string>("");

    // Function to collect data
    const getApiData = async (url: string) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const arr = [...pokemons, ...json.results];
            console.log(json);
            setPokemons(arr);
            if (json.next !== "") setNextUrl(json.next);
            else setNextUrl("");
        } catch (error) {
            alert(error);
        }

    };

    useEffect(() => {
        getApiData(pokeAPI);
    }, []);

    const loadMore = () => {
        getApiData(nextUrl);
    };
    const displayPokemons = () => {
        return <div className="pokedex">
            {pokemons.map((pokemon) => { return <Card key={pokemon.url} name={pokemon.name} url={pokemon.url} />; })}
        </div>
    };
    const updateNameToSearch = () => {
        if (input != null) {
            setNameToSearch(input.value);
        }
    }

    const searchBar = () => {
        return <div onClick={updateNameToSearch} className="searchBar">
            <input className="inputSearch" onChange={(e) => setNameToSearch(e.target.value)} value={nameToSearch} type="text" id="search" />
            <button className="searchBTN" onClick={() => {
                navigate('/details/' + nameToSearch.toLowerCase());
            }}>Search</button>
        </div>
    };

    const shouldDisplaySearchResualt = () => { return nameToSearch !== "" };

    return <div className="homepage">
        <PokedexIMG />
        {searchBar()}
        {displayPokemons()}
        {<button className="loadBTN" onClick={loadMore}>Load more...</button>}
    </div>

}

export default Pokedex;
