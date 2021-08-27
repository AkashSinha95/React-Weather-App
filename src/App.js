import React, { useEffect, useState } from "react";
import UserLocation from "./components/UserLocation.js";
import Navbar from "./components/Navbar.js";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [latitude, setLatitude] = useState(42.3601);
  const [longitude, setLongitude] = useState(-71.0589);
  const [weather, setWeather] = useState({});
  const [regionInput, setRegionInput] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //get the lat and long of your device
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLatitude(pos.latitude);
        setLongitude(pos.longitude);

        //Weather Api call
        Axios.get(
          `http://api.weatherstack.com/current?access_key=38cc54f41bd35aa4dcb6c3339e064395&query=${latitude},${longitude}`
        ).then((res) => {
          let userWeather = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons,
          };

          // this.setState({ weather: userWeather });
          setWeather(userWeather);
        });
      });
    }
  }, [latitude, longitude]);

  const changeRegion = (value) => {
    setRegionInput(value);
  };

  const changeLocation = (e) => {
    e.preventDefault();

    Axios.get(
      `http://api.weatherstack.com/current?access_key=ee2c00a09ba65e4467143d28625d3fa2&query=${regionInput}`
    ).then((res) => {
      let userWeather = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons,
      };

      setWeather(userWeather);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <Navbar changeRegion={changeRegion} changeLocation={changeLocation} />
        <UserLocation weather={weather} />
      </div>
    </div>
  );
};

export default App;
