function SelectedTemperature({temperature}) {
    return (
        <h1 className="selected-temperature">
            {temperature}
            <span className="degree">°</span>
        </h1>
    );
}

export default SelectedTemperature;