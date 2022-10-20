# Poke Weather

This project was developed with the intention of studying web front-end and making a funny alternative of seeing weather forecast. It shows the pokémon that may appear near you according to the climate conditions you face in your region.
The application was developed with ReactJS, and utilizing the "Open-Meteo API" for the data on weather forecast(https://open-meteo.com/), and the PokéAPI for the data on pokémon(https://pokeapi.co).

## How the application works
 
1 The latitude and Longitude of the user are used to fetch the data of the weather forecast.

2 The basic information on weather forecast is shown at the upper side of the application, while we fetch the list of pokemons from the PokeAPI.

3 After we have the pokemon list, we make a priority list based on the climate conditions:

  * Relative Humidity
    * when below 30%:
      - ground: +0.2;
      - fire: +0.4;
    * when between 31% and 50%:
      - ground: +0.4;
      - fire: +0.2;
    * when between 51% and 70%:
      - water: +0.2;
      - grass: +0.1;
    * when above 71%:
      - water: +0.6;
      - grass: +0.2;
  * Temperature:
    * when below 0°C:
      - ice: +0.6;
    * when between 0°C and 15°C:
      - ice: +0.3;
      - grass: +0.2;
      - ground: +0.2;
      - normal: +0.2;
    * when between 15°C and 27°C:
      - grass: +0.5;
      - insect: +0.5;
      - normal: +0.5;
    * when above 27°C:
      - fire: +0.5;
      - normal: +0.2;
  * Windspeed:
    * below 10km/h:
      - flying: +0.1;
    * between 10km/h and 30km/h:
      - flying: +0.2;
    * above 30km/h:
      - flying: +0.4;
  * Hour:
    * between 0 and 6:
      - dark: +0.5;
      - ghost: +0.3;
    * between 6 and 18:
      - normal: +0.1;
      - insect: +0.2;
    * between 18 and 0:
      - dark: +0.4;
      - ghost: 0.2;
  * Rain:
    * below 0.5mm:
      - flying: +0.1;
      - insect: +0.2;
    * between 0.5mm and 4mm:
      - flying: -0.1;
      - water: +0.2;
      - fire: -0.1;
    * between 4mm and 8mm:
      - water: +0.4;
      - electric: +0.3;
      - fire: -0.3;
      - flying: -0.2;
    * above 8mm:
      - water: +0.5;
      - electric: +0.5;
      - fire: -0.4;
      - flying: -0.3;
  * Cloud Cover:
    * below 20%:
      * night:
        - dark: +0.3;
      * day:
        - psychic: +0.1;
    * between 20% and 50%:
      * night:
        - dark: +0.3;
        - ghost: +0.2;
      * day:
        - psychic: +0.3;
    * between 50% and 70%:
      * night:
        - dark: +0.2;
        - ghost: +0.4;
      * day:
        - psychic: +0.4;
    * above 70%:
      * night:
        - dark: +0.1;
        - ghost: +0.7;
      * day:
        - psychic: +0.7;

## Data

From Open-Meteo, the climate conditions fetched was:
  - Hourly:
    - Relative Humidity.
    - Temperature.
    - Total cloud cover as an area fraction.
    - Apparent Temperature.
    - Total precipitation (rain, showers, snow) sum of the preceding hour.
    - Rain from large scale weather systems of the preceding hour in millimeter.
    - Wind speed at 10 meters above ground.
  - Daily:
    - Maximum and minimum daily air temperature at 2 meters above ground.
    - Maximum and minimum daily apparent temperature.
    

    
The timezone used for this project is São Paulo(GMT-3).




## To-Do in this project

- [ ] Change timezone according with the user timezone;
- [ ] Add select boxes for different regions of pokémon, allowing the user to select from which region pokemons may appear.
- [ ] Allow the user to select new locations to see the weather forecast.
- [ ] Search for a form to distinguish if the user is in a urban center or in a rural region.
- [ ] Search for variables that permit adding metal, poison and rock pokemons in the list.
- [ ] Add Farenheit alternative to Celsius.



## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
