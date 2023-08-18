import React, { useContext } from 'react';
import '../index.css';
import {AuthContext} from '../contexts/AuthContext'; // Auth Context API
import { Link } from 'react-router-dom';

const Login = () => {
    const context = useContext(AuthContext);
    const {showPass, handleShowPass, handleLogChange, handleLogin} = context;

    return (
        <div className='signForm'>
            <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="details">
                        <label htmlFor="name">Email ID</label>
                        <input type="email" name='email' onChange={handleLogChange} required/>
                    </div>
                    <div className="details">
                        <label htmlFor="name">Password</label>
                        <input type={showPass} name='password' onChange={handleLogChange} required/>
                        <div className="showPass"><input onClick={handleShowPass} id='showPass' type="checkbox" /><label htmlFor="showPass">Show Password</label></div>
                    </div>
                    <button type='submit' id='button-anime'>Login</button>
                </form>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    )
}

export default Login;
