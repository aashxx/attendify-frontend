import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

const AlertState = (props) => {

    const [alert, setAlert] = useState(null);

    // Function that takes the alert message and box color as params
    const showAlert = (msg, color) => {
        setAlert({
            message: msg,
            color: color
        })
        setTimeout(() => {
          setAlert(null);
        }, 2000);
    }

    return (
        <AlertContext.Provider value={{alert, showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;
