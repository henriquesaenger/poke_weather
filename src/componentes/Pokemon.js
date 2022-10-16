import React, { Fragment, useEffect, useState } from "react";
import styles from './Pokemon.module.css';
import Grama  from '../grama.png';
import {pesagem} from '../funcoes/Pesagem';

const Pokemon = (props) => {
    const [pokelist, setPokelist] = useState();
    const [climate, setClimate] = useState();
    var lista_preliminar= [];

    const pegaLista= async () => {
        lista_preliminar= [];
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");  
        const data = await response.json();
        data.results.forEach(async (pokemon) => {
            const pokemon_data = await fetch(pokemon.url);
            const pokemon_response = await pokemon_data.json();
            var pokemon = {name: pokemon_response.name, types: pokemon_response.types, images: pokemon_response.sprites, prioridade: 0};
            pokemon.prioridade= pesagem(pokemon, props.climate);
            lista_preliminar.push(pokemon);
            if(lista_preliminar !== []){  
                setPokelist(await lista_preliminar.sort((a,b) => {
                    if(a.prioridade > b.prioridade){
                        return -1;
                    }
                    if(a.prioridade < b.prioridade){
                        return 1;
                    }
        
                    return 0;
                }).slice(0,6));
            }
        });
        
        console.log(lista_preliminar);
    }

    useEffect(() => {
        if(props.climate){
            const identifier = setTimeout(async () => {
                await pegaLista();
                console.log(lista_preliminar);
            }, 500);
    
            return () => {
                clearTimeout(identifier);
            }; 
        }
        
    }, [props.climate]);


    return(
        <Fragment>
            {pokelist && pokelist !== [] ? (
                <div className={styles.poke_container}>
                    {pokelist.map((pokemon, index) => (
                        <Fragment key={index}>
                            <div className={styles.podium_pokemon} >
                                <img className={styles.pokemon_image} src={pokemon.images.front_default} alt={pokemon.name}/>
                                <img src={Grama} alt={pokemon.name}/>
                            </div>
                        </Fragment>
                    ))}
                </div>
            ):(
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
            
        </Fragment>
    )

}


export default Pokemon;