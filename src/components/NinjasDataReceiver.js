import * as React from "react";
import axios from "axios";

function NinjasDataReceiver(props) {
    const ninjasKey = "0zgOCCJC/jn81f7/cROrhA==wJwq24zmBEOhKiIm";
    const [ninjasData, setNinjasData] = React.useState([])

    if (!ninjasData.length) {
        if (props.country) {
            let cursor = '';
            let hasNextPage = true;
            let temporaryData = [];
            const regionsRequest = () => {
                axios.get(`https://api.api-ninjas.com/v1/city?country=${props.country}&min_population=100000&limit=300&paginationOffset=100`, {
                    headers: {
                        'X-Api-Key': `${ninjasKey}`,

                    }
                })
                    .then(res => {
                        console.log('ninjas', res.data);
                        setNinjasData(res.data);


                        // props.updateOxilorData(JSON.stringify(res.data));
                    });
            }

                    regionsRequest();






                }
    }
    return (
        <>
            <div>{props.render(ninjasData)}</div>
        </>
    );
}

export default NinjasDataReceiver;