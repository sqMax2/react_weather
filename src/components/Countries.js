import * as React from "react";
import axios from "axios";

function Countries (props) {
    const countries = props.countries;
    const handleChange = (evt) => {

    }
    let options = []
    if (countries.length) {
        options = countries.map((country) => {
                return (<option key={country.id} value={country.countryCode+'_'+country.id}>{country.name}</option>)
            }
        );
        React.useEffect(() => {props.setCountriesLoaded(true)}, []);
    }
    else {
        options = (<option key='0' value=''>--loading countries--</option>);
    }
    return (
        <>
            <label htmlFor='country-select'>Choose a country: </label>
            <select value={props.country.countryCode+'_'+props.country.id} name='countries' id='country-select'
                    onChange={(evt) => {
                        console.log('country change')
                        const [countryCode, id] = evt.target.value.split('_');

                        props.setCitiesLoaded(false);

                            props.onData({
                                name: evt.target[evt.target.selectedIndex].text,
                                id: id,
                                countryCode: countryCode
                            });
                        }}>
                {options}
            </select>
        </>
    );
}

export default Countries;