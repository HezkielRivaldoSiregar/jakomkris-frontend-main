import React, { Component } from "react";
import axios from "axios";
import HumanDate from "./HumanDate";
import Weather from "./Weather";
import WeatherIcon from "./WeatherIcon";
import Search from "./Search";
import Forecast from "./Forecast";
import BadgeTemp from "./BadgeTemp";
import NightDayIcon from "./NightDayIcon";
import ChangeDegrees from "./ChangeDegrees";
import "./weatherForm.scss";
import Carousel from 'react-grid-carousel'
import { Card } from "react-bootstrap";
export default class WeatherForm extends Component {
  apiKey = "7833aae64dcd3fcf5a133f4352863fa2";
  apiRoot = "https://api.openweathermap.org/";

  state = {
    loaded: false,
    stClass: "lightmode"
  };

  showResults = response => {
    this.setState({
      weatherLoaded: true,
      weather: {
        date: response.data.dt,
        timezone: response.data.timezone,
        city: response.data.name,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        temperature: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
        wind: Math.round(response.data.wind.speed),
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset
      }
    });
  };

  showResultsForecast = response => {
    this.setState({
      weatherLoaded2: true,
      weather2: {
        forecastDate1: response.data.list[0].dt,
        forecastDate2: response.data.list[7].dt,
        forecastDate3: response.data.list[15].dt,
        forecastDate4: response.data.list[23].dt,
        forecastDate5: response.data.list[31].dt,
        timezone: response.data.timezone,
        forecastDescription1: response.data.list[0].weather[0].description,
        forecastDescription2: response.data.list[7].weather[0].description,
        forecastDescription3: response.data.list[15].weather[0].description,
        forecastDescription4: response.data.list[23].weather[0].description,
        forecastDescription5: response.data.list[31].weather[0].description,
        forecastIcon1: response.data.list[0].weather[0].icon,
        forecastIcon2: response.data.list[7].weather[0].icon,
        forecastIcon3: response.data.list[15].weather[0].icon,
        forecastIcon4: response.data.list[23].weather[0].icon,
        forecastIcon5: response.data.list[31].weather[0].icon,
        forecastTemp1: Math.round(response.data.list[0].main.temp),
        forecastTemp2: Math.round(response.data.list[7].main.temp),
        forecastTemp3: Math.round(response.data.list[15].main.temp),
        forecastTemp4: Math.round(response.data.list[23].main.temp),
        forecastTemp5: Math.round(response.data.list[31].main.temp),
        forecastHumidity1: response.data.list[0].main.humidity,
        forecastHumidity2: response.data.list[7].main.humidity,
        forecastHumidity3: response.data.list[15].main.humidity,
        forecastHumidity4: response.data.list[23].main.humidity,
        forecastHumidity5: response.data.list[31].main.humidity,
        forecastWind1: Math.round(response.data.list[0].wind.speed),
        forecastWind2: Math.round(response.data.list[7].wind.speed),
        forecastWind3: Math.round(response.data.list[15].wind.speed),
        forecastWind4: Math.round(response.data.list[23].wind.speed),
        forecastWind5: Math.round(response.data.list[31].wind.speed)
      }
    });
  };

  search = city => {
    let apiUrl = `${this.apiRoot}/data/2.5/weather?q=${city}&appid=${this.apiKey
      }&units=metric&lang=id`;
    let apiUrlForecast = `${this.apiRoot}/data/2.5/forecast?q=${city}&appid=${this.apiKey
      }&units=metric&lang=id`;
    axios.get(apiUrl).then(this.showResults);
    axios.get(apiUrlForecast).then(this.showResultsForecast);
  };

  componentDidMount() {
    this.search(this.props.city);
  }

  render() {
    if (this.state.weatherLoaded && this.state.weatherLoaded2) {
      return (
        <div>
          <div className="container">

            <div className="wrapper">
              <div className="left-side-weather">
              {/* <Weather />  */}
              
              </div>
              <div className="right-side-weather">
              <Search submit={this.search} />
              </div>
            </div>
            <br></br>

            <Card className="card-kotak">
              <Card.Header as="h5" className="card-weather-city">
                
                <Card.Body >
                  <BadgeTemp temperaturestamp={this.state.weather.temperature} />
                  {this.state.weather.city}

                </Card.Body>

              </Card.Header>

              <Card.Body>

                <ul>
                  <li>
                    <NightDayIcon
                      timestamp={this.state.weather.date}
                      timezone={this.state.weather.timezone}
                      sunrise={this.state.weather.sunrise}
                      sunset={this.state.weather.sunset}
                    />
                    <HumanDate
                      timestamp={this.state.weather.date}
                      timezone={this.state.weather.timezone}
                    />
                  </li>
                  <li className="description">


                    {this.state.weather.description}

                  </li>
                </ul>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="clearfix">
                      <div className="weather float-left">
                        <WeatherIcon weather={this.state.weather.description}
                        />
                      </div>
                      <div className="temperature float-left">
                        <ChangeDegrees
                          temperature={this.state.weather.temperature}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <ul>
                      <li>Kelembapan: {this.state.weather.humidity}%</li>
                      <li>Kecepatan Angin: {this.state.weather.wind}km/h</li>
                    </ul>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <br />


            {/* <div className="row">
              <Carousel cols={4} rows={1} loop >
                <Carousel.Item className='card-height'>
                  <Forecast
                    date={this.state.weather2.forecastDate1}
                    timezone={this.state.weather.timezone}
                    description={this.state.weather2.forecastDescription1}
                    temp={this.state.weather2.forecastTemp1}
                    humidity={this.state.weather2.forecastHumidity1}
                    wind={this.state.weather2.forecastWind1}
                  />
                </Carousel.Item>
                <Carousel.Item className='card-height'>
                  <Forecast
                    date={this.state.weather2.forecastDate2}
                    timezone={this.state.weather.timezone}
                    description={this.state.weather2.forecastDescription2}
                    temp={this.state.weather2.forecastTemp2}
                    humidity={this.state.weather2.forecastHumidity2}
                    wind={this.state.weather2.forecastWind2}
                  />
                </Carousel.Item>

                <Carousel.Item className='card-height'>
                  <Forecast
                    date={this.state.weather2.forecastDate3}
                    timezone={this.state.weather.timezone}
                    description={this.state.weather2.forecastDescription3}
                    temp={this.state.weather2.forecastTemp3}
                    humidity={this.state.weather2.forecastHumidity3}
                    wind={this.state.weather2.forecastWind3}
                  />
                </Carousel.Item>

                <Carousel.Item className='card-height'>
                  <Forecast
                    date={this.state.weather2.forecastDate4}
                    timezone={this.state.weather.timezone}
                    description={this.state.weather2.forecastDescription4}
                    temp={this.state.weather2.forecastTemp4}
                    humidity={this.state.weather2.forecastHumidity4}
                    wind={this.state.weather2.forecastWind4}
                  />
                </Carousel.Item>

                <Carousel.Item className='card-height'>
                  <Forecast
                    date={this.state.weather2.forecastDate5}
                    timezone={this.state.weather.timezone}
                    description={this.state.weather2.forecastDescription5}
                    temp={this.state.weather2.forecastTemp5}
                    humidity={this.state.weather2.forecastHumidity5}
                    wind={this.state.weather2.forecastWind5}
                  />
                </Carousel.Item>
              </Carousel>
              <div className="col-md-1" />
            </div> */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="loader">
          {/* <Loader type="Plane" color="#333" height="100" width="100" />; */}
        </div>
      );
    }
  }
}
