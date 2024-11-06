import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import AttendState from './contexts/AttendContext';
import AlertState from './contexts/AlertContext';
import AuthState from './contexts/AuthContext';
import ReviewState from './contexts/ReviewContext';
import Navbar from './components/Navbar';
import Subjects from './components/Subjects';
import Footer from './components/Footer';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Reviews from './components/Reviews';
import Splash from './components/Splash';
import Blog from './components/Blog';

const App = () => {

  const [progress, setProgress] = useState(0);

  return (
    <AttendState setProgress={setProgress}>
      <AlertState>
        <Router>
            <AuthState setProgress={setProgress}>
              <ReviewState setProgress={setProgress}>
                <Splash />
                <LoadingBar color='#f8cf38' progress={progress} height={4}/>
                <Navbar/>
                <Alert/>
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/attendance' element={<Subjects/>}/>
                  <Route exact path='/signup' setProgress={setProgress} element={<Signup/>}/>
                  <Route exact path='/login' setProgress={setProgress} element={<Login/>}/>
                  <Route exact path='/reviews' setProgress={setProgress} element={<Reviews />} />
                  <Route exact path='/blog' setProgress={setProgress} element={<Blog />} />
                </Routes>
                <Footer />
              </ReviewState>
            </AuthState>
        </Router>
      </AlertState>
    </AttendState>
  )
}

export default App;
