import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import CityContext from '../contexts/CityContext';

function Weather() {
  const [selectedCity, setSelectedCity] = useState('Adana');
  const cities = useContext(CityContext);

  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    axios(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&lang=tr&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then((res) => {
        const forecastList = res.data.list;
        const groupedForecasts = groupForecastsByDay(forecastList);
        const firstFiveDays = Object.values(groupedForecasts).slice(0, 5);
        const finalForecasts = firstFiveDays.map(getLastForecastOfGroup);
        setForecastData(finalForecasts);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const groupForecastsByDay = (forecasts) => {
    const groupedForecasts = {};

    forecasts.forEach((forecast) => {
      const date = new Date(forecast.dt_txt);
      const day = date.toDateString();

      if (!groupedForecasts[day]) {
        groupedForecasts[day] = [];
      }

      groupedForecasts[day].push(forecast);
    });

    return groupedForecasts;
  };

  const getLastForecastOfGroup = (group) => {
    let lastForecast = group[group.length-1];
    let minTemp = group[0].main.temp_min;
    let maxTemp = group[0].main.temp_max;
    
  
    group.forEach((forecast) => {
      if (forecast.main.temp_min < minTemp) {
        minTemp = forecast.main.temp_min;
      }
      if (forecast.main.temp_max > maxTemp) {
        maxTemp = forecast.main.temp_max;
      }
      
    });
  
    return { ...lastForecast, main: { ...lastForecast.main, temp_min: minTemp, temp_max: maxTemp } };
  };

  return (
    <div>
      <h1>Weather App</h1>
      <select value={selectedCity} onChange={handleCityChange} className='option'>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      
      {forecastData.map((forecast, index) => (
        <div key={index} className={index === 0 ?  "weather-first blok" : "weather blok"  }>
          <h2>{new Date(forecast.dt_txt).toDateString()}</h2>
          {forecast.weather[0].icon && (
            <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="Weather Icon" />
          )}
          <p>Min Temperature: {Math.round(forecast.main.temp_min)}°</p>
          <p>Max Temperature: {Math.round(forecast.main.temp_max)}°</p>
          <p>Hava {forecast.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default Weather;