import * as React from "react";

import {Table} from "react-bootstrap";

import OxilorDataReceiver from "./OxilorDataReceiver";
import Countries from "./Countries";
import Cities from "./Cities";
import GetpostmanDataReceiver from "./GetpostmanDataReceiver";
import OpenMeteoDataReceiver from "./OpenMeteoDataReceiver";
import HourlyWeatherElement from "./HourlyWeatherElement";
import WeatherSelector from "./WeatherSelector";
import DailyWeatherElement from "./DailyWeatherElement";


const Geolocation = () => {
    const optionsGeo = {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0
    };
    const forecastTypeList = [{value: 'hourly', name: 'Two days hourly forecast'},
        {value: 'daily', name: 'Seven days daily forecast'}];

    const [location, setLocation] = React.useState({lat: 0, lon: 0});
    const [timezone, setTimezone] = React.useState('');
    const [country, setCountry] = React.useState({name: '', id: '', countryCode: ''});
    const [city, setCity] = React.useState('');
    const [coordsInit, setCoordsInit] = React.useState(false);
    const [autoGeo, setAutoGeo] = React.useState(false);
    const [newCountry, setNewCountry] = React.useState(true);
    const [countriesLoaded, setCountriesLoaded] = React.useState(false);
    const [citiesLoaded, setCitiesLoaded] = React.useState(true);
    const [locationLoaded, setLocationLoaded] = React.useState(false);
    const [weatherUpdatetd, setWeatherUpdated] = React.useState(false);
    const [forecastType, setForecastType] = React.useState(forecastTypeList[0].value);

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
        setCity(cty);
        setLocationLoaded(false);
    }

    React.useEffect(() => setWeatherUpdated(false), [locationLoaded]);

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
                            {setTimezone(data[0].timezone)}
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

            <GetpostmanDataReceiver country={country.name} newCountry={newCountry} updateData={!citiesLoaded}
                                    render={(data) => (<Cities cities={data} city={city}
                                                               toggleUpdate={toggleCityUpdate}
                                                               setCitiesLoaded={setCitiesLoaded} onData={updateCity}/>
            )}/>
            <div>Selected location is: {country.name} {city}</div>

            <OxilorDataReceiver method={'search-regions'} city={city} countryCode={country.countryCode}
                                updateData={!locationLoaded} render={(data) => {
                if(data[0] && !locationLoaded? data[0].latitude : false) {
                    setLocationLoaded(true);
                    setLocation({lat: data[0].latitude, lon: data[0].longitude});
                    setTimezone(data[0].timezone);
                }
                return (<>
                </>);
            }}/>

            <div><WeatherSelector types={forecastTypeList} type={forecastType} onChange={setForecastType} /></div>

            <OpenMeteoDataReceiver updateData={!weatherUpdatetd} location={location} timezone={timezone}
                render={(data) => {
                    switch (forecastType) {
                        case forecastTypeList[0].value:
                            if(data.hourly) {
                                setWeatherUpdated(true);
                                let temperatureUnit = data.hourly_units.temperature_2m;
                                let rainUnit = data.hourly_units.rain;
                                let snowUnit = data.hourly_units.snowfall;
                                let hourlyTime = data.hourly.time.map((elem) => new Date(elem));
                                let hourlyTemperature = data.hourly.temperature_2m;
                                let hourlyRain = data.hourly.rain;
                                let hourlySnow = data.hourly.snowfall;
                                let hourlyData = [];
                                for (let i = 0; i < 48; i++) {
                                    hourlyData.push({
                                        key: i, time: hourlyTime[i], temperature: hourlyTemperature[i],
                                        rain: hourlyRain[i], snow: hourlySnow[i]
                                    });
                                }


                                return (<>
                                    <Table striped>
                                        <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Temperature</th>
                                            <th>Rain</th>
                                            <th>Snow</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {hourlyData.map((elem) =>
                                            <HourlyWeatherElement key={elem.key}
                                                time={elem.time.toLocaleString('en-GB')}
                                                temperature={elem.temperature}
                                                rain={elem.rain} snow={elem.snow}
                                                temperatureUnit={temperatureUnit}
                                                rainUnit={rainUnit} snowUnit={snowUnit}/>
                                        )}
                                        </tbody>
                                    </Table>
                                </>);
                            }
                            break;

                        case forecastTypeList[1].value:
                            if(data.daily) {
                                setWeatherUpdated(true);
                                let temperatureUnit = data.daily_units.temperature_2m_max;
                                let rainUnit = data.daily_units.rain_sum;
                                let snowUnit = data.daily_units.snowfall_sum;
                                let dailyTime = data.daily.time.map((elem) => new Date(elem));
                                let dailyTemperatureMax = data.daily.temperature_2m_max;
                                let dailyTemperatureMin = data.daily.temperature_2m_min;
                                let dailyRain = data.daily.rain_sum;
                                let dailySnow = data.daily.snowfall_sum;
                                let dailyData = [];
                                for (let i = 0; i < dailyTime.length; i++) {
                                    dailyData.push({
                                        key: i, time: dailyTime[i], temperatureMax: dailyTemperatureMax[i],
                                        temperatureMin: dailyTemperatureMin[i], rain: dailyRain[i], snow: dailySnow[i]
                                    });
                                }

                                return (<>
                                    <Table striped>
                                        <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Temperature Min</th>
                                            <th>Temperature Max</th>
                                            <th>Rain</th>
                                            <th>Snow</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {dailyData.map((elem) =>
                                            <DailyWeatherElement key={elem.key}
                                                time={elem.time.toLocaleString('en-GB')}
                                                temperatureMin={elem.temperatureMin}
                                                temperatureMax={elem.temperatureMax}
                                                rain={elem.rain} snow={elem.snow}
                                                temperatureUnit={temperatureUnit}
                                                rainUnit={rainUnit} snowUnit={snowUnit}/>
                                        )}
                                        </tbody>
                                    </Table>
                                </>);
                            }
                            break;
                    }
                }} />
        </>
    );
};

export default Geolocation;