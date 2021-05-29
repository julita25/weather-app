import React from "react";
import "./App.css";
import Form from "./components/form";
import Weather from "./components/Weather";
import "bootstrap/dist/css/bootstrap.min.css";

// git project https://github.com/erikflowers/weather-icons
import "weather-icons/css/weather-icons.css";

const Api_Key = "37251eba15de0d246eddbfb1a1baa180";//key from weather site
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }//depemding on the number a weather icon is given

  calCelsius(temp) {//formula to give result in celsius
    let c = Math.floor(temp - 273.15);
    return c;
  }


  //we use the api k
  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {//the call is only done if the user inputs both values

      const api_call = await fetch(//forthe api call we use the base URL
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const data = await api_call.json();

      this.setState({
        city: `${data.name}, ${data.sys.country}`,
        country: data.sys.country,
        main: data.weather[0].main,
        celsius: this.calCelsius(data.main.temp),
        temp_max: this.calCelsius(data.main.temp_max),
        temp_min: this.calCelsius(data.main.temp_min),
        description: data.weather[0].description,
        error: false
      });

      // seting icons
      this.get_WeatherIcon(this.weatherIcon, data.weather[0].id);

      console.log(data);
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (

      <div className="App">
        <div className="container">
          {/*we pass the getWeather as props for the form component */}
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          cityname={this.state.city}
          weatherIcon={this.state.icon}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
        </div>
       
      </div>
    );
  }
}

export default App;
