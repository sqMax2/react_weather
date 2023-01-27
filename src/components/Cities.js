import * as React from "react";
import axios from "axios";

function Cities (props) {
    const cities = props.cities;
    const handleChange = (evt) => {
    console.log('cities')
    }
    let options = []
    props.toggleUpdate();

    if (cities.length) {
        let cityKey = 0
        options = cities.map((city) => {


                return (<option key={cityKey++} value={city}>{city}</option>)
            }
        );
    }
    else {
        options = (<option key='0' value=''>--loading cities--</option>);
    }
    return (
        <>
            <label htmlFor='city-select'>Choose a city: </label>
            <select value={props.city} name='cities' id='city-select'
                    onChange={(evt) => props.onData(evt.target[evt.target.selectedIndex].text)}>
                {options}
            </select>
        </>
    );
}

export default Cities;