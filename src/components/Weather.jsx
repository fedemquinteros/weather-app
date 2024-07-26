import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import clearn_icon from '../assets/clearn.png'
import cloud_icon from '../assets/cloud.png'
import drizzlen_icon from '../assets/drizzlen.png'
import drizzled_icon from '../assets/drizzled.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import fogn_icon from '../assets/fogn.png'
import fogd_icon from '../assets/fogd.png'


const Weather = () => {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState();

    const allIcons = {
        "01d": clear_icon,
        "01n": clearn_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzled_icon,
        "04n": drizzlen_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": drizzled_icon,
        "10n": drizzled_icon,
        "11d": snow_icon,
        "11n": snow_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": fogd_icon,
        "50n": fogn_icon,
    }
    const search = async (city, country) => {
        if (!city || !country === "") {
            alert("Ingrese una ciudad y un país");
            return;
        };
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }


            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: `${data.name}, ${data.sys.country}`,
                icon: icon
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching data");

        }
    }

    useEffect(() => {
        search("córdoba, ar");
    }, [])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Buscar' />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? <>
                <img src={weatherData?.icon} alt="" className='weather-icon' />
                <p className='temperature'>{weatherData?.temperature}°</p>
                <p className='location'>{weatherData?.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData?.humidity}%</p>
                            <span>Humedad</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="" />
                        <div>
                            <p>{weatherData?.windSpeed} Km/h</p>
                            <span>Velocidad del viento</span>
                        </div>
                    </div>
                </div>
            </> : <></>}


        </div>
    )
}

export default Weather
