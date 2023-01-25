import * as React from "react";
import axios from "axios";

function Countries (props) {
    // const [countries, setCountries] = React.useState([]);
    const countries = props.countries;
    console.log(props.countries);
    console.log(countries.length);
    let options = []
    if (countries.length) {
        options = countries.map((country) =>
            <option key={country.id} value={country.id}>{country.name}</option>
        );
    }
    else {
        options = (<option key='0' value=''>--loading countries--</option>);
    }
    return (
        <>
            <label htmlFor='country-select'>Choose a country</label>
            <select name='countries' id='country-select'>
                {options}
            </select>
        </>
    );
}

export default Countries;