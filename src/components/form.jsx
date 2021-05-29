import React from "react";
import "./form.css";

const Form = props => {
  return (
    <div className= "form-wrapper">
      <h2 className= "title">Weather App</h2>
      <form onSubmit={props.loadweather}>{/*on the even the form submits load the method from app.js */}
        <div>{props.error ? error() : ""}</div>
        <div className="search-form">
            <input
              type="text"
              placeholder="City"
              name="city"
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              autoComplete="off"
            />     

            <button >Get</button>

        </div>
      </form>
    </div>
  );
};

const error = props => {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter City and Country...!
    </div>
  );
};

export default Form;
