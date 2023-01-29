import * as React from "react";
// import { useGeolocated } from "react-geolocated";

import OxilorDataReceiver from "./OxilorDataReceiver";
import Countries from "./Countries";
import Cities from "./Cities";

import GetpostmanDataReceiver from "./GetpostmanDataReceiver";

const Geolocation = () => {
    const optionsGeo = {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0
    };

    const [location, setLocation] = React.useState({lat: 0, lon: 0});
    const [country, setCountry] = React.useState({name: '', id: '', countryCode: ''});
    const [city, setCity] = React.useState('');
    const [coordsInit, setCoordsInit] = React.useState(false);
    const [autoGeo, setAutoGeo] = React.useState(false);
    const [newCountry, setNewCountry] = React.useState(true);
    const [countriesLoaded, setCountriesLoaded] = React.useState(false);
    const [citiesLoaded, setCitiesLoaded] = React.useState(true);
    const [locationLoaded, setLocationLoaded] = React.useState(false);


    function successGeo(loc) {
        setLocation({lat: loc.coords.latitude, lon: loc.coords.longitude});
    }

    function errorGeo(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const coords = () => {
        navigator.geolocation.getCurrentPosition(successGeo, errorGeo, optionsGeo);
    };

    React.useEffect(() => {
        if (!coordsInit) {
            coords();
            setCoordsInit(true);
            setAutoGeo(true);
        }
    }, []);

    function updateCountry (cntr) {
        toggleCityUpdate(true);
        setCitiesLoaded(false);

        setCountry({name: cntr.name, id: cntr.id, countryCode: cntr.countryCode});

    }

    function toggleCityUpdate (value) {
        setNewCountry(value);
    }

    function updateCity (cty) {
        console.log('--city updated--')
        setCity(cty);
        setLocationLoaded(false);
    }

    return (
        <>

            {autoGeo && location.lat && !country.id ?
                (<OxilorDataReceiver method={'nearest-regions'}
                    lat={location.lat.toFixed(4)}
                    lon={location.lon.toFixed(4)}
                    updateData={true}
                    render={(data) => data[0] ?
                        (<>
                            {setAutoGeo(false)}
                            {updateCity(data[0].name)}
                            {setLocationLoaded(true)}
                            {updateCountry({name: data[0].parentRegions[data[0].parentRegions.length - 2].name,
                                id: data[0].parentRegions[data[0].parentRegions.length - 2].id,
                                countryCode: data[0].countryCode})}
                            <div>city: {city}&nbsp;
                            country: {country.name}&nbsp;
                            id: {country.id}</div>
                        </>):''
                    } />): ''}

            <OxilorDataReceiver method={'countries'} updateData={!countriesLoaded} render={(data) => (
                <>
                    <Countries countries={data} country={country} onData={updateCountry}
                               setCountriesLoaded={setCountriesLoaded}
                               setCitiesLoaded={setCitiesLoaded}
                    />
                </>)}/>

            <GetpostmanDataReceiver country={country.name} newCountry={newCountry} updateData={!citiesLoaded} render={(data) => (
                <Cities cities={data} city={city} toggleUpdate={toggleCityUpdate} setCitiesLoaded={setCitiesLoaded} onData={updateCity}/>
            )}/>{console.log('cities loaded: ', citiesLoaded)}
            <div>{location.lat} {location.lon}</div>
            <div>{country.id} {country.name} {country.countryCode} {city}</div>

            <OxilorDataReceiver method={'search-regions'} city={city} countryCode={country.countryCode}
                                updateData={!locationLoaded} render={(data) => {
                                    console.log(data[0]?data[0].latitude:'', data[0]?data[0].name:'')
                console.log('locloaded: ', locationLoaded)
                if(data[0] && !locationLoaded? data[0].latitude : false) {
                    setLocationLoaded(true);
                    console.log('changing loc')
                    setLocation({lat: data[0].latitude, lon: data[0].longitude});

                }

                return (<>
                    <div>

                    </div>

                </>)
            }}/>
        </>
    );
};

export default Geolocation;