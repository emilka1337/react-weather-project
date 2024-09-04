import React, { useEffect, useState } from "react";
import Clocks from "./Clocks";
import axios from "axios";
import City from "./City";

function CityAndDate() {
    return (
        <div className="city-and-date">
            <City />
            <Clocks />
        </div>
    );
}

export default React.memo(CityAndDate);
