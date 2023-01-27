import * as React from "react";
import axios from "axios";

function OxilorDataReceiver(props) {
    const oxilorKey = "oaXRift5tRFYr_sctaJPDb9BuKihPC";
    const [oxilorData, setOxilorData] = React.useState([])
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
                        console.log('cntr');
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
                        console.log('sr');
                        setOxilorData(res.data);
                        // props.updateOxilorData(JSON.stringify(res.data));
                    });
                break;
            case 'nearest-regions':
                axios.get(`https://data-api.oxilor.com/rest/${props.method}?latitude=${props.lat}&longitude=${props.lon}&type=city`,
                    {
                        headers: {
                            'Authorization': `Bearer ${oxilorKey}`,
                            'Accept-Language': 'en'
                        }
                    })
                    .then(res => {
                        console.log('nr');
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
                        console.log('cr');
                        setOxilorData(res.data);

                        // props.updateOxilorData(JSON.stringify(res.data));
                    });
                break;
            case 'regions':
                if (props.countryCode) {
                    let cursor = '';
                    let hasNextPage = true;
                    let temporaryData = [];
                    const regionsRequest = () => {
                        axios.get(`https://data-api.oxilor.com/rest/${props.method}?type=city&countryCode=${props.countryCode}&
                        first=100${cursor ? '&after=' + cursor : ''}`, {
                            headers: {
                                'Authorization': `Bearer ${oxilorKey}`,
                                'Accept-Language': 'en'
                            }
                        })
                            .then(res => {
                                console.log('r');
                                cursor = res.data.pageInfo.endCursor;
                                hasNextPage = res.data.pageInfo.hasNextPage;
                                temporaryData = temporaryData.concat(res.data.edges)
                                console.log(temporaryData)


                                console.log(cursor)
                                console.log(hasNextPage)

                                if(hasNextPage) regionsRequest();

                                // props.updateOxilorData(JSON.stringify(res.data));
                            });
                    }

                    // regionsRequest();
                    // setOxilorData(temporaryData);





                }
                break;
            default:
                console.log('Wrong oxilor method');
        }
    }
    return (
        <>
            <div>{props.render(oxilorData)}</div>
        </>
    );
}

export default OxilorDataReceiver;