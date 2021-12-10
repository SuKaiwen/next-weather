import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react';

const API_KEY = "b215e5e049c4b3b9b050f1f3581e694e";

export default function Home() {

  const [data, setData] = useState();
  const [dataFound, setDataFound] = useState(false);

  const [forecast, setForecast] = useState();
  const [forecastFound, setForecastFound] = useState(false);

  const [dailyForecast, setDailyForeCast] = useState();

  useEffect(() => {
    getWeather();
    getForecast();
  }, [])

  const getWeather = async () => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Sydney&APPID=${API_KEY}`)
      .then(response => response.json())
      .then(resData => {console.log(resData); setData(resData); setDataFound(true);})
      .catch(err => alert("Weather not found"))
  }

  const getForecast = async () => {
    const forecast_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Sydney&appid=${API_KEY}`)
      .then(response => response.json())
      .then(resData => {console.log(resData); 
                        setForecast([resData.list[0]].concat([resData.list[8]]).concat([resData.list[16]]).concat([resData.list[24]]).concat([resData.list[32]])); 
                        setDailyForeCast([resData.list[0]].concat([resData.list[1]]).concat([resData.list[2]]).concat([resData.list[3]]).concat([resData.list[4]]).concat([resData.list[5]]).concat([resData.list[6]]).concat([resData.list[7]]));
                        setForecastFound(true);})
      .catch(err => alert("Forecast not found"))
  }



  return (
    <div>
      <Head>
        <title>Next Weathers</title>
      </Head>
      <div className = {styles.container}>
        <h1>Weather Data</h1>
        {dataFound && forecastFound &&
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
            <div className = {styles.titleContainer}>
              <h3>Forecast</h3>
              <p>{forecast[0].dt_txt.split(' ')[0]} - {forecast[4].dt_txt.split(' ')[0]}</p>
            </div>
            <div className = {styles.forecastContainer}>
              {forecast.map(forecastInfo => (
                <div className = {styles.forecastCard}>
                  <h4>{forecastInfo.dt_txt.split(' ')[0]}</h4>
                  <img src = {`http://openweathermap.org/img/wn/${forecastInfo.weather[0].icon}@2x.png`} alt = "" />
                  <h4>{(forecastInfo.main.feels_like - 273.15).toFixed(2)} &deg; C</h4>
                  <p>{(forecastInfo.main.temp_max - 273.15).toFixed(2)} &deg; C | {(forecastInfo.main.temp_min - 273.15).toFixed(2)} &deg; C</p>
                  <p>{forecastInfo.weather[0].main}</p>
              </div>
              ))}
            </div>
            <div className = {styles.titleContainer}>
              <h3>Hourly Summary</h3>
              <p>{dailyForecast[0].dt_txt.split(' ')[1]} - {dailyForecast[7].dt_txt.split(' ')[1]}</p>
            </div>
            <div className = {styles.summaryContainer}>
              {dailyForecast.map(forecastInfo => (
                <div className = {styles.summaryCard}>
                  <h4>{forecastInfo.dt_txt.split(' ')[1]}</h4>
                  <img src = {`http://openweathermap.org/img/wn/${forecastInfo.weather[0].icon}@2x.png`} alt = "" />
                  <h4>{(forecastInfo.main.feels_like - 273.15).toFixed(2)} &deg; C</h4>
                  <p>{forecastInfo.weather[0].main}</p>
              </div>
              ))}
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
