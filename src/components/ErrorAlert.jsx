import { useEffect, useRef } from "react";

function ErrorAlert(props) {
    let errorAlertRef = useRef()

    useEffect(() => {
        if (props.error.name || props.error.message) {
            console.log(props.error);

            setTimeout(() => {
                errorAlertRef.current.classList.add("show");
            }, 1000);
        }
    }, [props.error]);

    return (
        <div className="error-alert" ref={errorAlertRef}>
            <h3>Something went wrong :(</h3>
            <p><span>Error Name/Code:</span> {`${props.error.name ?? props.error.code}`}</p>
            <p><span>Error message:</span> {`${props.error.message}`}</p>
        </div>
    );
}

export default ErrorAlert;
