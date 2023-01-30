import * as React from "react";
import axios from "axios";

function OpenMeteoDataReceiver(props) {
    const [openMeteoData, setOpenMeteoData] = React.useState([]);
    const today = new Date();
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate()+7);
    const todayString = today.toISOString().split('T')[0];
    const weekLaterString = weekLater.toISOString().split('T')[0];

    if (props.updateData) {
        if (props.timezone) {
            const weatherRequest = () => {

                axios.get(`https://api.open-meteo.com/v1/forecast?`
                +`latitude=${props.location.lat.toFixed(4)}&longitude=${props.location.lon.toFixed(4)}`
                +`&hourly=temperature_2m,rain,snowfall`
                +`&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum`
                +`&timezone=${encodeURIComponent(props.timezone)}`
                +`&start_date=${todayString}`
                +`&end_date=${weekLaterString}`)
                    .then(res => {
                        setOpenMeteoData(res.data);
                    });
            }
            weatherRequest();
        }
    }
    return (
        <>
            <div>{props.render(openMeteoData)}</div>
        </>
    );
}

export default OpenMeteoDataReceiver;