import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './AlertContext'; // Alerts Context API

export const AuthContext = createContext();

const AuthState = (props) => {

    // Connecting to the backend server
    const host = "https://attendify-7snh.onrender.com/"
    const [signCredentials, setSignCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
    const [logCredentials, setLogCredentials] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({});
    const [userName, setUserName] = useState([]);

    // Show Password
    const [showPass, setShowPass] = useState('password');

    let navigate = useNavigate();

    // Alerts Context API
    const context = useContext(AlertContext);
    const {showAlert} = context;

    // Inputs the signup credentials
    const handleSignChange = (event) => {
        setSignCredentials({...signCredentials, [event.target.name]: event.target.value});
        setUserName(signCredentials.email);
    }

    // Show Password method
    const handleShowPass = () => {
        let check = document.getElementById('showPass');
        if(check.checked) {
            setShowPass('text');
        } else {
            setShowPass('password')
        }
    }

    // Signup Validation
    const validateAuth = () => {
        const newErrors = {};

        if (!signCredentials.name) {
            newErrors.name = 'Name is required';
        }
        
        if (!signCredentials.email) {
            newErrors.email = 'Email is required';
        } 
    
        if (!signCredentials.password) {
            newErrors.password = 'Password is required';
            console.log("Password: " ,signCredentials.password);
        } 
        
        if (signCredentials.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            console.log("Password: " ,signCredentials.password);
        } 
        
        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(signCredentials.password)) {
            newErrors.password = 'Password should have minimum 1 uppercase character, 1 digit and 1 special character'
            console.log("Password: " ,signCredentials.password);
        }
    
        if (signCredentials.password !== signCredentials.cpassword) {
            newErrors.cpassword = 'Passwords do not match';
            console.log("Password: " ,signCredentials.password);
            console.log("Cpassword:", signCredentials.cpassword)
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Signup form
    const handleSignUp = async (event) => {
        event.preventDefault();
        if (validateAuth()) {
            props.setProgress(30);
            const response = await fetch(`${host}api/auth/createuser`, {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify({name: signCredentials.name,email: signCredentials.email, password: signCredentials.password})
            });
            const json = await response.json();
            // Client side
            if(json.success) {
                localStorage.setItem('token',json.authToken);
                navigate('/attendance');
                showAlert("Account created", "#f8cf38");
            } else {
                showAlert("Failed", "#e5322d");
            }
            props.setProgress(100);
        }
    }

    // Inputs the login credentials
    const handleLogChange = (event) => {
        setLogCredentials({...logCredentials, [event.target.name]: event.target.value});
    }

    // Login form
    const handleLogin = async (event) => {
        event.preventDefault();

        props.setProgress(30);
        const response = await fetch(`${host}api/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({email: logCredentials.email, password: logCredentials.password})
        });
        const json = await response.json();

        props.setProgress(70);
        if(json.success) {
            localStorage.setItem('token',json.authToken);
            navigate('/attendance');
            showAlert("Logged in", "#f8cf38");
            dispUsername();
            btnAnime();
        } else {
            showAlert("Failed", "#e5322d");
        }
        props.setProgress(100);
    }

     // Display logged in user
     const dispUsername = async () => {
        const response = await fetch(`${host}api/auth/getuser`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setUserName(json);
    }

    useEffect(() => {
        dispUsername();
    }, []);

    // Logout method
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    }

    const btnAnime = () => {  
        const btn_anime = document.querySelector('#button-anime');
        btn_anime.innerHTML = '<div id="btn-loader"></div>';
        setTimeout(() => {
            btn_anime.style.width='60px';
            btn_anime.innerHTML = '<i className="fa-solid fa-check" style={{font-weight: "bold"}}></i>';
        }, 500);
        setTimeout(() => {
            btn_anime.style.width='120px';
            btn_anime.innerHTML = 'Submit';
        }, 3500);
    }

    return (
        <AuthContext.Provider value={{errors, userName, showPass, handleShowPass, handleSignChange, handleSignUp, handleLogChange, handleLogin, handleLogout, btnAnime}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
