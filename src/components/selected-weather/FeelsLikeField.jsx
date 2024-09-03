function FeelsLikeField({temperature}) {
    return (
        <p className="feels-like">
            {`Feels like: ${getFeelsLikeValue()}`}
            <span className="degree">°</span>
        </p>
    );
}

export default FeelsLikeField