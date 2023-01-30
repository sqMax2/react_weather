import * as React from "react";

function WeatherSelector (props) {
    const optionList = props.types;
    let options = [];

    let selectorKey = 0
    options = optionList.map((option) => {
            return (<option key={selectorKey++} value={option.value}>{option.name}</option>)
        }
    );

    return (
        <>
            <label htmlFor='forecast-select'>Forecast type:&nbsp;</label>
            <select value={props.type} name='forecast' id='forecast-select'
                    onChange={(evt) => props.onChange(evt.target.value)}>
                {options}
            </select>
        </>
    );
}

export default WeatherSelector;