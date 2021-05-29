import React from "react";
import "./weather.css";

const Weather = props => {
  return (
    <div>
      
      <div className="weather-container">
        <h1 className="text-white py-3">{props.cityname}</h1>
        <div className="icon">
          <i className={`wi ${props.weatherIcon} display-1`} />
        </div>

        {/* Get Celsius */}
        {props.temp_celsius ? (
          <h1 className="temp">{props.temp_celsius}&deg;</h1>
        ) : null}

        {/* show max and min temp */}
        {maxminTemp(props.temp_min, props.temp_max)}

        {/* Weather description */}
        <h4 className="py-3">
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4>
      </div>
    </div>
  );
};

export default Weather;

function maxminTemp(min, max) {
  if (max && min) {
    return (
      <h3>
        <span className="px-4">Min: {min}&deg;</span>
        <span className="px-4">Max: {max}&deg;</span>
      </h3>
    );
  }
}