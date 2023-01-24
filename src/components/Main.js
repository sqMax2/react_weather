import * as React from "react";
import {YMaps, Map} from "@pbe/react-yandex-maps";


import "../styles/Main.css";



function Main() {
    return (
        <main>
            <YMaps query={{ lang: 'en_RU' }}>
                <div>
                    Select location
                    <Map
                        defaultState={{
                            center: [55.75, 37.57],
                            zoom: 9,
                            controls: ['zoomControl', 'geolocationControl'] }}
                        modules={["control.ZoomControl", "control.GeolocationControl"]} />
                </div>
            </YMaps>
        </main>
    );
}

export default Main;