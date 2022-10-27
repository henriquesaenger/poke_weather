import React, { Fragment, useEffect, useState} from 'react';
import styles from './App.module.css';
import Previsao from './componentes/Previsao';
import Pokemon from './componentes/Pokemon';
import Chuva from './componentes/Chuva';

function App() {
   const [previsao, setPrevisao]= useState();
  const [ultimaAtualizacao, setUltimaAtualizacao]= useState();
  const [clima, setClima] = useState();
  const [chovendo, setChovendo] = useState(false);
  var climate;

  useEffect(() => {
    var data= new Date();
    if(ultimaAtualizacao!== data.getHours() ){
      navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude="+position.coords.latitude.toFixed(2)+"&longitude="+position.coords.longitude.toFixed(2)+"&hourly=temperature_2m,relativehumidity_2m,cloudcover,apparent_temperature,precipitation,rain,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&timezone=America%2FSao_Paulo&start_date="+data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate()+"&end_date="+data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate());
        const prev = await response.json();
        setUltimaAtualizacao(data.getHours());
        climate= {humidity: prev.hourly.relativehumidity_2m[data.getHours()], temperature: prev.hourly.temperature_2m[data.getHours()], windspeed: prev.hourly.windspeed_10m[data.getHours()], rain: prev.hourly.rain[data.getHours()], cloudcover: prev.hourly.cloudcover[data.getHours()]};
        setPrevisao(prev);
        setClima(climate);
        console.log(climate.rain);
        if(climate.rain>0.5){
          setChovendo(true);
        }
      });
      
    }
    
    
  }, [previsao, climate]);
  
  const back_color= () => {
    var data= new Date();
    var hora_do_dia= data.getHours();
    var linear;
    if(hora_do_dia>6 && hora_do_dia<17){
      linear="linear-gradient(180deg, #0DA2FF, white)";
    }
    else if(hora_do_dia>17 && hora_do_dia<20){
      linear= "linear-gradient(to bottom right, #F4633C, #150E5C)";
    }
    else{
      linear="linear-gradient(180deg, #002853, #511C51)";
    }
    return linear;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.climate_animation} style={{ background: back_color()}}>
        { chovendo ? (<Chuva />):(<Fragment />)}
        
      </div>
      <div className={styles.fundo}>
          <Previsao dados={previsao} hora={ultimaAtualizacao}/>
          <p className={styles.text}>These pokemon can appear near you:</p>
          <Pokemon climate={clima} />
      </div>
    </div>
      
  );
}

export default App;
