'use client'

import { useEffect, useState } from "react"
import styles from './page.module.css'
import './globals.css'
import Header from './components/Header/Header'
import axios, { AxiosError } from "axios"
import Search from "./components/search/Search"


type pokemonName = {
  pokeId:string,
  pokeName:string,
  pokeImage:[string,string,string,string]
}


export default function Home() {
  const [ typeList , setTypeList ] = useState<any[]>([])
  const [ pokemonList,setPokemonList] = useState<any[]>([])
  const [ pokemonName,setPokemonName] = useState<pokemonName>()


  async function fetchPokemonGenI() {
    const res = await axios.get(`https://pokeapi.co/api/v2/generation/1`)
    console.log(res.data.types)
    setTypeList(res.data.types)
  }

  async function fetchPokemonType(url:string) {  //  /type/
    const res = await axios.get(url)
    console.log(res.data.pokemon)
    setPokemonList(res.data.pokemon)
  }

  async function fetchPokemonName(url:string) { // /pokemon/
    const res = await axios.get(url)
    setPokemonName({
      pokeId:res.data.id,
      pokeName:res.data.name,
      pokeImage:[
        res.data.sprites.front_default,
        res.data.sprites.front_shiny,
        res.data.sprites.back_default,
        res.data.sprites.back_shiny,
      ]})
  }

  const capitalize = (str:string) => {
    return `${str[0].toUpperCase()}${str.slice(1)}`
  }

  useEffect(()=>{
    fetchPokemonGenI()
  },[])
  
  return (
    <>
      <div className={styles.body}>
        <Header/>
        <div className={styles.aliceBlue}>        
          <div className={styles.pokemonSearchMenu}>
            <Search/>
          </div>
        </div>
        <div className={styles.aliceBlue}>        
          <div className={styles.pokeTypeMenu}>
            {typeList.map((type) => (
              <button key={type.name}  className={type.name} onClick={() => fetchPokemonType(type.url)}>
                {capitalize(type.name)}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.pokeNameMenu}>
          {pokemonList.map((list)=> (         
            <button  key={list.pokemon.name} className={styles.PokeList} onClick={()=>fetchPokemonName(list.pokemon.url)} >
              {capitalize(list.pokemon.name)}
            </button>
          ))}
        </div>
        { pokemonName ? (
        <div className={styles.pokemonResult}>
          <div className={styles.pokemonData}>
            <h2>#{pokemonName.pokeId}</h2>
            <h2>{capitalize(pokemonName.pokeName)}</h2>
          </div>
          <div className={styles.searchResult}>
              <img src={pokemonName.pokeImage[0]} alt="" />
              <img src={pokemonName.pokeImage[1]} alt="" />
              <img src={pokemonName.pokeImage[2]} alt="" />
              <img src={pokemonName.pokeImage[3]} alt="" />
          </div>
        </div>
        ) : (null)}
      </div>
    </>
  )}
