import React, { useContext } from 'react';
import "../index.css";
import { AlertContext } from '../contexts/AlertContext'; // Alerts Context API


const Alert = () => {
    const alertContext = useContext(AlertContext);
    const {alert} = alertContext;  // Import showAlert from Alerts Context API

    return (
        <div>
            {
                alert &&
                <div className='alertBox' style={{backgroundColor: `${alert.color}`}}>
                    <p>{alert.message}</p>
                    <div className="unloads"></div>
                </div>
            }
        </div>
    )
}

export default Alert;
