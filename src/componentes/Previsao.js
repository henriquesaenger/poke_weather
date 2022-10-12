import React, { Fragment, useEffect } from "react";
import styles from './Previsao.module.css';


const Previsao= (props) => {
    const hora= new Date().getHours();
    useEffect(() => {
        console.log(props.dados);
    });

    return(
        <Fragment>
            {props.dados ? (
            <div className={styles.previsao}>
                <div className={styles.temperatura}>
                    <p className={styles.graus}>{props.dados.hourly.temperature_2m[hora]}</p>
                    <p className={styles.celsius}>ºC</p>
                </div>
                <div className={styles.detalhes}>
                    <div>
                        <p>Humidity: {props.dados.hourly.relativehumidity_2m[hora]}%</p>
                        <p>Max Temperature: {props.dados.daily.temperature_2m_max}ºC</p>
                        <p>Min Temperature: {props.dados.daily.temperature_2m_min}ºC</p>
                    </div>
                    <div>
                        <p>Wind Speed: {props.dados.hourly.windspeed_10m[hora]} km/h</p>
                        <p>Last hour precipitation: {props.dados.hourly.precipitation[hora]} mm</p>
                        <p>Apparent Temperature: {props.dados.hourly.apparent_temperature[hora]}ºC</p>
                    </div>
                </div>
            </div>
            ):(
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
            
        </Fragment>
    )
}


export default Previsao;