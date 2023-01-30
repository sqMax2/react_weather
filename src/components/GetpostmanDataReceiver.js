import * as React from "react";
import axios from "axios";

function GetpostmanDataReceiver(props) {
    const [postmanData, setPostmanData] = React.useState([])

    if (props.updateData) {
        if (props.country) {
            const regionsRequest = () => {

                axios.post(`https://countriesnow.space/api/v0.1/countries/cities`, {
                    "country": props.country
                    }, {}
                )
                    .then(res => {

                        setPostmanData(res.data.data);
                    });
            }
            regionsRequest();
        }
    }
    return (
        <>
            <div>{props.render(postmanData)}</div>
        </>
    );
}

export default GetpostmanDataReceiver;