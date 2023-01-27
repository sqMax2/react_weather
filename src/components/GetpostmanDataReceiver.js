import * as React from "react";
import axios from "axios";

function GetpostmanDataReceiver(props) {
    // const ninjasKey = "0zgOCCJC/jn81f7/cROrhA==wJwq24zmBEOhKiIm";
    const [postmanData, setPostmanData] = React.useState([])

    if (!postmanData.length || props.newCountry) {
        if (props.country) {
            let cursor = '';
            let hasNextPage = true;
            let temporaryData = [];
            const regionsRequest = () => {

                axios.post(`https://countriesnow.space/api/v0.1/countries/cities`, {
                    "country": props.country
                    }, {}
                )
                    .then(res => {
                        console.log('postman', res.data.data);
                        setPostmanData(res.data.data);


                        // props.updateOxilorData(JSON.stringify(res.data));
                    });
            }

            // regionsRequest();






        }
    }
    return (
        <>
            <div>{props.render(postmanData)}</div>
        </>
    );
}

export default GetpostmanDataReceiver;