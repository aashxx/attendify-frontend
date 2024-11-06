import React, { useContext, useRef } from 'react';
import '../index.css';
import { AuthContext } from '../contexts/AuthContext'; // Auth Context API
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const context = useContext(AuthContext);
  const {userName, handleLogout} = context;

  const closeRef = useRef(null);
  
  // Responsive Navbar
  let state = 0;
  const handleResNav = () => {
    let navbar = document.getElementById('res-navbar');
    if(state == 0) {
      navbar.style.display='block';
      state = 1;
    } else {
      navbar.style.display='none';
      state = 0;
    }
  }

  // Closes the navbar after selection of nav-item
  const handleCloseRef = () => {
    closeRef.current.click()
  }

  return (
    <nav>
      <div className="logo">
        <Link to="/">&lt; Attendify &gt;</Link>
      </div>
      <div className="nav-items" id='res-navbar'>
        <ul>
          <li><Link onClick={handleCloseRef} to="/">Home</Link></li>
          <li><Link onClick={handleCloseRef} to="/attendance">Attendance</Link></li>
          <li><Link onClick={handleCloseRef} to="/signup">Signup</Link></li>
          <li><Link onClick={handleCloseRef} to="/reviews">Reviews</Link></li>
          <li><a href='https://thetypingspeedtestgame.netlify.app'>Typing Test</a></li>
          <li><Link onClick={handleCloseRef} to="/reviews">Blog</Link></li>
        </ul>
      </div>    
      <div className='buttons'>
        {
          localStorage.getItem("token") &&
          <div>
          <Popup trigger={<button className='account'><i className="fa-solid fa-user"></i></button>}>
            {
              () => (
                <div className="accountDetails">
                  <p>Account</p>
                  <strong className="userName">{userName.name}</strong>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )
            }
          </Popup>
          </div>
        }
        <div className="res-nav">
          <button onClick={handleResNav} ref={closeRef}><i className="fa-solid fa-bars-staggered"></i></button>
        </div>
      </div>  
    </nav>
  )
}

export default Navbar
