import React from 'react';
import { motion } from 'framer-motion';
import '../index.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      
      {/* First home-body */}
      <motion.div className='home-body' initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.3}} viewport={{once: true}}>
        <h1><span>Present</span> and <span>Productive</span></h1>
        <h5>Joining Hands with Attendify for Better Attendance.</h5>
        <Link to="/signup">Signup for free <i className="fa-solid fa-arrow-right"></i></Link>
        <div className="subsBg">
          <div><img src="/bg1.png" alt="bg3" /></div>
          <div><img src="/bg5.png" alt="bg5" /></div>
        </div>
      </motion.div>

      {/* Second home-body */}
      <motion.div className="home-body" initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.3}} viewport={{once: true}}>
        <h2>Track your attendance percentage accordingly with <span>Attendify</span></h2>
        <h5>Add and track unlimited subjects</h5>
        <Link to="/signup">Try Now <i className="fa-solid fa-arrow-right"></i></Link>
        <div className="subsBg">
          <div><img src="/bg2.png" alt="bg2" /></div>
          <div><img src="/bg4.png" alt="bg6" /></div>
        </div>
      </motion.div>

      {/* Third home-body */}
      <motion.div className="home-body" initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.3}} viewport={{once: true}}>
        <h2>Know from our <span>Subscribers</span></h2>
        <h5>Do share your feedbacks</h5>
        <Link to="/reviews">Post Review <i className="fa-solid fa-arrow-right"></i></Link>
        <div className="subsBg">
          <div><img src="/bg3.png" alt="bg3" /></div>
          <div><img className='bg6' src="/bg6.png" alt="bg4" /></div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
