"use client";
import React, { SyntheticEvent } from "react";
import { useState, useEffect } from "react";
import styles from "./Search.module.css";
import axios, { AxiosError } from "axios";
import Header from "../Header/Header";
import { MdOutlineRefresh } from "react-icons/md";

type searchData = {
  id: string;
  name: string;
  imageUrls: [string, string, string, string];
  typeOf: [string];
};

export default function Search() {
  const [searchWord, setSearchWord] = useState<string>('Pikachu');
  const [searchData, setSearchData] = useState<searchData>({
    id: "",
    name: "",
    imageUrls: ["", "", "", ""],
    typeOf: [""],
  });
  const [error, setError] = useState<string|null>();
  const [loading,setLoading] = useState<boolean>(false)

  function errorRefresh():any {
    window.location.reload()
  }

  async function fetchPokemonData():Promise<void> {
    try {
      const res = await axios.get (
        `https://pokeapi.co/api/v2/pokemon/${searchWord.toLowerCase()}`
        );
        setSearchData({
          id: res.data.id,
          name: res.data.name,
          imageUrls: [
          res.data.sprites.front_default,
          res.data.sprites.front_shiny,
          res.data.sprites.back_default,
          res.data.sprites.back_shiny,
        ],
        typeOf: [res.data.types[0].type.name],
      });
    } catch (err) {
      if(err instanceof AxiosError){
        setError(err.response?.data);
        setLoading(true);
      };
    }
    setLoading(false); 
  };


  useEffect(() => {
    fetchPokemonData()
  }, []);

  return (
      <>
        <div className={styles.body}>
          <h3>Search by Name or ID (ID No. 1 - 1017)</h3>
          <span className={styles.span}>
            <input className={styles.searchBar}
              type="text"
              value={searchWord}
              placeholder="Search by Name or Id(1 - 1017)"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setSearchWord(e.target.value);
              }}
            />
            <button className={styles.clickSearch} 
              disabled={loading}
              type="submit"
              onClick={async (e: React.MouseEvent<HTMLButtonElement>):Promise<void> => {
                e.preventDefault();
                await fetchPokemonData();
              }}
            >
              Search
            </button>
          </span>

          { loading == true ? (`Loading...`): error? 
          (<div className={styles.errorHandle} > 
            <button onClick={errorRefresh}>`{searchWord}` has no data.<br/>Reload here to search again.<br/> <MdOutlineRefresh className={styles.logo}/></button>
          </div> )  : (        
          <div className={styles.pokemonResult}>
            <div className={styles.pokemonData}>
                <h2>#{searchData.id}</h2>
                <h2>{searchData.name}</h2>
              </div>
              <div className={styles.searchResult}>
                <img src={searchData.imageUrls[0]} />
                <img src={searchData.imageUrls[1]} />
                <img src={searchData.imageUrls[2]} />
                <img src={searchData.imageUrls[3]} />
              </div>
              <div>
                <h3>Type : {(searchData.typeOf)}</h3>
              </div>
          </div> 
          )}
        </div>
      </>
      
  );
}
