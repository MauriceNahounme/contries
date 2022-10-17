import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [radioValue, setRadioValue] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const fetchAllCountries = () => {
    // try {
    //   const data = axios.get("https://restcountries.com/v3.1/all");
    //   console.log(data);
    //   setCountries(data);
    // } catch (error) {
    //   console.log(error);
    // }

    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const handleChange = (e) => {
    setRangeValue(e.target.value);
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.id);
  };

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={handleChange}
        />
        {rangeValue}
        {radios.map((continent) => {
          return (
            <li>
              <input
                type="radio"
                htmlFor={continent}
                id={continent}
                name="continentRadio"
                checked={continent === radioValue}
                value={continent}
                onChange={handleRadioChange}
              />
              <label for={continent}>{continent}</label>
            </li>
          );
        })}
      </ul>

      {radioValue ? (
        <button
          onClick={() => {
            return setRadioValue(""), setRangeValue(36);
          }}
        >
          Annuler la recherche
        </button>
      ) : (
        ""
      )}

      <ul>
        {countries
          .filter((country) => country.continents[0].includes(radioValue))
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => {
            return <Card key={index} country={country} />;
          })}
      </ul>
    </div>
  );
};

export default Countries;
