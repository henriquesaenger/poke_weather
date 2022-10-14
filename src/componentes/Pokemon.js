import React, { Fragment, useEffect, useState } from "react";
import styles from './Pokemon.module.css';
import Grama  from '../grama.png';

const Pokemon = () => {
    const [pokelist, setPokelist] = useState();

    const pegaLista= async () => {
        var lista_preliminar= [];
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();
        data.results.forEach(async (pokemon) => {
            const pokemon_data = await fetch(pokemon.url);
            const pokemon_response = await pokemon_data.json();
            lista_preliminar.push({name: pokemon_response.name, types: pokemon_response.types, images: pokemon_response.sprites, prioridade: 0});
            if(lista_preliminar !== []){ 
                setPokelist(await lista_preliminar);
                console.log(lista_preliminar);
            }
        });
        if(lista_preliminar !== []){ 
            setPokelist(await lista_preliminar);
        }
        console.log(lista_preliminar);
    }

    useEffect(() => {
        const identifier = setTimeout(async () => {
            await pegaLista();
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, []);


    return(
        <Fragment>
            {pokelist && pokelist !== [] ? (
                <div className={styles.poke_container}>
                    {pokelist.slice(0,5).map((pokemon) => (
                        <Fragment>
                            <div className={styles.podium_pokemon}>
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