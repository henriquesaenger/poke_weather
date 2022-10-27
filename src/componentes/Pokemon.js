import React, { Fragment, useEffect, useState } from "react";
import styles from './Pokemon.module.css';
import Grama  from '../grama.png';
import {pesagem} from '../funcoes/Pesagem';

const Pokemon = (props) => {
    const [pokelist, setPokelist] = useState();
    const [climate, setClimate] = useState();
    var lista_preliminar= [];
    var name_list= [];

    const pegaLista=  () => {
        const response =  fetch("https://pokeapi.co/api/v2/pokemon?limit=649")
        .then((response) => (response.json())
        .then((data) => {
            data.results.forEach((pokemon) => {
                const pokemon_data =fetch(pokemon.url)
                .then((pokemon_response) => (pokemon_response.json())
                .then((pokemon_data) => {         
                    var pokemon = {name: pokemon_data.name, types: pokemon_data.types, images: pokemon_data.sprites, prioridade: 0, id: pokemon_data.id};
                    pokemon.prioridade= pesagem(pokemon_data, props.climate);
                    const response = fetch("https://pokeapi.co/api/v2/pokemon-species/"+pokemon.id+"/")
                    .then((response) => (response.json())
                    .then((data) => {
                        if(data.evolves_from_species){
                            if(name_list.includes(data.evolves_from_species.name)){
                                pokemon.prioridade-=0.7;
                            }
                        }
                        if(data.is_legendary && ((Math.random()*10000) !== 7)){
                            pokemon.prioridade-=1.7;
                        }
                        if(data.is_mythical){
                            pokemon.prioridade-=1.7;
                        }
                        if(lista_preliminar !== []){  
                            setPokelist(lista_preliminar.sort((a,b) => {
                                if(a.prioridade > b.prioridade){
                                    return -1;
                                }
                                if(a.prioridade < b.prioridade){
                                    return 1;
                                }
            
                                return 0;
                            }).slice(0,6));
                        }
                    }));
                    name_list.push(pokemon.name);
                    lista_preliminar.push(pokemon);
                }));
            });
        }), []);  
        
        
        console.log(lista_preliminar);
    }

    useEffect(() => {
        if(props.climate){
            const identifier = setTimeout(() => {
                pegaLista();
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