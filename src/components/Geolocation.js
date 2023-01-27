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

    const [oxilorData, setOxilorData] = React.useState('');
    const updateOxilorData = (value) => {
        setOxilorData(value);
        console.log('--!!!--')
        // setLocation(eval(oxilorData));
    };
    const [location, setLocation] = React.useState({lat: 0, lon: 0});
    const [country, setCountry] = React.useState({name: '', id: '', countryCode: ''});
    const [city, setCity] = React.useState('');
    const [coordsInit, setCoordsInit] = React.useState(false);
    const [autoGeo, setAutoGeo] = React.useState(false);
    let newCountry = true;


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
    });

    function updateLocation(loc) {
        setLocation({lat: loc.lat, lon: loc.lon})

    }

    function updateCountry (cntr) {
        toggleCityUpdate();

        setCountry({name: cntr.name, id: cntr.id, countryCode: cntr.countryCode});

    }

    function toggleCityUpdate () {
        console.log('toggled', newCountry)
        newCountry = !newCountry;
    }

    function updateCity (cty) {
        setCity(cty);
    }

    return (
        <>

            {autoGeo && location.lat && !country.id ?
                (<OxilorDataReceiver method={'nearest-regions'}
                    lat={location.lat.toFixed(4)}
                    lon={location.lon.toFixed(4)}
                    render={(data) => data[0] ?
                        (<>
                            {updateCity(data[0].name)}
                            {updateCountry({name: data[0].parentRegions[data[0].parentRegions.length - 2].name,
                                id: data[0].parentRegions[data[0].parentRegions.length - 2].id,
                                countryCode: data[0].countryCode})}
                            <div>city: {city}&nbsp;
                            country: {country.name}&nbsp;
                            id: {country.id}</div>
                        </>):''
                    } />): ''}

            <OxilorDataReceiver method={'countries'} render={(data) => (
                <>
                    <Countries countries={data} country={country} onData={updateCountry}/>
                </>)}/>
            {/*<OxilorDataReceiver method={'regions'} countryCode={country.countryCode} render={(data) => (*/}
            {/*    <>*/}
            {/*        <Cities cities={data} city={city} onData={updateCity}/>*/}
            {/*    </>)}/>*/}
            <GetpostmanDataReceiver country={country.name} newCountry={newCountry} render={(data) => (
                <Cities cities={data} city={city} toggleUpdate={toggleCityUpdate} onData={updateCity}/>
            )}/>
            <div>{location.lat} {location.lon}</div>
            <div>{country.id} {country.name} {country.countryCode} {city}</div>
        </>
    );
};

export default Geolocation;