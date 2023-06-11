import React, { Component } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default class WeatherIcon extends Component {
  ShowIcon = () => {
    if (this.props.weather === "langit cerah") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="CLEAR_DAY"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "sedikit berawan") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="PARTLY_CLOUDY_DAY"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "awan tersebar") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="CLOUDY"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "awan pecah") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="PARTLY_CLOUDY_DAY"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "awan mendung") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="PARTLY_CLOUDY_DAY"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "shower rain") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="RAIN"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "hujan") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="RAIN"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "hujan sedang") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="RAIN"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "hujan rintik-rintik") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="RAIN"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "light intensity shower rain") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="RAIN"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "shower rain") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="RAIN"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "thunderstorm") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="RAIN"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "snow") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="SNOW"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    }else if (this.props.weather === "salju ringan") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="SNOW"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    }
     else if (this.props.weather === "mist") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="FOG"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    } else if (this.props.weather === "haze") {
      return (
        <div>
          <ReactAnimatedWeather
            icon="FOG"
            color="black"
            size={25}
            animate={true}
          />
        </div>
      );
    }
  };

  render() {
    return <div>{this.ShowIcon()}</div>;
  }
}
