import React, { useMemo } from "react";

function Greeting({time}) {
    const greeting = useMemo(() => {
        if (time >= 0 && time < 6) {
            return "Good Night";
        } else if (time >= 6 && time < 12) {
            return "Good Morning";
        } else if (time >= 12 && time < 18) {
            return "Have a nice day";
        } else if (time >= 18 && time <= 23) {
            return "Good Evening";
        }
    }, [time])
    
    return (
        <h3 className="greeting">{greeting}</h3>
    )
}

export default React.memo(Greeting);