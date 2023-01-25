import * as React from "react";
import { useGeolocated } from "react-geolocated";

import OxilorDataReceiver from "./OxilorDataReceiver";
import Countries from "./Countries";

const Geolocation = () => {
    const [oxilorData, setOxilorData] = React.useState('');
    const updateOxilorData = (value) => {
        setOxilorData(value);
        console.log('imajerk')
        // setLocation(eval(oxilorData));
    };
    const [location, setLocation] = React.useState({})

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <>

            <OxilorDataReceiver method={'nearest-regions'} lat={coords.latitude} lon={coords.longitude} render={(data) => (
                <>
                    {console.log(data[0])}
                </>)}/>

            <OxilorDataReceiver method={'countries'} lat={coords.latitude} lon={coords.longitude} render={(data) => (
                <>
                    {console.log(data)}
                    <Countries countries={data}/>
                </>)}/>

            <table>
                <tbody>
                <tr>
                    <td>latitude</td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{coords.longitude}</td>
                </tr>

                </tbody>
            </table>
        </>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
};

export default Geolocation;