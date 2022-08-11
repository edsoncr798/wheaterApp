
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import LoadingScreem from './LoadingScreem'


const CardWeather = ({lat, lon}) => {
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelsius, setIsCelsius] = useState(false)
    const [loading, setLoading] = useState(true)

    const toggleClick=()=> setIsCelsius(!isCelsius)
    useEffect(()=>{

        if(lat){
            const APIKey='c980e539d8f5aae8cf614afdaab590cd'
            const URL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
            axios.get(URL)
            .then(res => {
                setWeather(res.data)
                const temp={
                    celsius: `${Math.round(res.data.main.temp - 272.15)}°C`,
                    farenheit:`${Math.round((res.data.main.temp) * 9/5 +32)}°F`
                }
                setTemperature(temp)
                setLoading(false)
            })
            .catch((err) => console.log(err.message));
        }

    },[lat, lon])

    console.log(weather)
    


  if(loading){
    return <LoadingScreem />
  }else{
    return (
        <div className='card__weather'>
            <div className='card__title'>
                <h1>Weather App</h1>
                <span>{`City ${weather?.name}, ${weather?.sys.country}`}</span>
            </div>
    
            <div className='card__content'>
                <div className='card__img'>
                    <img src= {weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                    <h2>{isCelsius ? temperature?.celsius:temperature?.farenheit}</h2>
                </div>
                
                <div className='card__data'>
                    <span><b>&#34;{weather?.weather[0].description}&#34;</b></span>
                    <ul>
                        <li><span>Win Speed</span> {weather?.wind.speed} m/s</li>
                        <li><span>Clouds</span> {weather?.clouds.all} %</li>
                        <li><span>Pressure</span> {weather?.main.pressure} hPa</li> 
                    </ul>
                </div>
            </div>
            <div className='card__btn'>
                <button onClick={toggleClick}>{isCelsius?'change °F': 'change °C'}</button>
            </div>
    
        </div>
      )
  }

}

export default CardWeather