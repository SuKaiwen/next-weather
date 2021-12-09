import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import sky from '../public/images/sky.jpg';
import React, {useState, useEffect} from 'react';
import { set } from 'nprogress';

const API_KEY = "b215e5e049c4b3b9b050f1f3581e694e";

const API_KEY_2 = '68dbc264ed3c50bb4785dfca74a08516';

export default function Home() {

  const [data, setData] = useState();
  const [dataFound, setDataFound] = useState(false);

  const [forecast, setForecast] = useState();
  const [forecastFound, setForecastFound] = useState(false);

  useEffect(() => {
    getWeather();
    getForecast();
  }, [])

  const getWeather = async () => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&APPID=${API_KEY}`)
      .then(response => response.json())
      .then(resData => {console.log(resData); setData(resData); setDataFound(true);})
      .catch(err => alert("Weather not found"))
  }

  const getForecast = async () => {
    const forecast_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}`)
      .then(response => response.json())
      .then(resData => {console.log(resData); setForecast(resData); setForecastFound(true);})
      .catch(err => alert("Forecast not found"))
  }

  return (
    <div>
      <Head>
        <title>Next Weathers</title>
      </Head>
      <div className = {styles.container}>
        <h1>Weather Data</h1>
        {dataFound &&
          <> 
            <h2>{data.name}, {data.sys.country}</h2>
            <img src = {`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt = "" />
            <div className = {styles.currentTemp}>
              <h1>{(data.main.feels_like - 273.15).toFixed(2)}&deg; C</h1>
            </div>
            <p>Max: {(data.main.temp_max - 273.15).toFixed(2)}&deg; | Min: {(data.main.temp_min - 273.15).toFixed(2)}&deg;</p>
            <p>Humidity: {data.main.humidity}% | Pressure: {data.main.pressure} Pa | Visibility: {data.visibility}</p>
            <div className = {styles.contentContainer}>
              <div className = {styles.contentCard}>
                <h2>Wind</h2>
                <p>Wind degree: {data.wind.deg} &deg;</p>
                <p>Wind gust: {data.wind.gust}</p>
                <p>Wind speed: {data.wind.speed} km/h</p>
              </div>
              <div className = {styles.contentCard}>
                <h2>Overview</h2>
                <p>Weather: {data.weather[0].main}</p>
                <p>Description: {data.weather[0].description}</p>
                <p>Cloudiness: {data.clouds.all}%</p>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

function minmaxTemp(min, max){
  return(
    <div>
      <h3>Min temp: {min}&deg</h3>
      <h3>Max temp: {max}&deg</h3>
    </div>
    
  )
}
