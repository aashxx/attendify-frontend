import React, { createContext, useState } from 'react';

export const AttendContext = createContext();

const AttendState = (props) => {

    // Connecting to the backend server
    const host = "https://attendify-7snh.onrender.com/"
    const [subs, setSubs] = useState([]);
    const [load, setLoad] = useState(true);

    // Fetch all subjects
    const fetchSubs = async () => {
        // API call for server side
        props.setProgress(30);
        const response = await fetch(`${host}api/attendance/fetchalldata`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        setLoad(true)
        const json = await response.json();
        props.setProgress(70);

        //Client side
        setSubs(json);
        setLoad(false);
        props.setProgress(100);
    }

    // Add a new subject
    const addSub = async (subject) => {
        // API call for server side
        const response = await fetch(`${host}api/attendance/adddata`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({subject})
        });
        setLoad(true)
        const sub = await response.json();

        // Client side
        setSubs(subs.concat(sub));
        setLoad(false);
    }

    // Delete existing subject
    const deleteSub = async (id) => {
        // API call for server side
        const response = await fetch(`${host}api/attendance/deletedata/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        setLoad(true);
        const json = await response.json();

        // Client side
        let newSubs = subs.filter((sub) => sub._id !== id);
        setSubs(newSubs);
        setLoad(false);
    }

    // Update the attendance of the subject
    let newSubs = JSON.parse(JSON.stringify(subs));
    const updateSub = async (id, subject, present, classes, percent) => {
        // API call for server side
        const response = await fetch(`${host}api/attendance/updatedata/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({subject, present, classes, percent})
        });
        setLoad(true);
        const json = await response.json();

        // Client side
        for (let index = 0; index < newSubs.length; index++) {
            const element = newSubs[index];
            if(element._id === id) {
                element.subject = subject;
                element.present = present;
                element.classes = classes;
                element.percent = percent;
                break;
            }
        }
        setSubs(newSubs);
        setLoad(false);
    }

    return (
        <AttendContext.Provider value={{load, subs, fetchSubs, addSub, deleteSub, updateSub}}>
            {props.children}
        </AttendContext.Provider>
    )
}

export default AttendState;


