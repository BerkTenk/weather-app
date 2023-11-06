import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import CityContext from '../contexts/CityContext';

function Weather() {
  const [selectedCity, setSelectedCity] = useState('Adana');
  const cities = useContext(CityContext);

  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    axios(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&lang=tr&units=metric&appid=f5fea04b50574fd876eb0cb8f961c4bc`)
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
    let minTemp = group[0].main.temp_min;
    let maxTemp = group[0].main.temp_max;
    let lastForecast = group[0];
  
    group.forEach((forecast) => {
      if (forecast.main.temp_min < minTemp) {
        minTemp = forecast.main.temp_min;
      }
      if (forecast.main.temp_max > maxTemp) {
        maxTemp = forecast.main.temp_max;
      }
      lastForecast = forecast;
    });
  
    return { ...lastForecast, main: { ...lastForecast.main, temp_min: minTemp, temp_max: maxTemp } };
  };

  return (
    <div>
      <h1>Weather</h1>
      <select value={selectedCity} onChange={handleCityChange} className='option'>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      
      {forecastData.map((forecast, index) => (
        <div key={index} className={index === 0 ?  "weather-first" : "weather"  }>
          <h2>{new Date(forecast.dt_txt).toDateString()}</h2>
          {forecast.weather[0].icon && (
            <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="Weather Icon" />
          )}
          <p>Min Temperature: {forecast.main.temp_min}°</p>
          <p>Max Temperature: {forecast.main.temp_max}°</p>
          <p>Hava {forecast.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default Weather;