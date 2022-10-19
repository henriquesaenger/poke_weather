



export const pesagem= (pokemon, climate) => {
    var hora= new Date().getHours();
    var prioridade = 0;
    switch(true){
        case climate.humidity<30:
            prioridade=verify_type(pokemon, prioridade,  "ground", 0.2);
            prioridade=verify_type(pokemon, prioridade,  "fire", 0.4);
            break;
        case climate.humidity>=30 && climate.humidity<=50:
            prioridade=verify_type(pokemon, prioridade,  "ground", 0.4);
            prioridade=verify_type(pokemon, prioridade,  "fire", 0.2);
            break;
        case climate.humidity>50 && climate.humidity<=70:
            prioridade=verify_type(pokemon, prioridade,  "water", 0.2);
            prioridade=verify_type(pokemon, prioridade,  "grass", 0.3);
            break;
        case climate.humidity>70:
            prioridade=verify_type(pokemon, prioridade,  "water", 0.6);
            prioridade=verify_type(pokemon, prioridade,  "grass", 0.3);
            break;
        default:
            console.log("Error: Humidity out of bounds");
    }
    switch(true){
        case climate.temperature <= 0:
            prioridade=verify_type(pokemon, prioridade,  "ice", 0.6);
            break;
        case climate.temperature>0 && climate.temperature<15:
            prioridade=verify_type(pokemon, prioridade,  "ice", 0.3);
            prioridade=verify_type(pokemon, prioridade,  "grass", 0.2);
            prioridade=verify_type(pokemon, prioridade,  "ground", 0.2);
            prioridade=verify_type(pokemon, prioridade,  "normal", 0.3);
            break;
        case climate.temperature>=15 && climate.temperature<=27:
            prioridade=verify_type(pokemon, prioridade,  "grass", 0.5);
            prioridade=verify_type(pokemon, prioridade,  "insect", 0.5);
            prioridade=verify_type(pokemon, prioridade,  "normal", 0.5);
            break;
        case climate.temperature>27:
            prioridade=verify_type(pokemon, prioridade,  "fire", 0.5);
            prioridade=verify_type(pokemon, prioridade,  "normal", 0.2);
            break;
        default:
            console.log("Error: Temperature out of bounds");
    }
    switch(true){
        case climate.windspeed<=10:
            prioridade=verify_type(pokemon, prioridade,  "flying", 0.1);
            break;
        case climate.windspeed>=10 && climate.windspeed<=30:
            prioridade=verify_type(pokemon, prioridade,  "flying", 0.2);
            break;
        case climate.windspeed>30:
            prioridade=verify_type(pokemon, prioridade,  "flying", 0.4);
            break;
        default:
            console.log("Error: Windspeed out of bounds");
    }
    switch(true){
        case hora>=0 && hora<=6:
            prioridade=verify_type(pokemon, prioridade,  "dark", 0.5);
            prioridade=verify_type(pokemon, prioridade,  "ghost", 0.3);
            break;
        case hora>6 && hora<=18:
            prioridade=verify_type(pokemon, prioridade,  "normal", 0.1);
            prioridade=verify_type(pokemon, prioridade,  "insect", 0.3);
            break;
        case hora>18 && hora<=23:
            prioridade=verify_type(pokemon, prioridade,  "dark", 0.4);
            prioridade=verify_type(pokemon, prioridade,  "ghost", 0.2);
            break;
        default:
            console.log("Error: Hour out of bounds");
    }
    switch(true){
        case climate.rain<0.5:
            prioridade=verify_type(pokemon, prioridade,  "flying", 0.2);
            prioridade=verify_type(pokemon, prioridade,  "insect", 0.2);
            break;
        case climate.rain>=0.5 && climate.rain<=4:
            prioridade=verify_type(pokemon, prioridade,  "flying", 0.1);
            prioridade=verify_type(pokemon, prioridade,  "water", 0.2);
            prioridade=verify_type(pokemon, prioridade,  "fire", -0.1)
            break;
        case climate.rain>4 && climate.rain<=8:
            prioridade=verify_type(pokemon, prioridade,  "water", 0.4);
            prioridade=verify_type(pokemon, prioridade,  "electric", 0.3);
            prioridade=verify_type(pokemon, prioridade,  "fire", -0.3);
            prioridade=verify_type(pokemon, prioridade,  "flying", -0.2);
            break;
        case climate.rain>8:
            prioridade=verify_type(pokemon, prioridade,  "water", 0.5);
            prioridade=verify_type(pokemon, prioridade,  "electric", 0.5);
            prioridade=verify_type(pokemon, prioridade,  "fire", -0.4);
            prioridade=verify_type(pokemon, prioridade,  "flying", -0.3);
            break;
        default:
            console.log("Error: Rain out of bounds");
    }
    switch(true){
        case climate.cloudcover<20 && ((hora>0 && hora<6) || (hora=>18 && hora<=23)):
            prioridade=verify_type(pokemon, prioridade,  "dark", 0.3);
            break;
        case climate.cloudcover<20 && (hora>6 && hora<18):
            prioridade=verify_type(pokemon, prioridade,  "fire", 0.1);
            prioridade=verify_type(pokemon, prioridade,  "psychic", 0.1);
            break;
        case climate.cloudcover>20 && climate.cloudcover<=50 && ((hora>0 && hora<6) || (hora=>18 && hora<=23)):
            prioridade=verify_type(pokemon, prioridade,  "dark", 0.3);
            prioridade=verify_type(pokemon, prioridade,  "ghost", 0.2);
            break;
        case climate.cloudcover>50 && climate.cloudcover<=70 && (hora>6 && hora<18):
            prioridade=verify_type(pokemon, prioridade,  "psychic", 0.4);
            break;
        case climate.cloudcover>70 && ((hora>0 && hora<6) || (hora=>18 && hora<=23)):
            prioridade=verify_type(pokemon, prioridade,  "dark", 0.1);
            prioridade=verify_type(pokemon, prioridade,  "ghost", 0.7);
            break;
        case climate.cloudcover>70 && (hora>6 && hora<18):
            prioridade=verify_type(pokemon, prioridade,  "psychic", 0.7);
            break;
        default:
            console.log("Error: Cloud Cover out of bounds");
    }
    return prioridade;

}



 const verify_type= (pokemon, prioridade, type_to_confirm, peso) => {
    pokemon.types.forEach((actual_type) => {
        if(actual_type.type.name === type_to_confirm){
            prioridade=prioridade+peso;
        }
    });

    return (prioridade);
}