import React, { useState, useEffect } from "react";

const APIKey = "3d2857edfcc18fca2e122c14481c23a6";

function WeatherApp() {
  const [data, setData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setCity] = useState("maracaibo");
  const [country, setCountry] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [inputCity, setInputCity] = useState("");

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setCountry(data.sys.country);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
      });
  }, [city]);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const handleInputCityChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleSearchClick = () => {
    setCity(inputCity);
    setInputCity("");
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  let temperature = Math.round(data.main.temp - 273.15);
  let unit = "°C";
  if (!isCelsius) {
    temperature = Math.round((temperature * 9) / 5 + 32);
    unit = "°F";
  }

  let img = "";
  let backgroundColor = "";
  if (temperature >= 20 && temperature <= 35) {
    img = "climaVerano.png";
    backgroundColor = "yelow";
  } else if (temperature >= 17 && temperature <= 19) {
    img = "climaPrimavera.png";
    backgroundColor = "pink";
  } else {
    img = "climaInvierno.png";
    backgroundColor = "blue";
  }
  document.body.style.backgroundColor = backgroundColor;

  return (
    <div className="screen-container">
      <div className="weather-app">
        <h1>
          {data.name}, {country}
        </h1>
        <img
          className="absolute w-4/12 top-12 right-0 z-10"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt=""
        />
        <p>
          {temperature}
          {unit}
        </p>
        <div className="button-clima">
          <button onClick={toggleTemperatureUnit}>
            <h3>Cambiar unidad</h3>
          </button>
        </div>
        <p>Humedad: {humidity}%</p>
        <p>Velocidad del viento: {windSpeed} km/h</p>
        <div className="inputCiudad">
          <input type="text" value={inputCity} onChange={handleInputCityChange} />
          <button onClick={handleSearchClick}><h3>Buscar ciudad</h3></button>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
