import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import WeatherDisplay from "./WeatherDisplay";
import cities from "./data/cities";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleCityChange = async (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);

    if (!selectedCity) {
      setWeather(null); // Clear weather data if no city is selected
      return;
    }

    try {
      const API_KEY = "a1bec79d6102a5ab6f0fea4d6deb5696"; // Replace with your OpenWeather API key
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&lang=vi&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null); // Clear weather data on error
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">Dự báo Thời tiết</h1>
          <Form.Group>
            <Form.Label>Chọn tỉnh/thành</Form.Label>
            <Form.Select as="select" value={city} onChange={handleCityChange}>
              <option value="">-- Chọn một tỉnh/thành --</option>
              {cities.map((c, index) => (
                <option key={index} value={c.keyword}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {weather && <WeatherDisplay weather={weather} />}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
