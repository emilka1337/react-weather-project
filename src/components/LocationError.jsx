import { useEffect, useState } from "react";

function LocationError(props) {
    let [errorText, setErrorText] = useState("");
    console.log(props.locationError.code);

    useEffect(() => {
        if (props.locationError) {
            setErrorText(props.locationError.message);
            setTimeout(function () {
                document.querySelector(".location-error").classList.add("show");
            }, 1000);
        }
    }, [errorText, props.locationError]);

    return (
        <div className="location-error">
                <h3>Something went wrong while getting your location :(</h3>
                <p>{`Error message: ${errorText}`}</p>
        </div>
    );
}

export default LocationError;
