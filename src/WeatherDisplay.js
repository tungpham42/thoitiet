import React from "react";
import { Card, Image } from "react-bootstrap";
import cities from "./data/cities";

const WeatherDisplay = ({ weather }) => {
  // Find the city in the cities array by the keyword matching weather.name
  const city = cities.find((c) => c.keyword === weather.name);

  // OpenWeatherMap icon URL
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Thời tiết tại {city ? city.name : weather.name}</Card.Title>
        <Card.Text>
          <strong>Nhiệt độ:</strong> {weather.main.temp}°C
        </Card.Text>
        <Card.Text>
          <strong>Cảm giác:</strong> {weather.main.feels_like}°C
        </Card.Text>
        <Card.Text>
          <strong>Mô tả:</strong> {weather.weather[0].description}
          <br />
          <Image src={iconUrl} alt={weather.weather[0].description} fluid />
        </Card.Text>
        <Card.Text>
          <strong>Độ ẩm:</strong> {weather.main.humidity}%
        </Card.Text>
        <Card.Text>
          <strong>Sức gió:</strong> {weather.wind.speed} m/s
        </Card.Text>
        <Card.Text>
          <strong>Tầm nhìn xa:</strong> {weather.visibility} mét
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherDisplay;
