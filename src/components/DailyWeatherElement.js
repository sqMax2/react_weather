import * as React from "react";

function DailyWeatherElement(props) {
    console.log('--daily--', props)
    return (
        <tr>
            <td>{props.time}</td>
            <td>{props.temperatureMin} {props.temperatureUnit}</td>
            <td>{props.temperatureMax} {props.temperatureUnit}</td>
            <td>{props.rain} {props.rainUnit}</td>
            <td>{props.snow} {props.snowUnit}</td>
        </tr>
    )
}

export default DailyWeatherElement;