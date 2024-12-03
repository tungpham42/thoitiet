import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Image } from "react-bootstrap";

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const API_KEY = "a1bec79d6102a5ab6f0fea4d6deb5696";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=vi&cnt=8&units=metric&appid=${API_KEY}`;
        const response = await axios.get(url);
        setForecast(response.data.list);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) return <div>Loading forecast...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Dự báo 8 ngày cho {city}</h2>
      <Row>
        {forecast.map((day, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  {new Date(day.dt * 1000).toLocaleDateString()}
                </Card.Title>
                <Card.Text>
                  <strong>Nhiệt độ:</strong> {day.temp.day}°C
                  <br />
                  <strong>Thời tiết:</strong> {day.weather[0].description}
                  <br />
                  <Image
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                    fluid
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WeatherForecast;
