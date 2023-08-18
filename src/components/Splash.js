import React from 'react';
import '../index.css';

const Splash = () => {
    // Splash screen transitions
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity =0;
    }, 2000);

    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
    }, 4000);

    return (
        <div id='splash-screen'>
            <img src="/splash.gif" alt="Loading..." />
            <h1 className='splash'>&lt; Attendify &gt;</h1>
        </div>
    )
}

export default Splash;
