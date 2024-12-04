import React from "react";
import { Card, Image } from "react-bootstrap";
import cities from "./data/cities";
import directions from "./data/directions";

const WeatherDisplay = ({ weather }) => {
  // Find the city in the cities array by the keyword matching weather.name
  const city = cities.find((c) => c.keyword === weather.name);

  // OpenWeatherMap icon URL
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  const windDirection = (degree) => {
    const index = Math.round(degree / 22.5) % 16;
    return directions[index];
  };
  const VietnameseDateTime = (timestamp) => {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp * 1000);

    // Use Intl.DateTimeFormat for Vietnamese locale
    const formatter = new Intl.DateTimeFormat("vi-VN", {
      weekday: "long", // Full weekday name
      year: "numeric", // Full year
      month: "long", // Full month name
      day: "numeric", // Day of the month
      hour: "numeric", // Hours
      minute: "numeric", // Minutes
      second: "numeric", // Seconds
    });

    return formatter.format(date);
  };

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
          <strong>Áp suất khí quyển:</strong> {weather.main.pressure}hPa
        </Card.Text>
        <Card.Text>
          <strong>Sức gió:</strong> {weather.wind.speed} m/s
        </Card.Text>
        <Card.Text>
          <strong>Hướng gió:</strong> {windDirection(weather.wind.deg)}
        </Card.Text>
        <Card.Text>
          <strong>Tầm nhìn xa:</strong> {weather.visibility} mét
        </Card.Text>
        <Card.Text>
          Mặt trời mọc {VietnameseDateTime(weather.sys.sunrise)}
        </Card.Text>
        <Card.Text>
          Mặt trời lặn {VietnameseDateTime(weather.sys.sunset)}
        </Card.Text>
        <Card.Text>Cập nhật {VietnameseDateTime(weather.dt)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherDisplay;
