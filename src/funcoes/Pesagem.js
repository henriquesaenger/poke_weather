



export const pesagem= (pokemon, climate) => {
    var hora= new Date().getHours();
    switch(true){
        case climate.humidity<30:
            verify_type(pokemon, "ground", 0.2);
            verify_type(pokemon, "fire", 0.4);
            break;
        case climate.humidity>=30 && climate.humidity<=50:
            verify_type(pokemon, "ground", 0.4);
            verify_type(pokemon, "fire", 0.2);
            break;
        case climate.humidity>50 && climate.humidity<=70:
            verify_type(pokemon, "water", 0.2);
            verify_type(pokemon, "grass", 0.3);
            break;
        case climate.humidity>70:
            verify_type(pokemon, "water", 0.6);
            verify_type(pokemon, "grass", 0.3); 
            break;
        default:
            console.log("Error: Humidity out of bounds")
    }

    switch(true){
        case climate.temperature <= 0:
            verify_type(pokemon, "ice", 0.6);
            break;
        case climate.temperature>0 && climate.temperature<15:
            verify_type(pokemon, "ice", 0.3);
            verify_type(pokemon, "grass", 0.2);
            verify_type(pokemon, "ground", 0.2);
            verify_type(pokemon, "normal", 0.3);
            break;
        case climate.temperature>=15 && climate.temperature<=27:
            verify_type(pokemon, "grass", 0.5);
            verify_type(pokemon, "insect", 0.5);
            verify_type(pokemon, "normal", 0.6);
            break;
        case climate.temperature>27:
            verify_type(pokemon, "fire", 0.5);
            verify_type(pokemon, "normal", 0.2);
            break;
    }

    switch(true){
        case climate.windspeed<=10:
            verify_type(pokemon, "flying", 0.2);
            break;
        case climate.windspeed>=10 && climate.windspeed>=25:
            verify_type(pokemon, "flying", 0.5);
            break;
        case climate.windspeed>25:
            verify_type(pokemon, "flying", 0.7);
    }

    switch(true){
        case hora>=0 && hora<=6:
            verify_type(pokemon, "dark", 0.5);
            verify_type(pokemon, "ghost", 0.3);
            break;
        case hora>6 && hora<=18:
            verify_type(pokemon, "normal", 0.3);
            verify_type(pokemon, "insect", 0.3);
            break;
        case hora>18 && hora<=23:
            verify_type(pokemon, "dark", 0.4);
            verify_type(pokemon, "ghost", 0.2);
            break;
    }

    switch(true){
        case climate.rain<0.5:
            verify_type(pokemon, "flying", 0.2);
            verify_type(pokemon, "insect", 0.2);
            break;
        case climate.rain>=0.5 && climate.rain<=4:
            verify_type(pokemon, "flying", 0.1);
            verify_type(pokemon, "water", 0.2);
            verify_type(pokemon, "fire", -0.1)
            break;
        case climate.rain>4 && climate.rain<=8:
            verify_type(pokemon, "water", 0.4);
            verify_type(pokemon, "electric", 0.3);
            verify_type(pokemon, "fire", -0.3)
            break;
        case climate.rain>8:
            verify_type(pokemon, "water", 0.5);
            verify_type(pokemon, "electric", 0.5);
            verify_type(pokemon, "fire", -0.4);
            break;
    }

    switch(true){
        case climate.cloudcover<20 && ((hora>0 && hora<6) || (hora=>18 && hora<=23)):
            verify_type(pokemon, "dark", 0.3);
            break;
        case climate.cloudcover<20 && (hora>6 && hora<18):
            verify_type(pokemon, "fire", 0.1);
            verify_type(pokemon, "psychic", 0.1);
            break;
        case climate.cloudcover>20 && climate.cloudcover<=50 && ((hora>0 && hora<6) || (hora=>18 && hora<=23)):
            verify_type(pokemon, "dark", 0.3);
            verify_type(pokemon, "ghost", 0.2);
            break;
        case climate.cloudcover>50 && climate.cloudcover<=70 && (hora>6 && hora<18):
            verify_type(pokemon, "psychic", 0.4);
            break;
        case climate.cloudcover>70 && ((hora>0 && hora<6) || (hora=>18 && hora<=23)):
            verify_type(pokemon, "dark", 0.1);
            verify_type(pokemon, "ghost", 0.7);
            break;
        case climate.cloudcover>70 && (hora>6 && hora<18):
            verify_type(pokemon, "psychic", 0.7);
            break;
    }

    return pokemon.prioridade;

}



const verify_type= (pokemon, type_to_confirm, peso) => {
    pokemon.types.forEach((actual_type) => {
        if(actual_type.type.name == type_to_confirm){
            pokemon.prioridade += peso;
        }        
    });
}