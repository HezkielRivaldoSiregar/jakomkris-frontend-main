import React, { Component } from "react";
import axios from "axios";
import BadgeTemp from "./BadgeTemp";
import HumanDate from "./HumanDate";
import WeatherIcon from "./WeatherIcon";
import ChangeDegrees from "./ChangeDegrees";
import NightDayIcon from "./NightDayIcon";
import "./weather.scss";

export default class BadgeCity extends Component {
  apiKey = "7833aae64dcd3fcf5a133f4352863fa2";
  apiRoot = "https://api.openweathermap.org";

  state = {
    loaded: false
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

  search = city => {
    let apiUrl = `${this.apiRoot}/data/2.5/weather?q=${city}&appid=${this.apiKey
      }&units=metric&lang=id`;
    axios.get(apiUrl).then(this.showResults);
  };

  componentDidMount() {
    this.search(this.props.city);
  }

  render() {
    if (this.state.weatherLoaded) {
      return (
        <div>
          <div>
            <BadgeTemp temperaturestamp={this.state.weather.temperature} />
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
