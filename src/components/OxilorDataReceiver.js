import * as React from "react";
import axios from "axios";

function OxilorDataReceiver(props) {
    const oxilorKey = "oaXRift5tRFYr_sctaJPDb9BuKihPC";
    const [oxilorData, setOxilorData] = React.useState({})
    if (!oxilorData.length) {
        switch (props.method) {
            case 'countries':
                axios.get(`https://data-api.oxilor.com/rest/${props.method}`, {
                    headers: {
                        'Authorization': `Bearer ${oxilorKey}`,
                        'Accept-Language': 'en'
                    }
                })
                    .then(res => {
                        setOxilorData(res.data);
                        // props.updateOxilorData(JSON.stringify(res.data));
                    });
                break;
            case 'search-regions':
                axios.get(`https://data-api.oxilor.com/rest/${props.method}?searchTerm=${props.city}&type=city`, {
                    headers: {
                        'Authorization': `Bearer ${oxilorKey}`,
                        'Accept-Language': 'en'
                    }
                })
                    .then(res => {
                        setOxilorData(res.data);
                        // props.updateOxilorData(JSON.stringify(res.data));
                    });
                break;
            case 'nearest-regions':
                axios.get(`https://data-api.oxilor.com/rest/${props.method}?latitude=${props.lat}&longitude=${props.lon}`, {
                    headers: {
                        'Authorization': `Bearer ${oxilorKey}`,
                        'Accept-Language': 'en'
                    }
                })
                    .then(res => {
                        console.log('nr')
                        setOxilorData(res.data);
                        // return (
                        //     <div>{props.render(res.data)}</div>
                        // );
                        // props.updateOxilorData(JSON.stringify(res.data));
                    });
                break;
            case 'child-regions':
                axios.get(`https://data-api.oxilor.com/rest/${props.method}?parentId=${props.parentId}`, {
                    headers: {
                        'Authorization': `Bearer ${oxilorKey}`,
                        'Accept-Language': 'en'
                    }
                })
                    .then(res => {
                        setOxilorData(res.data);

                        // props.updateOxilorData(JSON.stringify(res.data));
                    });
                break;
            default:
                console.log('Wrong oxilor method');
        }
    }
    return (
        <>
            <div>wtf!?</div>
            <div>{props.render(oxilorData)}</div>
        </>
    );
}

export default OxilorDataReceiver;