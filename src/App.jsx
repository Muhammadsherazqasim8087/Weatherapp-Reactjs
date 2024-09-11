import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '6533e960a8c8514ebde19bdb1f217e55'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (city === '') {
      setError('Please enter a city name');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === '404') {
        setError('City not found');
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      setError('Error fetching weather data');
      setWeather(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="app">
      <h1 className="text-center">Weather App</h1>

      <div className="weather-form">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary mt-2" onClick={fetchWeather}>
          Get Weather
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {weather && (
        <div className="weather-info mt-4">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Condition:</strong> {weather.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
