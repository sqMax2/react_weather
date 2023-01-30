import * as React from "react";

function HourlyWeatherElement(props) {
    return (
        <tr>
            <td>{props.time}</td>
            <td>{props.temperature} {props.temperatureUnit}</td>
            <td>{props.rain} {props.rainUnit}</td>
            <td>{props.snow} {props.snowUnit}</td>
        </tr>
    )
}

export default HourlyWeatherElement;