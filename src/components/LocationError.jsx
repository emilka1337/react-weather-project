import { useEffect, useState } from "react";

function LocationError(props) {
    let [errorText, setErrorText] = useState("");
    console.log(props.locationError.code);

    useEffect(() => {
        if (props.locationError && props.locationError.code == 1) {
            setErrorText(props.locationError.message);
        } else if (props.locationError && props.locationError.code == 2) {
            setErrorText(props.locationError.message);
        } else if (props.locationError && props.locationError.code == 3) {
            setErrorText(props.locationError.message);
        }
    }, [errorText, props.locationError]);

    return (
        <div
            className={
                props.locationError ? "location-error show" : "location-error"
            }
        >
            <h3>Something went wrong while getting your location :(</h3>
            <p>{`Error message: ${errorText}`}</p>
        </div>
    );
}

export default LocationError;
